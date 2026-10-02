import { Outlet } from "react-router-dom";
import Navigation from "./components/layouts/Navigation";

export default function MainLayout() {
	return (
		<>
			<Navigation />
			<main className="mainLayout">
				<Outlet />
			</main>
		</>
	);
}
