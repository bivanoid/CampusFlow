// src/login/Login.tsx
import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
	const { user, login } = useAuth();
	const navigate = useNavigate();
	const [studentId, setStudentId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	if (user) return <Navigate to="/" replace />;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = login(studentId.trim(), password);

		if (result.ok) {
			navigate("/", { replace: true });
		} else {
			setError(result.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>CampusFlow</h1>

			<input
				type="text"
				placeholder="NIM"
				value={studentId}
				onChange={(e) => setStudentId(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			{error && <p>{error}</p>}

			<button type="submit">Masuk</button>
		</form>
	);
}