import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarList from "../components/CarList";
import SearchBox from "../components/SearchBox";
import Filters from "../components/Filters";
import Header from "../components/Header";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/cars.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.cars || !Array.isArray(data.cars)) {
          throw new Error("Invalid data format");
        }
        setCars(data.cars);
        setFilteredCars(data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error.message || "Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredCars(cars);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(searchQuery) ||
        car.model.toLowerCase().includes(searchQuery) ||
        car.type.toLowerCase().includes(searchQuery)
    );
    setFilteredCars(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...cars];

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter((car) => car.brand === filters.brand);
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter((car) => car.type === filters.type);
    }

    // Apply price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(
        (car) => car.pricePerDay >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (car) => car.pricePerDay <= Number(filters.maxPrice)
      );
    }

    setFilteredCars(filtered);
  };

  const handleCarSelect = (car) => {
    try {
      localStorage.setItem("selectedCar", JSON.stringify(car));
      navigate(`/reservation/${car.id}`);
    } catch (error) {
      console.error("Error saving car to localStorage:", error);
      setError("Failed to save car selection");
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4">
        <SearchBox onSearch={handleSearch} cars={cars} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Filters onFilterChange={handleFilterChange} cars={cars} />
          </div>

          <div className="lg:col-span-3">
            <CarList cars={filteredCars} onCarSelect={handleCarSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
