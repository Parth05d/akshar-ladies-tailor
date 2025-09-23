import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen">
      <img
        src="/image.png"
        alt="hero-img"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/60">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to TailorMate
        </h1>
        <p className="mt-4 text-lg text-zinc-200">
          Store and manage your measurements online
        </p>
        <button
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-lg"
          onClick={() => navigate("/measure")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
