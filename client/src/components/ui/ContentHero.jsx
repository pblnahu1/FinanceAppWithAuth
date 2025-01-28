import { useNavigate } from "react-router-dom";

export default function ContentHero() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/api/login");
  };

  return (
    <div className="rounded-3xl top-0 z-[-2] bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-500 text-white lg:py-32 md:py-4 px-7 text-center">
      <div className="min-h-full hero rounded-box">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-4 text-lg font-bold lg:text-5xl">
              ¡Descubre el poder de tus finanzas!
            </h1>
            <p className="py-6 text-base lg:text-lg">
              ¿Sientes que tus gastos te abruman? Con un gestor de finanzas a tu
              lado, podrás transformar tu economía personal. Te ayudamos a
              planificar, optimizar y alcanzar tus metas financieras con
              estrategias efectivas. No más preocupaciones, solo resultados.
              Toma el control de tu futuro hoy mismo y haz que tu dinero cuente.
            </p>
            <button
              className="px-6 py-4 text-white bg-black rounded-lg"
              onClick={handleStartClick}
            >
              Comenzar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
