const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Crear un administrador con contraseña hasheada
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      nombre: "Manu Admin",
      email: "admin@miempresa.com",
      passwordHash: hashedPassword,
      rol: "admin",
    },
  });

  // Crear contactos de ejemplo
  await prisma.contact.createMany({
    data: [
      {
        nombre: "Juan Pérez",
        correo: "juan@example.com",
        telefono: "5512345678",
        mensaje: "Estoy interesado en su producto.",
        estado: "nuevo",
        fecha: new Date().toISOString(),
      },
      {
        nombre: "Ana García",
        correo: "ana@example.com",
        telefono: "5545671234",
        mensaje: "¿Ofrecen descuentos por volumen?",
        estado: "contactado",
        fecha: new Date().toISOString(),
      },
    ],
  });

  console.log("✅ Datos de prueba insertados correctamente.");
}

main()
  .catch((e) => {
    console.error("❌ Error al insertar datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
