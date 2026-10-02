import { createContext, useContext, useState, type ReactNode } from "react";
import usersData from "../data/user.json";
import type { SafeUser, User } from "../types/user";

type LoginResult = { ok: true } | { ok: false; message: string };

interface AuthContextType {
	user: SafeUser | null;
	login: (studentId: string, password: string) => LoginResult;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<SafeUser | null>(() => {
		try {
			const saved = localStorage.getItem("user");
			return saved ? (JSON.parse(saved) as SafeUser) : null;
		} catch {
			return null;
		}
	});

	const login = (studentId: string, password: string): LoginResult => {
		const found = (Object.values(usersData) as User[]).find(
			(u) => u.student_id === studentId && u.password === password
		);

		if (!found) return { ok: false, message: "NIM atau password salah." };

		const { password: _pw, ...safeUser } = found;
		setUser(safeUser);
		localStorage.setItem("user", JSON.stringify(safeUser));
		return { ok: true };
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
	return ctx;
}