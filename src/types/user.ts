export interface User {
	id: string;
	name: string;
	student_id: string;
	password: string;
	program: string;
	semester: number;
	avatar_url: string;
	ipk: number;
	ipk_semester_lalu: number;
	tahun_angkatan: number;
	perguruan_tinggi: string;
	jenis_kelas: string;
	email: string;
	domisili: string;
	tagihan: number;
}

export type PublicUser = Omit<User, "password">;