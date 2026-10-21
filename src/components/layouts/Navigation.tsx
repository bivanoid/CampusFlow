import { Link, NavLink } from "react-router-dom";
import {
	LogOut,
	Menu,
	NotepadText,
	University,
	X,
} from "lucide-react";
import { useState } from "react";
import s from "./navigation.module.css";
import Dialog from "./Dialog";
import logo from "../../assets/logo.webp";
import { useAuth } from "../../context/AuthContext";

const links = [
	{ to: "/", label: "Dashboard", icon: University, end: true },
	{ to: "/tugas", label: "Tugas", icon: NotepadText },
	// { to: "/pengaturan", label: "Pengaturan", icon: Settings2 },
];

export default function Navigation() {
	const { user, logout } = useAuth();
	const [showLogout, setShowLogout] = useState(false);
	const [phone, setPhone] = useState(false);
	const namaDepan = user?.name.split(" ")[0] ?? "";
	const [avatarGagal, setAvatarGagal] = useState<boolean>(false);

	return (
		<>
			<div
				className={`${s.overlay} ${phone ? s.overlay_show : ""}`}
				onClick={() => setPhone(false)}
			/>
			<div
				className={`${s.con_menu} ${
					phone ? s.phone_open : ""
				}`}
			>
				<div className={s.menu}>
					<div className={s.header}>
						<div className={s.title}>
							<span className={`${s.logo} ${phone ? s.scale : ""}`}>
								<img src={logo} />
							</span>
							<h1>CampusFlow</h1>
						</div>

						<button
							type="button"
							className={s.hamburger}
							onClick={() => setPhone((prev) => !prev)}
							aria-label="Buka menu"
						>
							{phone ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>

					<div className={s.con_links}>
						{links.map(({ to, label, icon: Icon, end }) => (
							<NavLink
								key={to}
								to={to}
								end={end}
								onClick={() => setPhone(false)}
								className={({ isActive }) =>
									isActive ? s.active : s.link
								}
							>
								<span>
									<Icon size={22} />
								</span>
								<p>{label}</p>
							</NavLink>
						))}
					</div>

					<span
						className={`separator ${s.separator}`}
						style={{ marginBottom: "auto" }}
					></span>

					<div className={s.con_profile}>
						<Link to="/profil" className={s.profile}>
							<span>
								{avatarGagal || !user?.avatar_url ? (
									<div className="default_profile">
										{user?.name.charAt(0)}
									</div>
								) : (
									<img
										src={user?.avatar_url}
										alt={user?.name}
										onError={() => setAvatarGagal(true)}
									/>
								)}
							</span>
							<p>{namaDepan}</p>
						</Link>
						<button
							className={s.logout}
							onClick={() => setShowLogout(true)}
						>
							<span>
								<LogOut size={22} />
							</span>
							<p>Logout</p>
						</button>
					</div>
				</div>
				<Dialog
					open={showLogout}
					title="Keluar dari akun?"
					text="Kamu harus login lagi untuk mengakses CampusFlow."
					confirmLabel="Logout"
					cancelLabel="Batal"
					danger
					onConfirm={logout}
					onCancel={() => setShowLogout(false)}
				/>
			</div>
		</>
	);
}
