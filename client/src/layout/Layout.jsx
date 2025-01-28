import { Header, Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="items-center flex-grow p-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
