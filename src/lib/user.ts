import userJson from "../data/user.json";
import type { User, PublicUser } from "../types/user";

const userData = userJson as Record<string, User>;

const toPublic = ({ password: _password, ...rest }: User): PublicUser => rest;

export const getAllUsers = (): PublicUser[] =>
	Object.values(userData).map(toPublic);

export const getUserById = (id: string): PublicUser | undefined => {
	const user = userData[id];
	return user ? toPublic(user) : undefined;
};

export const getUserByStudentId = (studentId: string): PublicUser | undefined => {
	const user = Object.values(userData).find((u) => u.student_id === studentId);
	return user ? toPublic(user) : undefined;
};

export const authenticate = (
	studentId: string,
	password: string
): PublicUser | null => {
	const user = Object.values(userData).find(
		(u) => u.student_id === studentId && u.password === password
	);
	return user ? toPublic(user) : null;
};

export const getInisial = (name: string): string =>
	name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();