import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import Bag from "./Pages/Bag";
import Footer from "./Components/Footer/Footer";
import Cursor from "./Components/UI/Cursor";
import Preloader from "./Components/UI/Preloader";
import PageTransition from "./Components/UI/PageTransition";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <PageTransition />
      <Navbar />
      <div className="page-content-fade" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/bag" element={<Bag />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <Cursor />
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
