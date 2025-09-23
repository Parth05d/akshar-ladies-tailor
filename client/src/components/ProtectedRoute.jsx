import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  return Navigate({ to: "/login" });
}
