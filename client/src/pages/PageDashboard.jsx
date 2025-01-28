import { useEffect, useState } from "react";

export default function PageDashboard() {
  const [user, setUser] = useState({
    name: "Usuario",
    role: "Student",
    profilePicture: "https://github.com/pablotorrez15.png",
  });

  const [menuItems, setMenuItems] = useState([
    { icon: "fa-chart-simple", label: "Dashboard", link: "/dashboard" },
    { icon: "fa-wallet", label: "Wallet", link: "/wallet" },
    { icon: "fa-coins", label: "Transactions", link: "/transactions" },
    { icon: "fa-chart-line", label: "Revenue analytics", link: "/analytics" },
    { icon: "fa-magnifying-glass", label: "Search", link: "/search" },
  ]);

  useEffect(() => {
    document.title = "Dashboard";

    // Simulando una carga de datos (ej. desde una API)
    const fetchedUserData = {
      name: "Usuario",
      role: "Student",
      profilePicture: "https://github.com/pablotorrez15.png",
    };

    const fetchedMenuItems = [
      { icon: "fa-chart-simple", label: "Dashboard", link: "/overview" },
      { icon: "fa-wallet", label: "Wallet", link: "/my-wallet" },
      { icon: "fa-coins", label: "Transactions", link: "/transactions" },
      { icon: "fa-chart-line", label: "Revenue Analytics", link: "/analytics" },
      /*{ icon: "fa-magnifying-glass", label: "Search", link: "/search" }*/
    ];

    setUser(fetchedUserData);
    setMenuItems(fetchedMenuItems);
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col items-center drawer-content">
        <label htmlFor="my-drawer-2" className="p-4 drawer-button lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            strokeWidth="2"
          >
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay lg:hidden"
        ></label>
        <div className="menu w-64 bg-[#F1F5FB] text-base-content h-full">
          <div className="flex flex-col items-center py-6">
            <img
              src={user.profilePicture}
              alt="Foto de Perfil"
              className="w-20 h-20 rounded-full"
            />
            <h1 className="mt-2 text-xl font-bold">{user.name}</h1>
            <span className="text-lg text-gray-400">{user.role}</span>
          </div>

          <ul className="p-4 menu">
            {menuItems.map((item, index) => (
              <li key={index} className="py-2">
                <a href={item.link} className="flex items-center">
                  <i className={`fa-solid ${item.icon} mr-2`}></i>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="absolute w-full px-4 bottom-6">
            <ul>
              <li className="py-2">
                <a href="#">
                  <i className="mr-2 fa-solid fa-gear"></i>Configuration
                </a>
              </li>
              <li className="py-2">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/";
                  }}
                >
                  <i className="mr-2 fa-solid fa-right-from-bracket"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
