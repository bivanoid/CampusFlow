import { createContext, useContext, useState, type ReactNode } from "react";
import { authenticate, getUserById } from "../lib/user";
import type { PublicUser } from "../types/user";

type LoginResult = { ok: true } | { ok: false; message: string };

interface AuthContextType {
	user: PublicUser | null;
	login: (studentId: string, password: string) => LoginResult;
	logout: () => void;
}

const STORAGE_KEY = "campusflow_user_id";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<PublicUser | null>(() => {
		const savedId = localStorage.getItem(STORAGE_KEY);
		return savedId ? getUserById(savedId) : null;
	});

	const login = (studentId: string, password: string): LoginResult => {
		const found = authenticate(studentId, password);
		if (!found) return { ok: false, message: "NIM atau password salah." };

		setUser(found);
		localStorage.setItem(STORAGE_KEY, found.id);
		return { ok: true };
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem(STORAGE_KEY);
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

export function useUser(): PublicUser {
	const { user } = useAuth();
	if (!user) throw new Error("useUser hanya dipakai di halaman yang sudah login");
	return user;
}