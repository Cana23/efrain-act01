const { db } = require("../firebase/firebaseConfig");

const saveContact = async (req, res) => {
  const { nombre, correo, telefono, mensaje, token } = req.body;

  try {
    // Verificar reCAPTCHA
    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
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
    await db.collection("contact").add({
      nombre,
      correo,
      telefono,
      mensaje,
      fecha: new Date().toISOString(),
    });

    res.status(200).json({ message: "Formulario enviado con éxito" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { saveContact };
