import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Acceso Denegado
        </h1>
        <p className="text-gray-700 mb-2">
          Esta URL está protegida. Necesitas iniciar sesión para acceder.
        </p>
        <p className="text-gray-700">
          Serás redirigido a la página principal en <strong>5 segundos</strong>.
        </p>
      </div>
    </div>
  );
};

export default Protected;
