import Theme from "./Theme";
import { DollarIcon } from "../icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/api/login");
  };

  const handleStartHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={handleStartHomeClick}>Inicio</a>
            </li>
            <li>
              <a>Ayuda</a>
            </li>
            <Theme />
          </ul>
        </div>
        <a
          className="text-base btn btn-ghost lg:text-xl"
          onClick={handleStartHomeClick}
        >
          <DollarIcon />
          Your Finance
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <a onClick={handleStartHomeClick}>Inicio</a>
          </li>
          <li>
            <a>Ayuda</a>
          </li>
        </ul>
      </div>
      <div className="mr-5 navbar-end">
        <a className="btn" onClick={handleStartClick}>
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}
