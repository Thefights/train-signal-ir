import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "./../pages/Product";
import ProductManagement from "../pages/ProductManagement/ProductManagement";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-management" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
