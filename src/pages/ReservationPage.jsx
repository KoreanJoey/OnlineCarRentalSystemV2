import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";
import Header from "../components/Header";

const ReservationPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to get car from localStorage first
    const selectedCar = localStorage.getItem("selectedCar");
    if (selectedCar) {
      setCar(JSON.parse(selectedCar));
      setLoading(false);
      return;
    }

    // If not in localStorage, fetch from cars.json
    fetch("/cars.json")
      .then((response) => response.json())
      .then((data) => {
        const foundCar = data.cars.find((c) => c.id === carId);
        if (foundCar) {
          setCar(foundCar);
        } else {
          setError("Car not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
        setError("Failed to load car details");
        setLoading(false);
      });
  }, [carId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Car not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">
                Reserve {car.brand} {car.model}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {car.brand} {car.model}
                  </h2>
                  <p className="text-gray-600 mb-2">Type: {car.type}</p>
                  <p className="text-gray-600 mb-2">Year: {car.year}</p>
                  <p className="text-gray-600 mb-4">
                    Price: ₩{car.pricePerDay.toLocaleString()} per day
                  </p>
                  <p className="text-gray-600">{car.description}</p>
                </div>
              </div>
            </div>
          </div>

          <ReservationForm car={car} />
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
