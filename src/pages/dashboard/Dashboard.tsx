import s from "./dashboard.module.css";
import { useAuth } from "../../context/AuthContext";
import KalenderTugas from "../../components/layouts/KalenderTugas";
import { useTugas } from "../../hooks/tugas";
import { Link } from "react-router-dom";

import {
	ArrowUpRight,
	CalendarCheck,
	ChartPie,
	Clock,
	Scroll,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { getJadwalHarian, getSemuaJadwal } from "../../lib/jadwal";

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

	if (!user) return null;

	const tugas = useTugas();
	const jadwalHariIni = getJadwalHarian();
	const jadwalAll = getSemuaJadwal();
	const ipkNaik = user.ipk > user.ipk_semester_lalu;

	const totalSks = jadwalAll.reduce((total, m) => total + m.sks, 0);

	return (
		<div className={s.con_dashboard}>
			<div className={s.dates}>
				<h1>
					{hariIni}, {tanggalIni}
				</h1>
				<p>
					{user.name} - {user.student_id}
				</p>
			</div>
			<div className={s.ringkasan}>
				<div className={`${s.item_ringkasan} ${s.ipk}`}>
					<p>Nilai IPK</p>
					<h1>
						<ChartPie size={26} /> {user.ipk}
					</h1>
					<p>{ipkNaik ? "IPK anda meningkat" : "IPK anda menurun"}</p>
					{/*<div className={s.bintang}>
						<Star
							style={{
								color:
									user.ipk > 2 || user.ipk < 2
										? warnaBintang
										: "var(--white3)",
								fill:
									user.ipk > 2 || user.ipk < 2
										? warnaBintang
										: "var(--white3)",
							}}
						/>
						<Star
							style={{
								color: user.ipk > 2.5 ? warnaBintang : "var(--white3)",
								fill: user.ipk > 2.5 ? warnaBintang : "var(--white3)",
							}}
						/>
						<Star
							style={{
								color: user.ipk > 3 ? warnaBintang : "var(--white3)",
								fill: user.ipk > 3 ? warnaBintang : "var(--white3)",
							}}
						/>
						<Star
							style={{
								color: user.ipk == 4 ? warnaBintang : "var(--white3)",
								fill: user.ipk == 4 ? warnaBintang : "var(--white3)",
							}}
						/>
					</div>*/}
				</div>
				<div className={`${s.item_ringkasan} ${s.sks}`}>
					<p>Jumlah SKS</p>
					<h1>
						<Scroll size={26} /> {totalSks}
					</h1>
					<p>Dalam satu semester</p>
				</div>
				<div className={`${s.item_ringkasan} ${s.tugas}`}>
					<p>Tugas</p>
					<h1>
						<CalendarCheck size={26} /> {tugas.length}
					</h1>
					<p>Yang harus dituntaskan</p>
				</div>
			</div>

			<div className={s.jadwal}>
				{jadwalHariIni.length > 0 ? (
					<Swiper
						className={s.swiper_jadwal}
						spaceBetween={0}
						breakpoints={{
							480: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
							1440: { slidesPerView: 3 },
						}}
						freeMode
						grabCursor
						pagination={{
							dynamicBullets: true,
						}}
						modules={[Pagination]}
					>
						{jadwalHariIni.map((m) => (
							<SwiperSlide className={s.slide} key={m.id}>
								<Link to={"tugas/"} className={s.item_jadwal}>
									<h3 title={m.nama_matkul}>{m.nama_matkul}</h3>
									<div className={s.info}>
										{/*<MapPin />*/}
										<p>{m.ruang}</p>
									</div>
									<div className={s.info}>
										{/*<UserRound />*/}
										<p>{m.pengajar}</p>
									</div>
									<div className={s.jam}>
										<Clock size={18} />
										<p>{m.pukul}</p>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className={s.jadwal_kosong}>
						<p>Tidak ada jadwal hari ini.</p>
					</div>
				)}
			</div>

			<div className={s.con_kalender_tugas}>
				<div className={s.con_kalender}>
					<KalenderTugas />
				</div>
				<div className={s.con_tugas}>
					<h2>Daftar Tugas</h2>
					<div className={s.conItemTugas}>
						{tugas.map((tugas) => (
							<div className={s.itemTugas} key={tugas.id}>
								<p className={s.number}>{tugas.id}</p>
								<div className={s.con_text}>
									<h3>{tugas.judul}</h3>
									<p>{tugas.deadline}</p>
								</div>
								<Link
									className={s.button}
									to={`/tugas/${tugas.matkul_id}`}
								>
									<ArrowUpRight size={24} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
