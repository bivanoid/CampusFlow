import { useMemo } from "react";
import { jadwalData, semuaMatkul, getHariIni } from "../lib/jadwal";

export function useJadwalHariIni(hari = getHariIni()) {
	return useMemo(() => {
		const matkul =
			jadwalData.find((j) => j.hari.toLowerCase() === hari.toLowerCase())
				?.matkul ?? [];
		return { hari, matkul, adaJadwal: matkul.length > 0 };
	}, [hari]);
}

export const useJadwalMingguan = () => jadwalData;

export function useMatkulDetail(id: string) {
	return useMemo(() => semuaMatkul.find((m) => m.id === id), [id]);
}