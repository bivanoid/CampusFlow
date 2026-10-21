// src/hooks/tugasSelesai.ts
import { useState } from "react";

const KEY = "tugas_selesai";

const baca = (): string[] => {
	try {
		return JSON.parse(localStorage.getItem(KEY) ?? "[]");
	} catch {
		return [];
	}
};

export function useTugasSelesai() {
	const [ids, setIds] = useState<string[]>(baca);

	const tandaiSelesai = (id: string) =>
		setIds((prev) => {
			const next = [...new Set([...prev, id])];
			localStorage.setItem(KEY, JSON.stringify(next));
			return next;
		});

	// selesai jika di JSON sudah true, atau sudah "diunggah" user
	const isSelesai = (id: string, statusAwal: boolean) =>
		statusAwal || ids.includes(id);

	return { isSelesai, tandaiSelesai };
}