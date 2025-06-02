import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import {
  HomePage,
  LoginPage,
  Registro,
  Dashboard,
  Budget,
  Transactions,
} from "./pages";
// import HomeDashboard from "./HomeDashboard"
import Sidebar from "./components/Dashboard/Sidebar.tsx";
import Header from "./components/Dashboard/Header.tsx";
import { TransactionProvider } from "./context/TransactionContext.tsx";
// import {
//   Search,
//   Notify,
//   NumeroTarjeta,
//   Wallet,
//   Transactions,
//   PayableAccounts,
//   MonthlyEarnings,
//   Earnings,
// } from "./components/Dashboard";

function App() {
  const path = [
    "/",
    "/api/login",
    "/api/registro",
    "/api/homedashboard",
  ];
  const navigate = useNavigate();

  const handleStartLoginRegistroClick = (i) => {
    navigate(path[i]);
  };

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

      {/* <Route
        path="/api/homedashboard"
        element={ */}
      {/* // <div className="flex min-h-screen">
          //   <main className="flex-grow p-4 lg:pl-72 font-jakarta">
          //     <div className="flex flex-row items-center justify-between mb-4">
          //       <div className="lg:block lg:fixed md:absolute lg:top-0 md:top-[8px] left-0 h-full z-10">
          //         <PageDashboard />
          //       </div>
          //       <Search />
          //       <Notify />
          //     </div>
          //     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          //       <NumeroTarjeta />
          //       <Wallet />
          //       <PayableAccounts />
          //       <Transactions />
          //       <MonthlyEarnings />
          //       <Earnings />
          //     </div>
          //   </main>
          // </div> */}
      {/* <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budget" element={<Budget />} />
              </Routes>
            </main>
          </div>
        </div> */}
      {/* }
      ></Route> */}

      <Route
        path="/api/homedashboard/*"
        element={
          <TransactionProvider>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                  <Routes>
                  <Route path="" element={<Dashboard />} /> {/* Ruta principal del dashboard */}
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="budget" element={<Budget />} />
                  </Routes>
                </main>
              </div>
            </div>
          </TransactionProvider>
        }>
      </Route>
    </Routes>
  );
}

export default App;
