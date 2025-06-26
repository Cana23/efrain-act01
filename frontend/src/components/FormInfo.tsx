// src/components/ContactForm.tsx
import { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Mensaje enviado con éxito");
        setForm({ nombre: "", correo: "", telefono: "", mensaje: "" });
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl">
      <input
        name="nombre"
        type="text"
        placeholder="Nombre completo"
        className="w-full border rounded-md p-2"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        name="correo"
        type="email"
        placeholder="Correo electrónico"
        className="w-full border rounded-md p-2"
        value={form.correo}
        onChange={handleChange}
        required
      />
      <input
        name="telefono"
        type="tel"
        placeholder="Teléfono"
        className="w-full border rounded-md p-2"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <textarea
        name="mensaje"
        placeholder="Mensaje"
        className="w-full border rounded-md p-2"
        rows={4}
        value={form.mensaje}
        onChange={handleChange}
        required
      ></textarea>
      <div>
        <p className="text-sm text-gray-500">
          Al enviar este formulario, aceptas nuestra{" "}
          <a href="/terminos" className="text-blue-600 hover:underline">
            Política de Términos y Condiciones
          </a>{" "}
          y nuestra{" "}
          <a href="/privacidad" className="text-blue-600 hover:underline">
            Política de Privacidad
          </a>.
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[80%] bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-700 transition"
        >
          <p className="font-bold text-xl">Enviar</p>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
