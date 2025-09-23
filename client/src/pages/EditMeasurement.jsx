import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import axios from "axios";
import { FaUser, FaPhone, FaRuler } from "react-icons/fa"; // Using react-icons for a modern look
import BackButton from "../components/BackButton";

const BASE_URL = "http://localhost:5000/api/measure";
const EDIT_MEASURE = `${BASE_URL}/edit-measure`;

// Validation Schema
const measureSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.string()
    .required("Contact is required")
    .min(10, "Contact must be 10 digits")
    .max(10),
  bust: Yup.number().required("Bust is required"),
  length: Yup.number().required("Length is required"),
  waist: Yup.number().required("Waist is required"),
  hip: Yup.number().required("Hip is required"),
  shoulder: Yup.number().required("Shoulder is required"),
  sleeveLength: Yup.number().required("Sleeve length is required"),
});

export default function EditMeasurement() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fields = [
    { name: "length", label: "Length", unit: "(in)" },
    { name: "waist", label: "Waist", unit: "(in)" },
    { name: "shoulder", label: "Shoulder", unit: "(in)" },
    { name: "sleeveLength", label: "Sleeve Length", unit: "(in)" },
    { name: "bust", label: "Bust", unit: "(in)" },
    { name: "hip", label: "Hip", unit: "(in)" },
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      contact: "",
      bust: "",
      waist: "",
      hip: "",
      shoulder: "",
      sleeveLength: "",
    },
    validationSchema: measureSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`${EDIT_MEASURE}/${id}`, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        enqueueSnackbar("Measurements updated!", { variant: "success" });
        navigate("/measure");
      } catch (error) {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data) {
          formik.setValues(res.data);
        }
      } catch (error) {
        enqueueSnackbar("Failed to fetch measurement data", {
          variant: "error",
        });
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-950 rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to details" to={`/measure/${id}`} />
          <div />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Edit Measurement
          </h1>
          <p className="mt-2 text-gray-400">
            Update customer's personal and measurement details.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Section: Personal Details */}
          <div className="mb-8">
            <h2 className="flex items-center text-xl font-bold text-white mb-4">
              <FaUser className="mr-2 text-blue-400" />
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  className="w-full rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p className="mt-1 text-xs text-red-400">
                    {formik.errors.firstName}
                  </p>
                ) : null}
              </div>
              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  className="w-full rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p className="mt-1 text-xs text-red-400">
                    {formik.errors.lastName}
                  </p>
                ) : null}
              </div>
              <div className="sm:col-span-2 relative">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="text"
                  {...formik.getFieldProps("contact")}
                  className="w-full rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all"
                />
                {formik.touched.contact && formik.errors.contact ? (
                  <p className="mt-1 text-xs text-red-400">
                    {formik.errors.contact}
                  </p>
                ) : null}
              </div>
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
                  className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    {field.label}{" "}
                    <span className="text-gray-500">{field.unit}</span>
                  </p>
                  <input
                    type="number"
                    {...formik.getFieldProps(field.name)}
                    className="w-full text-center text-2xl font-bold bg-transparent text-blue-400 focus:outline-none"
                  />
                  {formik.touched[field.name] && formik.errors[field.name] ? (
                    <p className="mt-1 text-xs text-red-400">
                      {formik.errors[field.name]}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
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
            ) : (
              "Edit Measurement"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
