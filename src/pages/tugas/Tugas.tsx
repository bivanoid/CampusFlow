import { Link, Outlet, useParams } from "react-router-dom";
import { getSemuaJadwal } from "../../lib/jadwal";
import s from "./tugas.module.css";
import { ArrowUpRight, Clock } from "lucide-react";

export default function Tugas() {
	const dataJadwal = getSemuaJadwal();
	const namaHari = [
		"Senin",
		"Selasa",
		"Rabu",
		"Kamis",
		"Jumat",
		"Sabtu",
		"Minggu",
	];
	// const tanggalIni = new Date().toLocaleDateString("id-ID", {
	// 	day: "numeric",
	// 	month: "long",
	// 	timeZone: "Asia/Jakarta",
	// });

	const hariIni = new Date().toLocaleDateString("id-ID", {
		weekday: "long",
		timeZone: "Asia/Jakarta",
	});
	//
	// const hariIni = "Rabu"

	const hariAdaMatkul = namaHari.filter((hari) =>
		dataJadwal.some((jadwal) => jadwal.hari === hari),
	);

	const { id } = useParams();
	let nomor: number = 1;
	return (
		<div className={s.con_tugas}>
			<div className={s.con_horizontal}>
				<div className={s.jadwal}>
					{hariAdaMatkul.map((hari) => (
						<div
							className={s.itemJadwal}
							style={{
								paddingLeft: `${hari === hariIni ? "1.75rem" : "0"}`,
							}}
							key={hari}
						>
							<div className={s.active_day}
								style={{
									display: `${hari === hariIni ? "block" : "none"}`,
								}}
							>
								Hari ini
							</div>
							<h1 className={hari === hariIni ? s.hariAktif : s.hari}>
								<span className={s.count}>0{nomor++} </span>{hari}
							</h1>
							{dataJadwal
								.filter((jadwalPerhari) => jadwalPerhari.hari === hari)
								.map((namaMatkul) => (
									<div className={s.matkul} key={namaMatkul.id}>
										<h2>{namaMatkul.nama_matkul}</h2>
										<p>{namaMatkul.ruang}</p>
										<p>{namaMatkul.pengajar}</p>
										<div className={s.jam}>
											<Clock size={18} />
											<p>{namaMatkul.pukul}</p>
										</div>
										<Link
											className={s.button}
											to={`/tugas/${namaMatkul.id}`}
										>
											<ArrowUpRight size={24} />
										</Link>
									</div>
								))}
						</div>
					))}
				</div>
				<div className={`${s.detail} ${id ? s.detailAktif : ""}`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
