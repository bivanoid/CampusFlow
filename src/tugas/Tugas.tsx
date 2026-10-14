import { Link } from "react-router-dom";
import { useTugas } from "../hooks/tugas";
import { getSemuaJadwal } from "../lib/jadwal";
import s from "./tugas.module.css";

export default function Tugas() {
	const dataJadwal = getSemuaJadwal();
	const dataTugas = useTugas();
	const namaHari = [
		"Senin",
		"Selasa",
		"Rabu",
		"Kamis",
		"Jumat",
		"Sabtu",
		"Minggu",
	];
	const tanggalIni = new Date().toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		timeZone: "Asia/Jakarta",
	});

	const hariIni = new Date().toLocaleDateString("id-ID", {
		weekday: "long",
		timeZone: "Asia/Jakarta",
	});

	const hariAdaMatkul = namaHari.filter((hari) =>
		dataJadwal.some((jadwal) => jadwal.hari === hari),
	);

	const totalSelesai = dataTugas.filter(
		(tugas) => tugas.status === true,
	).length;
	const mendekatiDeadline = dataTugas.filter(
		(tugas) => tugas.deadline > tanggalIni,
	);
	return (
		<div className={s.con_tugas}>
			<div className={s.information}>
				<div className={s.count_tugas}>
					<p>Tugas yang terselesaikan: </p>
					<p>{totalSelesai}</p>
					<p>/</p>
					<p>{dataTugas.length}</p>
				</div>
			</div>
			<div className={s.jadwal}>
				{hariAdaMatkul.map((hari) => (
					<div
						className={s.itemJadwal}
						style={{
							paddingLeft: `${hari === hariIni ? "0.75rem" : "0"}`,
						}}
						key={hari}
					>
						<span
							style={{
								display: `${hari === hariIni ? "block" : "none"}`,
							}}
						></span>
						<h1 className={hari === hariIni ? s.hariAktif : s.hari}>
							{hari}
						</h1>
						{dataJadwal
							.filter((jadwalPerhari) => jadwalPerhari.hari === hari)
							.map((namaMatkul) => (
								<Link
									to={`/tugas/${namaMatkul.id}`}
									className={s.matkul}
									key={namaMatkul.id}
								>
									<h2>{namaMatkul.nama_matkul}</h2>
									<p>{namaMatkul.ruang}</p>
									<p>{namaMatkul.pukul}</p>
								</Link>
							))}
					</div>
				))}
			</div>
		</div>
	);
}
