const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../firebase/firebaseConfig");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son requeridos." });
  }

  try {
    const snapshot = await db
      .collection("admins")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const admin = snapshot.docs[0].data();

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const token = jwt.sign(
      { uid: snapshot.docs[0].id, email: admin.email, nombre: admin.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor." });
  }
};

const registerAdmin = async (req, res) => {
  const { email, nombre, password, rol } = req.body;

  if (!email || !nombre || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const existing = await db
      .collection("admins")
      .where("email", "==", email)
      .get();
    if (!existing.empty) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const adminData = {
      email,
      nombre,
      passwordHash,
      rol: rol || "superadmin",
    };

    const adminRef = await db.collection("admins").add(adminData);

    res
      .status(201)
      .json({ message: "Administrador registrado", id: adminRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


module.exports = { login, registerAdmin };
