export default function PrivacyPolicy() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg">
        {/* Encabezado con botón y título */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <a
            href="/"
            className="inline-flex items-center font-semibold text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl transition-colors"
          >
            ← Volver al inicio
          </a>
          <h1 className="text-3xl font-bold text-gray-800">
            Politicas de privacidad
          </h1>
        </div>

        {/* Contenido principal */}
        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Estos son los términos y condiciones de uso del servicio.
          </p>

          <ul className="space-y-3 list-disc pl-5 marker:text-red-500">
            <li className="pl-2">
              <span className="font-semibold">Condición 1:</span> Descripción
              del servicio.
            </li>
            <li className="pl-2">
              <span className="font-semibold">Condición 2:</span> Uso permitido
              y restricciones.
            </li>
            <li className="pl-2">
              <span className="font-semibold">Condición 3:</span>{" "}
              Responsabilidades del usuario.
            </li>
            <li className="pl-2">
              <span className="font-semibold">Condición 4:</span> Modificaciones
              al servicio.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
