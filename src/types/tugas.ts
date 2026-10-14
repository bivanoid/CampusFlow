export interface Tugas {
	id: string;
	matkul_id: string;
	judul: string;
	deskripsi: string;
	deadline: string;
	status: boolean;
	dikumpulkan_pada: string | null;
	file: string | null;
	nilai: number | null;
	catatan_dosen: string | null;
}