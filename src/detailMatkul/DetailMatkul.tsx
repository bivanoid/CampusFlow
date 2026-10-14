import { Link, useParams } from "react-router-dom";
import { getMatkulById } from "../lib/jadwal";
import { getMateriByMatkul } from "../lib/materi";
import { getTugasByMatkul, formatDeadline } from "../lib/tugas";
import s from "./detailMatkul.module.css";

export default function DetailMatkul() {
	const { id = "" } = useParams();

	const matkul = getMatkulById(id);
	const materi = getMateriByMatkul(id);
	const tugas = getTugasByMatkul(id);

	if (!matkul) {
		return (
			<div className={s.con_detail}>
				<p>Mata kuliah tidak ditemukan.</p>
				<Link to="/tugas">Kembali</Link>
			</div>
		);
	}

	return (
		<div className={s.con_detail}>
			<Link to="/tugas">← Kembali</Link>

			<h1>{matkul.nama_matkul}</h1>
			<section className={s.section}>
				<h2>Tugas</h2>
				{tugas.length === 0 ? (
					<p>Belum ada tugas.</p>
				) : (
					tugas.map((t) => (
						<div className={s.card} key={t.id}>
							<h3>{t.judul}</h3>
							<p>{t.deskripsi}</p>
							<p>Deadline: {formatDeadline(t.deadline)}</p>
							<p>{t.status ? "Selesai" : "Belum selesai"}</p>
							{t.nilai !== null && <p>Nilai: {t.nilai}</p>}
						</div>
					))
				)}
			</section>

			<section className={s.section}>
				<h2>Materi</h2>
				{materi.length === 0 ? (
					<p>Belum ada materi.</p>
				) : (
					materi.map((m) => (
						<div className={s.card} key={m.id_materi}>
							<span>Pertemuan {m.pertemuan_ke}</span>
							<h3>{m.judul}</h3>
							<p>{m.deskripsi}</p>
						</div>
					))
				)}
			</section>
		</div>
	);
}
