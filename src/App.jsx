import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation/:carId" element={<ReservationPage />} />
        <Route path="/confirmation/:orderId" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
