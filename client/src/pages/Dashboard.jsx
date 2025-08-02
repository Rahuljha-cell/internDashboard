import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/dashboard`);
        const data = await res.json();
        setDonations(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Dashboard
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No donation data found.</p>
      ) : (
        <table className="min-w-full border border-slate-300 shadow rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Raised Funds</th>
              <th className="px-4 py-2 border">Referral</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{item.username}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">₹{item.raisedfunds}</td>
                <td className="px-4 py-2 border">{item.referralcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;