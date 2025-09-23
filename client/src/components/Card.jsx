import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Card({ name, onView, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Name */}
      <h3 className="text-white font-semibold text-lg sm:text-xl capitalize truncate w-full sm:w-auto">
        {name}
      </h3>

      {/* Buttons */}
      <div className="flex gap-3 w-full sm:w-auto justify-end">
        {/* View Button */}
        <button
          onClick={onView}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 active:scale-95 shadow-md"
          title="View Details"
        >
          <FaEye size={18} />
        </button>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 active:scale-95 shadow-md"
          title="Edit"
        >
          <FaEdit size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 active:scale-95 shadow-md"
          title="Delete"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
}
