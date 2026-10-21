import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.webp";
import s from "./login.module.css";

export default function Login() {
	const { user, login } = useAuth();
	const navigate = useNavigate();
	const [studentId, setStudentId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	if (user) return <Navigate to="/" replace />;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (login(studentId.trim(), password)) {
			navigate("/", { replace: true });
		} else {
			setError("NIM atau password mungkin salah.");
		}
};

	return (
		<div className={s.con}>
			<div className={s.con_form}>
				<div className={s.title}>
					<span className={s.logo}>
						<img src={logo} alt="CampusFlow" />
						
					</span>
					<h1>Buka Materi</h1>
					<p>dan Tugasmu!</p>
				</div>
				{error && <p className={s.error}>{error}</p>}
				<form className={s.form} onSubmit={handleSubmit}>
					<div className={s.con_input}>
						<input
							type="text"
							inputMode="numeric"
							autoComplete="username"
							placeholder="NIM"
							value={studentId}
							onChange={(e) => {
								setStudentId(e.target.value);
								setError("");
							}}
							required
						/>
						<input
							type="password"
							autoComplete="current-password"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setError("");
							}}
							required
						/>
					</div>

					<button type="submit" aria-label="Masuk">
						<LockOpen size={22} />
					</button>
				</form>
			</div>
		</div>
	);
}