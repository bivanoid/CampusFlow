// src/components/navigation/Navigation.tsx
import { NavLink } from "react-router-dom";
import {
	ChevronsLeftRight,
	LogOut,
	Menu,
	NotepadText,
	Settings2,
	University,
	X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import s from "./navigation.module.css";
import Dialog from "./Dialog";
import logo from "../../assets/logo.webp"

const links = [
	{ to: "/", label: "Dashboard", icon: University, end: true },
	{ to: "/tugas", label: "Tugas", icon: NotepadText },
	{ to: "/pengaturan", label: "Pengaturan", icon: Settings2 },
];

export default function Navigation() {
	const { user, logout } = useAuth();
	const [showLogout, setShowLogout] = useState(false);
	const [expand, setExpand] = useState(false);
	const [phone, setPhone] = useState(false);
	const namaDepan = user?.name.split(" ")[0] ?? "";

	return (
		<div
			className={`${s.con_menu} ${expand ? s.expand_menu : ""} ${
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
						className={s.expand}
						onClick={() => setExpand((prev) => !prev)}
						aria-label="Perluas menu"
					>
						<ChevronsLeftRight
							size={22}
							style={{ rotate: expand ? "180deg" : "0deg" }}
						/>
					</button>

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
					<div className={s.profile}>
						<span>
							<img
								src={user?.avatar_url}
								alt={user?.name}
								onError={(e) => {
									e.currentTarget.src = "/images/user/default.jpeg";
								}}
							/>
						</span>
						<p>{namaDepan}</p>
					</div>
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
	);
}
