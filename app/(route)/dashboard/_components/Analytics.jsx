"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Analytics = () => {
  // State for storing the fetched product analytics data
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product analytics data when the component mounts
    const GetData = async () => {
      try {
        const result = await axios.get("/api/analytics");
        setAnalyticsData(result.data); // Store product data in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading to false in case of error
      }
    };

    GetData();
  }, []); // Empty dependency array to ensure it runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there was an issue fetching data
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mt-5">Product Analytics</h2>

      {/* If data is available, render it in a table */}
      {analyticsData.length > 0 ? (
        <div className="mt-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 border border-gray-300 text-left">Product Title</th>
                <th className="p-2 border border-gray-300 text-left">Price ($)</th>
                <th className="p-2 border border-gray-300 text-left">Category</th>
                <th className="p-2 border border-gray-300 text-left">Description</th>
                <th className="p-2 border border-gray-300 text-left">Order ID</th>
                <th className="p-2 border border-gray-300 text-left">User Name</th>
                <th className="p-2 border border-gray-300 text-left">User Email</th>
                <th className="p-2 border border-gray-300 text-left">Product Image</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map(item => {
                const { products, orders, users } = item;

                return (
                  <tr key={orders.id}>
                    <td className="p-2 border border-gray-300">{products.title}</td>
                    <td className="p-2 border border-gray-300">${products.price}</td>
                    <td className="p-2 border border-gray-300">{products.category}</td>
                    <td className="p-2 border border-gray-300">{products.description}</td>
                    <td className="p-2 border border-gray-300">{orders.id}</td>
                    <td className="p-2 border border-gray-300">{users.name}</td>
                    <td className="p-2 border border-gray-300">{users.email}</td>
                    <td className="p-2 border border-gray-300">
                      <img src={products.imageUrl} alt={products.title} className="w-20 h-20 object-cover" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No product analytics data available.</p>
      )}
    </div>
  );
};

export default Analytics;
