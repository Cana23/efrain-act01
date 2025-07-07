const { db } = require("../firebase/firebaseConfig");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sanitizeString = (str) => String(str).trim().replace(/[<>]/g, "");
const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPhoneValid = (phone) => /^\d{7,15}$/.test(phone);

const sendNotification = async ({ nombre, mensaje }) => {
  const mailOptions = {
    from: `"CRM Notifier" <${process.env.GMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "📩 Nuevo Lead Recibido",
    text: `Nombre: ${nombre}\nMensaje: ${mensaje}`,
    html: `<h3>Nuevo lead recibido</h3>
           <p><strong>Nombre:</strong> ${nombre}</p>
           <p><strong>Mensaje:</strong><br>${mensaje}</p>`,
  };

  return transporter.sendMail(mailOptions);
};

const saveContact = async (req, res) => {
  let { nombre, correo, telefono, mensaje, token } = req.body;

  if (!nombre || !correo || !telefono || !mensaje || !token) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Sanitización
  nombre = sanitizeString(nombre);
  correo = correo.trim().toLowerCase();
  telefono = telefono.replace(/\s+/g, "");
  mensaje = sanitizeString(mensaje);

  // Validaciones
  if (nombre.length < 3 || nombre.length > 100) {
    return res
      .status(400)
      .json({ error: "El nombre debe tener entre 3 y 100 caracteres." });
  }

  if (!isEmailValid(correo)) {
    return res.status(400).json({ error: "El correo no es válido." });
  }

  if (!isPhoneValid(telefono)) {
    return res.status(400).json({
      error: "El teléfono debe tener entre 7 y 15 dígitos y solo números.",
    });
  }

  if (mensaje.length < 10 || mensaje.length > 1000) {
    return res
      .status(400)
      .json({ error: "El mensaje debe tener entre 10 y 1000 caracteres." });
  }

  try {
    // Verificar reCAPTCHA
    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await captchaResponse.json();

    if (!data.success) {
      return res
        .status(403)
        .json({ error: "Fallo la verificación de reCAPTCHA" });
    }

    // Guardar en Firebase
    const leadRef = await db.collection("contact").add({
      nombre,
      correo,
      telefono,
      mensaje,
      estado: "nuevo",
      fecha: new Date().toISOString(),
    });

    // Enviar notificación por correo
    await sendNotification({ nombre, mensaje });

    res.status(200).json({
      message: "Formulario enviado con éxito",
      id: leadRef.id,
    });
  } catch (error) {
    console.error("Error en saveContact:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { saveContact };
