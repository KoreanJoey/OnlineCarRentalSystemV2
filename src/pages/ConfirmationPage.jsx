import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setError("Order not found");
    }
    setLoading(false);
  }, [orderId]);

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

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h1 className="text-3xl font-bold text-gray-900">
                  Reservation Confirmed!
                </h1>
                <p className="text-gray-600 mt-2">
                  Thank you for your reservation
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Reservation Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Car Information
                    </h3>
                    <p className="text-gray-600">
                      {order.carDetails.brand} {order.carDetails.model}
                    </p>
                    <p className="text-gray-600">
                      Type: {order.carDetails.type}
                    </p>
                    <p className="text-gray-600">
                      Year: {order.carDetails.year}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Rental Period
                    </h3>
                    <p className="text-gray-600">
                      Start Date:{" "}
                      {new Date(order.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      End Date: {new Date(order.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Total Days: {order.totalDays}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Customer Information
                    </h3>
                    <p className="text-gray-600">Name: {order.name}</p>
                    <p className="text-gray-600">Email: {order.email}</p>
                    <p className="text-gray-600">Phone: {order.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Payment Information
                    </h3>
                    <p className="text-gray-600">
                      Total Price: ₩{order.totalPrice.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Status: {order.status}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
