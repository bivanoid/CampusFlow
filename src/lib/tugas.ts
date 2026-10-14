import tugasJson from "../data/tugas.json";
import type { Tugas } from "../types/tugas";

export const tugasData = tugasJson as Tugas[];

export const byDeadline = (a: Tugas, b: Tugas) =>
	new Date(a.deadline).getTime() - new Date(b.deadline).getTime();

export const formatDeadline = (iso: string) =>
	new Date(iso).toLocaleDateString("id-ID", {
		weekday: "long",
		day: "numeric",
		month: "long",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Jakarta",
	});

export const getTugasByMatkul = (matkulId: string) =>
	tugasData.filter((t) => t.matkul_id === matkulId).sort(byDeadline);