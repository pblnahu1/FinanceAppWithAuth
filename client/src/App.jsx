import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import { HomePage, LoginPage, Registro, PageDashboard } from "./pages";
import {
  Search,
  Notify,
  NumeroTarjeta,
  Wallet,
  Transactions,
  PayableAccounts,
  MonthlyEarnings,
  Earnings,
} from "./components/Dashboard";
// import { protectedRequest } from "./services/authService";
// import { useEffect } from "react";

function App() {
  const path = ["/", "/api/login", "/api/registro", "/api/homedashboard"];
  const navigate = useNavigate();

  const handleStartLoginRegistroClick = (i) => {
    navigate(path[i]);
  };

  // const fetchDashboardData = async () => {
  //   try {
  //     const data = await protectedRequest("/api/homedashboard");
  //     console.log("Datos del dashboard:", data);
  //   } catch (error) {
  //     console.error("Error al obtener el dashboard:", error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (window.location.pathname === "/api/homedashboard") {
  //     fetchDashboardData();
  //   }
  // }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      ></Route>
      <Route
        path="/api/login"
        element={
          <Layout>
            <LoginPage
              handleStartLoginRegistroClick={() =>
                handleStartLoginRegistroClick(2)
              }
            />
          </Layout>
        }
      ></Route>
      <Route
        path="/api/registro"
        element={
          <Layout>
            <Registro
              handleStartLoginRegistroClick={() =>
                handleStartLoginRegistroClick(1)
              }
            />
          </Layout>
        }
      ></Route>

      <Route
        path="/api/homedashboard"
        element={
          <div className="flex min-h-screen">
            <main className="flex-grow p-4 lg:pl-72 font-jakarta">
              <div className="flex flex-row items-center justify-between mb-4">
                <div className="lg:block lg:fixed md:absolute lg:top-0 md:top-[8px] left-0 h-full z-10">
                  <PageDashboard />
                </div>
                <Search />
                <Notify />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                <NumeroTarjeta />
                <Wallet />
                <PayableAccounts />
                <Transactions />
                <MonthlyEarnings />
                <Earnings />
              </div>
            </main>
          </div>
        }
      ></Route>
    </Routes>
  );
}

export default App;
