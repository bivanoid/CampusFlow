import { useState } from "react";
import { useUser } from "../../context/AuthContext";
import {
	Building2,
	CalendarDays,
	GraduationCap,
	Layers,
	Mail,
	MapPin,
} from "lucide-react";
import s from "./profil.module.css";

export default function Profil() {
	const user = useUser();
	const [avatarGagal, setAvatarGagal] = useState(false);

	const ringkasan = [
		{ label: "IPK Anda", value: user.ipk },
		{
			label: "Total Tagihan",
			value: user.tagihan.toLocaleString("id-ID", {
				style: "currency",
				currency: "IDR",
				maximumFractionDigits: 0,
			}),
		},
		{ label: "Jenis Kelas", value: user.jenis_kelas },
	];

	const detail = [
		{ icon: GraduationCap, label: "Program Studi", value: user.program },
		{ icon: Layers, label: "Semester", value: user.semester },
		{ icon: Mail, label: "Email", value: user.email },
		{
			icon: CalendarDays,
			label: "Tahun Angkatan",
			value: user.tahun_angkatan,
		},
		{ icon: MapPin, label: "Alamat", value: user.domisili },
		{
			icon: Building2,
			label: "Perguruan Tinggi",
			value: user.perguruan_tinggi,
		},
	];

	return (
		<div className={s.con_profil}>
			<div className={s.data}>
				<div className={s.biodata}>
					<div className={s.avatar}>
						{avatarGagal || !user.avatar_url ? (
							<div className={s.default_profile}>
								{user.name.charAt(0)}
							</div>
						) : (
							<img
								src={user.avatar_url}
								alt={user.name}
								onError={() => setAvatarGagal(true)}
							/>
						)}
					</div>
					<div className={s.identitas}>
						<h2>{user.name}</h2>
						<p>{user.student_id}</p>
					</div>
				</div>

				<div className={s.ringkasan}>
					{ringkasan.map((r) => (
						<div className={s.item} key={r.label}>
							<p>{r.label}</p>
							<h3>{r.value}</h3>
						</div>
					))}
				</div>

				<div className={s.details}>
					{detail.map(({ icon: Icon, label, value }) => (
						<div className={s.item_detail} key={label}>
							<span className={s.icon}>
								<Icon />
							</span>
							<div className={s.teks}>
								<p>{label}</p>
								<h4>{value}</h4>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
