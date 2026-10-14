import s from "./dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import KalenderTugas from "../components/layouts/KalenderTugas";
import { useTugas } from "../hooks/tugas";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
const hariIni = new Date().toLocaleDateString("id-ID", {
	weekday: "long",
	timeZone: "Asia/Jakarta",
});

const tanggalIni = new Date().toLocaleDateString("id-ID", {
	day: "numeric",
	month: "long",
	timeZone: "Asia/Jakarta",
});

export default function Dashboard() {
	const { user } = useAuth();
	const tugas = useTugas();
	const [totalSks, setTotalSKS] = useState<number>(0)
	const ipkNaik = user.ipk > user.ipk_semester_lalu;

	return (
		<div className={s.con_dashboard}>
			<div className={s.header}>
				<p>Dashboard</p>
				<p>
					{user.name} - {user.student_id}KOntol
				</p>
			</div>
			<div className={s.dates}>
				<p>
					{hariIni}, {tanggalIni}
				</p>
			</div>
			<div className={s.ringkasan}>
				<div className={`${s.item_ringkasan} ${s.ipk}`}>
					<p>Nilai IPK</p>
					<h1>{user.ipk}</h1>
					<p>{ipkNaik ? "IPK anda meningkat" : "IPK anda menurun"}</p>
				</div>
				<div className={`${s.item_ringkasan} ${s.sks}`}>
					<p>Jumlah SKS</p>
					<h1>{totalSks}</h1>
					<p>Dalam satu semester</p>
				</div>
				<div className={`${s.item_ringkasan} ${s.tugas}`}>
					<p>Tugas</p>
					<h1>{tugas.length}</h1>
					<p>Yang harus dituntaskan</p>
				</div>
			</div>

			<div className={s.con_kalender_tugas}>
				<div className={s.con_kalender}>
					<KalenderTugas />
				</div>
				<div className={s.con_tugas}>
					<h2>Daftar Tugas</h2>
					<div className={s.conItemTugas}>
						{tugas.map((tugas) => (
							<div className={s.itemTugas}  key={tugas.id}>
								<p className={s.number}>{tugas.id}</p>
								<div className={s.con_text}>
									<h3>{tugas.judul}</h3>
									<p>{tugas.deadline}</p>
								</div>
								<Link className={s.button} to={`/tugas/${tugas.matkul_id}`} ><ArrowUpRight size={24}/></Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
