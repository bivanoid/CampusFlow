import jadwal from "../data/jadwal.json";

export const getHariIni = () =>
	new Date().toLocaleDateString("id-ID", {
		weekday: "long",
		timeZone: "Asia/Jakarta",
	});

export const getJadwalHarian = (hari = getHariIni()) =>
	jadwal.filter((m) => m.hari === hari);

export const getMatkulById = (id: string) =>
	jadwal.find((m) => m.id === id);

export const getSemuaJadwal = () => jadwal;