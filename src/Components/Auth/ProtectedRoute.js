import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  // const { user } = useAppContext();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to={"/TaaslaLegal/login"} state={{ from: location }} />;
  } else {
    return children;
  }
}
