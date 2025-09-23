import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = "http://localhost:5000/api/user";

export default function Profile() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Min 6 characters")
        .required("Password is required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`${BASE_URL}/`, values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // server returns { message, data }
        const updated = res.data?.data;
        if (updated) {
          formik.setValues({
            username: updated.username || "",
            email: updated.email || "",
            password: "",
          });
        }
        enqueueSnackbar("User updated successfully", { variant: "success" });
        navigate("/");
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || "User update failed",
          { variant: "error" }
        );
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data?.data) {
          const u = res.data.data;
          formik.setValues({
            username: u.username || "",
            email: u.email || "",
            password: "",
          });
        }
      } catch (error) {
        enqueueSnackbar("Failed to fetch user data", {
          variant: "error",
        });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-950 rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <BackButton label="Back to home" to="/" />
          <div />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Profile
          </h1>
          <p className="mt-2 text-gray-400">Manage your account details.</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="off"
                {...formik.getFieldProps("username")}
                className="w-full rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 py-3 px-4 transition-all"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="w-full rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500 py-3 px-4 pr-11 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 my-auto text-zinc-400 hover:text-zinc-200"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 active:scale-95"
          >
            {formik.isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
