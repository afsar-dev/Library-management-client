import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <div className="flex flex-col min-h-svh">
      <Navbar />
      <main className="py-20 container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
