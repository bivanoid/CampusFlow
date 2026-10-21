import userJson from "../data/user.json";
import type { User, PublicUser } from "../types/user";

const users = Object.values(userJson) as User[];

const hapusPassword = ({ password: _pw, ...publik }: User): PublicUser => publik;

export const authenticate = (studentId: string, password: string) => {
	const found = users.find(
		(u) => u.student_id === studentId && u.password === password
	);
	return found ? hapusPassword(found) : null;
};

export const getUserById = (id: string) => {
	const found = users.find((u) => u.id === id);
	return found ? hapusPassword(found) : null;
};

export const getInisial = (name: string) =>
	name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();