const { db } = require("../firebase/firebaseConfig");

const getLeads = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const snapshot = await db
      .collection("contact")
      .orderBy("fecha", "desc")
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    const leads = [];
    snapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ leads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener leads." });
  }
};

const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!["nuevo", "contactado", "descartado"].includes(estado)) {
    return res.status(400).json({ error: "Estado inválido." });
  }

  try {
    await db.collection("contact").doc(id).update({ estado });
    res.status(200).json({ message: "Estado actualizado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar estado." });
  }
};

module.exports = { getLeads, updateLeadStatus };
