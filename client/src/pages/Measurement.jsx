import { Search, Plus, Trash2, Edit3, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaPlus, FaSearch } from "react-icons/fa";
import { API_BASE_URL } from "../config";
const BASE_URL = `${API_BASE_URL}/api/measure`;

export default function Measurement() {
  const [names, setNames] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchNames = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL, {
        params: { search: query },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNames(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNames(search);
  }, [search]);

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/delete-measure/${selectedCustomer._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowModal(false);
      setSelectedCustomer(null);
      fetchNames(search);
    } catch (error) {
      enqueueSnackbar("Failed to delete customer", { variant: "error" });
      return;
    }
    enqueueSnackbar("Customer deleted", { variant: "success" });
  };

  return (
    <div className=" w-full flex justify-center">
      <div className="w-full max-w-2xl bg-gray-950 rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-800">
        {/* Main Content Container */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-center text-white tracking-wide mb-6">
            Customers
          </h1>

          {/* Search and Add Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full mb-10">
            {/* Search Box */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaSearch className="text-gray-400 w-4 h-4" />
              </div>
              <input
                type="text"
                name="search"
                autoComplete="off"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={() => navigate("/add-measure")}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FaPlus />
              <span className="sm:inline">Add Customer</span>
            </button>
          </div>
        </div>

        {/* List View */}
        <div className="w-full">
          {loading ? (
            <div className="text-center py-10">
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
              <p className="mt-4 text-white">Loading customers...</p>
            </div>
          ) : names.length > 0 ? (
            <div className="flex flex-col gap-4">
              {names.map((customer) => (
                <Card
                  key={customer._id}
                  name={`${customer.firstName} ${customer.lastName}`}
                  onView={() => navigate("/measure/" + customer._id)}
                  onEdit={() => navigate(`/measure/edit/${customer._id}`)}
                  onDelete={() => handleDeleteClick(customer)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10">
              No customers found.
            </p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-blue-400">
                {selectedCustomer.firstName} {selectedCustomer.lastName}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
