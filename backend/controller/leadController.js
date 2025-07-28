const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getLeads = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const leads = await prisma.contact.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { fecha: "desc" },
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
    await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { estado },
    });

    res.status(200).json({ message: "Estado actualizado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar estado." });
  }
};

module.exports = { getLeads, updateLeadStatus };
