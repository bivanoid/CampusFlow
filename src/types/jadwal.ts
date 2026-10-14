export type Hari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";

export interface Matkul {
	id: string;
	nama_matkul: string;
	hari: Hari;
	sks: number;
	ruang: string;
	pukul: string; 
	pengajar: string;
}

export interface JadwalHarian {
	hari: Hari;
	matkul: Matkul[];
}