import jadwalJson from "../data/jadwal.json";
import type { JadwalHari, MatkulDenganId } from "../types/jadwal";

export const jadwalData = jadwalJson as JadwalHari[];

export const slugify = (s: string) =>
	s
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

export const getHariIni = () =>
	new Date().toLocaleDateString("id-ID", {
		weekday: "long",
		timeZone: "Asia/Jakarta",
	});

export const semuaMatkul: MatkulDenganId[] = jadwalData.flatMap((j) =>
	j.matkul.map((m) => ({ ...m, id: slugify(m.nama_matkul), hari: j.hari }))
);