import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Planning from "./pages/Planning";
import Chart from "./pages/Chart";
import SKUs from "./pages/SKUs";
import Stores from "./pages/Strores";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Stores />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/skus" element={<SKUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
