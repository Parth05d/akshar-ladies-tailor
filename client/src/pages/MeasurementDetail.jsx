import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser, FaPhone, FaRuler, FaEdit } from "react-icons/fa"; // Importing FaEdit for the button
import BackButton from "../components/BackButton";

const BASE_URL = "http://localhost:5000/api/measure";

export default function MeasurementDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch measurement data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fields = [
    { name: "length", label: "Length", unit: "(in)" },
    { name: "waist", label: "Waist", unit: "(in)" },
    { name: "shoulder", label: "Shoulder", unit: "(in)" },
    { name: "sleeveLength", label: "Sleeve Length", unit: "(in)" },
    { name: "bust", label: "Bust", unit: "(in)" },
    { name: "hip", label: "Hip", unit: "(in)" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <div className="text-center text-white">
          <svg
            className="animate-spin h-8 w-8 text-blue-400 mx-auto"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-lg">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-950 rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to list" to="/measure" />
          <div />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Measurement Details
          </h1>
          <p className="mt-2 text-gray-400">
            A comprehensive overview of the customer's data.
          </p>
        </div>

        {/* Section: Personal Details */}
        <div className="mb-8">
          <h2 className="flex items-center text-xl font-bold text-white mb-4">
            <FaUser className="mr-2 text-blue-400" />
            Personal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 capitalize">
            <div>
              <p className="text-gray-400 text-sm">First Name</p>
              <p className="text-white text-lg font-semibold">
                {data.firstName || "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Last Name</p>
              <p className="text-white text-lg font-semibold">
                {data.lastName || "-"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm">Contact Number</p>
            <p className="text-white text-lg font-semibold">
              {data.contact || "-"}
            </p>
          </div>
        </div>

        {/* Section: Measurement Details */}
        <div className="mb-10">
          <h2 className="flex items-center text-xl font-bold text-white mb-4">
            <FaRuler className="mr-2 text-blue-400" />
            Measurements
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg"
              >
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {field.label}{" "}
                  <span className="text-gray-500">{field.unit}</span>
                </p>
                <p className="text-2xl font-bold text-blue-400">
                  {data[field.name] || "-"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(`/measure/edit/${id}`)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
          >
            <FaEdit className="text-white" />
            <span>Edit Measurement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
