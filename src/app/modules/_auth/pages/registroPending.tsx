import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white shadow-md rounded p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Gracias por su Registro
        </h1>
        <p className="text-lg text-gray-600">
          Revise la bandeja de entrada de su correo y siga las instrucciones.
        </p>
      </div>
      <button
  onClick={() => window.location.href = "/"}
  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
>
  Volver al Inicio
</button>

    </div>
  );
};

export default ThankYouPage;
