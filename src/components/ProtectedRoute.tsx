
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { user } = useAuth();
	return user ? <>{children}</> : <Navigate to="/login" replace />;
}