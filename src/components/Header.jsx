import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 mb-6">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/">
          <div className="flex items-center space-x-3">
            <img
              src="/car rental logo img.png"
              alt="Car Rental Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl font-bold text-blue-700">Car Rental Service</span>
          </div>
        </Link>
        <nav className="space-x-6">
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
