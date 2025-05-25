import React from "react";
import CarCard from "./CarCard";

const CarList = ({ cars, onCarSelect }) => {
  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No cars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onSelect={onCarSelect} />
      ))}
    </div>
  );
};

export default CarList;
