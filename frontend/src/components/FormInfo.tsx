import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";

const schema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "Mínimo 3 caracteres"),
  correo: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  telefono: yup
    .string()
    .matches(/^\d+$/, "Solo números")
    .min(7, "Teléfono demasiado corto")
    .max(15, "Teléfono demasiado largo")
    .required("El teléfono es obligatorio"),
  mensaje: yup
    .string()
    .required("El mensaje es obligatorio")
    .min(10, "Mínimo 10 caracteres"),
});

type FormData = yup.InferType<typeof schema>;

const ContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const token = recaptchaRef.current?.getValue();

    if (!token) {
      alert("Por favor completa el reCAPTCHA");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, token }),
      });

      if (res.ok) {
        alert("Mensaje enviado con éxito");
        reset();
        recaptchaRef.current?.reset();
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error(error);
      alert("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-xl"
    >
      <div>
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full border rounded-md p-2"
          {...register("nombre")}
        />
        {errors.nombre && (
          <p className="text-red-600 text-sm">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-md p-2"
          {...register("correo")}
        />
        {errors.correo && (
          <p className="text-red-600 text-sm">{errors.correo.message}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full border rounded-md p-2"
          {...register("telefono")}
        />
        {errors.telefono && (
          <p className="text-red-600 text-sm">{errors.telefono.message}</p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Mensaje"
          className="w-full border rounded-md p-2"
          rows={4}
          {...register("mensaje")}
        ></textarea>
        {errors.mensaje && (
          <p className="text-red-600 text-sm">{errors.mensaje.message}</p>
        )}
      </div>

      <p className="text-sm text-gray-500">
        Al enviar este formulario, aceptas nuestra{" "}
        <a href="/terminos" className="text-blue-600 hover:underline">
          Política de Términos y Condiciones
        </a>{" "}
        y nuestra{" "}
        <a href="/privacidad" className="text-blue-600 hover:underline">
          Política de Privacidad
        </a>
        .
      </p>

      <div className="flex justify-center my-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6Le41G4rAAAAAOtLXtLHPNcNUeCNN4f6F4-l6y12"
          className="mx-auto"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-[80%] bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-700 transition"
        >
          <p className="font-bold text-xl">
            {loading ? "Enviando..." : "Enviar"}
          </p>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;