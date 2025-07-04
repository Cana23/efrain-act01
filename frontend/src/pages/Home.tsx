import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-full justify-center text-center p-8 rounded-xl">
      <h1 className="text-8xl font-bold text-blue-600">
        Bienvenido a nuestra pagina
      </h1>
      <p className="text-gray-700 text-2xl my-6">
        Por favor llena nuestro formulario de contacto para poder ayudarte.
      </p>
      <Link
        to="/form"
        className="bg-blue-600 text-xl text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Ir al formulario
      </Link>
      <footer className="mt-6 text-sm text-black">
        <Link to="/terminos" className="hover:underline">
          Términos y condiciones
        </Link>{" "}
        |{" "}
        <Link to="/privacidad" className="hover:underline">
          Política de privacidad
        </Link>
      </footer>
    </div>
  );
};
