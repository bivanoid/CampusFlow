// src/login/Login.tsx
import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import s from "./login.module.css";
import { LockOpen } from "lucide-react";

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
		<div className={s.con}>
			<div className={s.con_form}>
				<div className={s.title}>
					<span>
						
					</span>
					<h1>
						Masukan NIM dan Passoword
					</h1>
				</div>
				<form className={s.form} onSubmit={handleSubmit}>
					<div className={s.con_input}>
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
					</div>

					{error && <p>{error}</p>}

					<button type="submit">
						<LockOpen size={22} />
					</button>
				</form>
			</div>
		</div>
	);
}
