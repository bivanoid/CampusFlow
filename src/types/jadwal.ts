export type NamaHari = "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";

export interface Matkul {
	nama_matkul: string;
	ruang: string;
	pukul: string; 
	pengajar: string;
	sks?: number;
}

export interface MatkulDenganId extends Matkul {
	id: string;
	hari: NamaHari;
}

export interface JadwalHari {
	id: string;
	hari: NamaHari;
	matkul: Matkul[];
}