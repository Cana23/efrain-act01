import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fijo en la parte superior */}
      <header className="w-full shadow-md fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center p-4 md:p-6 bg-blue-600 text-white max-w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-bold">Empresa Papu</h1>
            <div className="hidden md:flex space-x-6">
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-lg hover:underline px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content con padding superior para evitar solapamiento con el header */}
      <main className="flex-grow flex flex-col items-center min-h-screen justify-center text-center pt-24 pb-8 px-4 md:px-8 md:pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-blue-600 mb-6">
            Bienvenido a nuestra página
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl my-6">
            Por favor llena nuestro formulario de contacto para poder ayudarte.
          </p>
          <Link
            to="/form"
            className="inline-block bg-blue-600 text-xl text-white px-6 py-3 rounded-full hover:bg-blue-700 transition mb-8"
          >
            Ir al formulario
          </Link>
          <div className="text-sm text-black">
            <Link to="/terminos" className="hover:underline mx-2">
              Términos y condiciones
            </Link>
            |
            <Link to="/privacidad" className="hover:underline mx-2">
              Política de privacidad
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
