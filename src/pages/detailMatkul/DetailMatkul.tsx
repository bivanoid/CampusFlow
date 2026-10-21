import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMatkulById } from "../../lib/jadwal";
import { getMateriByMatkul } from "../../lib/materi";
import { getTugasByMatkul, formatDeadline } from "../../lib/tugas";
import { useTugasSelesai } from "../../hooks/tugasSelesai";
import type { Tugas } from "../../types/tugas";
import s from "./detailMatkul.module.css";
import { File, FileMinus, FileText, Plus, Undo2 } from "lucide-react";
import Dialog from "../../components/layouts/Dialog";

interface CardProps {
	t: Tugas;
	selesai: boolean;
	onSelesai: (id: string) => void;
}

function CardTugas({ t, selesai, onSelesai }: CardProps) {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [muncul, setMuncul] = useState<boolean>(false);

	const kirim = () => {
		if (!file) return;
		setLoading(true);
		setTimeout(() => {
			onSelesai(t.id);
			setLoading(false);
			setFile(null);
			setMuncul(true);
		}, 1500);
	};

	return (
		<div className={s.card}>
			<div className={s.thumbnail}>
				<FileMinus size={22}/>
			</div>
			<div className={s.con_text}>
				<h3>{t.judul}</h3>
				<p>{t.deskripsi}</p>
				<p>Deadline: {formatDeadline(t.deadline)}</p>
				<p className={selesai ? s.selesai : s.belum}>
					{selesai ? "Selesai" : "Belum selesai"}
				</p>
				{t.nilai !== null && <p>Nilai: {t.nilai}</p>}

				{!selesai && (
					<div className={s.upload}>
						<label className={s.pilih}>
							{file ? (<p><File size={15} />{file.name}</p>) : (<p><Plus size={15}/> Pilih File</p>)}
							<input
								type="file"
								hidden
								onChange={(e) => setFile(e.target.files?.[0] ?? null)}
							/>
						</label>
						<button
							type="button"
							className={s.kirim}
							onClick={kirim}
							disabled={!file || loading}
						>
							{loading ? "Mengunggah..." : "Kumpulkan"}
						</button>
					</div>
				)}
			</div>
		
			<Dialog
				open={muncul}
				title="Sukses Dikirim"
				text="Tugas berhasil dikirim."
				option={false}
				confirmLabel="Baik"
				onConfirm={() => setMuncul(false)}
				onCancel={() => setMuncul(false)}
			/>
		</div>
	);
}

export default function DetailMatkul() {
	const { id = "" } = useParams();
	const { isSelesai, tandaiSelesai } = useTugasSelesai();

	const matkul = getMatkulById(id);
	const materi = getMateriByMatkul(id);
	const tugas = getTugasByMatkul(id);

	if (!matkul) {
		return (
			<div className={s.tidak_ada}>
				<p>Mata kuliah tidak ditemukan.</p>
				<Link to="/tugas">Kembali</Link>
			</div>
		);
	}

	return (
		<div className={s.con_detail}>
			<Link className={s.back} to="/tugas">
			 <Undo2 size={16}/>Kembali
			</Link>

			<h1>{matkul.nama_matkul}</h1>
			<section className={s.tugas}>
				<h2>Tugas</h2>
				{tugas.length === 0 ? (
					<p className={s.belum_ada}>Belum ada tugas.</p>
				) : (
					tugas.map((t) => (
						<CardTugas
							key={t.id}
							t={t}
							selesai={isSelesai(t.id, t.status)}
							onSelesai={tandaiSelesai}
						/>
					))
				)}
			</section>

			<section className={s.materi}>
				<h2>Materi</h2>
				{materi.length === 0 ? (
					<p>Belum ada materi.</p>
				) : (
					materi.map((m) => (
						<div className={s.card} key={m.id_materi}>
							<div className={`${s.thumbnail} ${s.thumbnail_materi}`}>
								<FileText size={22}/>
							</div>
							<div className={s.con_text}>
								<span>Pertemuan {m.pertemuan_ke}</span>
								<h3>{m.judul}</h3>
								<p>{m.deskripsi}</p>
							</div>
						</div>
					))
				)}
			</section>
		</div>
	);
}
