import materi from "../data/materi.json";

export const getMateriByMatkul = (idMatkul: string) =>
	materi.filter((m) => m.id_matkul === idMatkul);