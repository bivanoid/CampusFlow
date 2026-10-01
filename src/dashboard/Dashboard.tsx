import { Clock, UserRound } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import jadwalData from "../data/jadwal.json";
import s from "./dashboard.module.css";

const hariIni = new Date().toLocaleDateString("id-ID", {
	weekday: "long",
	timeZone: "Asia/Jakarta",
});

export default function Dashboard() {
	const jadwalHariIni = jadwalData.jadwal.find(
		(hari) => hari.hari === hariIni
	);

	return (
		<div className={s.con_dashboard}>
			<h2><span className={s.dot}></span>{hariIni}<span className={s.fade}>/ 21 June</span></h2>

			<h1>CampusFlow</h1>
			<div className={s.jadwal}>
				<p>Jadwal Hari Ini</p>

				{jadwalHariIni ? (
					<Swiper
						className={s.con_items}
						slidesPerView="auto"
						spaceBetween={12}
						freeMode
						grabCursor
						modules={[FreeMode]}
					>
						{jadwalHariIni.matkul.map((matkul) => (
							<SwiperSlide className={s.slide} key={matkul.nama_matkul}>
								<div className={s.item}>
									<h3>{matkul.nama_matkul}</h3>
									<div className={s.pukul_ruang}>
										<Clock size={18} />
										<p>{matkul.pukul}</p>
										|
										<p>{matkul.ruang}</p>
									</div>
									<p className={s.pengajar}>
										<UserRound size={18} />
										{matkul.pengajar}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<p>Tidak ada jadwal hari ini.</p>
				)}
			</div>
		</div>
	);
}