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
import {
  Sidebar,
  Header
} from "./components/Dashboard"
import { TransactionProvider } from "./context/TransactionContext.tsx";

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
                  <Route path="" element={<Dashboard />} />
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
