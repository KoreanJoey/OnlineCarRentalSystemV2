import React from "react";

const CarCard = ({ car, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {car.brand} {car.model}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div>Year: {car.year}</div>
          <div>Type: {car.type}</div>
          <div>Transmission: {car.transmission}</div>
          <div>Fuel: {car.fuelType}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            ${car.pricePerDay.toLocaleString()}/day
          </div>
          <button
            onClick={() => onSelect(car)}
            disabled={!car.available}
            className={`px-4 py-2 rounded-md ${
              car.available
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {car.available ? "Reservation" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
