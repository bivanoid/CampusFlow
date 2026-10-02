export interface User {
	id: string;
	name: string;
	student_id: string;
	password: string;
	program: string;
	semester: number;
	avatar_url: string;
	ipk: number;
}

export type SafeUser = Omit<User, "password">;