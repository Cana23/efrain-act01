const { db } = require("../firebase/firebaseConfig");

const saveContact = async (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;

  if (!nombre || !correo || !telefono || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    await db.collection("contact").add({
      nombre,
      correo,
      telefono,
      mensaje,
      fecha: new Date().toISOString(),
    });

    res.status(200).json({ message: "Formulario enviado con éxito" });
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { saveContact };
