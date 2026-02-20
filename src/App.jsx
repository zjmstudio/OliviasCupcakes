import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Workshop from "./pages/Workshop1.jsx";


export default function App() {
  return (
    <>
      <Navbar />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshop" element={<Workshop />} />
      </Routes>
      <Footer />
    </>
  );
}
