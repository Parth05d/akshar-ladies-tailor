import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from "../config";
const BASE_URL = `${API_BASE_URL}/api/user`;

export default function SignUp() {
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
    onSubmit: async (values) => {
      try {
        await axios.post(`${BASE_URL}/register`, values);
        enqueueSnackbar("Account created successfully", { variant: "success" });
        navigate("/login");
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || "Registration failed",
          { variant: "error" }
        );
      }
    },
  });
  return (
    <div className="flex items-center justify-center mt-20 px-4 font-domine">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col bg-zinc-800 dark:bg-zinc-900 rounded-2xl shadow-2xl text-white w-full max-w-md p-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/tailor-mate-logo.png" alt="logo" className="h-24 w-auto" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Join TailorMate</h1>

        {/* Inputs */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="mb-1 bg-zinc-700 dark:bg-zinc-800 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="mb-3 text-sm text-red-400">{formik.errors.username}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mb-1 bg-zinc-700 dark:bg-zinc-800 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mb-3 text-sm text-red-400">{formik.errors.email}</p>
        )}
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full bg-zinc-700 dark:bg-zinc-800 rounded-2xl px-4 py-3 pr-11 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
        {formik.touched.password && formik.errors.password && (
          <p className="mb-4 text-sm text-red-400">{formik.errors.password}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 rounded-2xl font-semibold text-lg transition"
        >
          Sign Up
        </button>

        {/* Optional Footer */}
        <p className="mt-6 text-center text-zinc-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}
