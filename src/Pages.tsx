import NavigationTop from "./components/layouts/NavigationTop";
import Dashboard from "./dashboard/Dashboard";

export default function Pages() {
	return (
		<div className="pages" style={{ display: "flex", gap: "1rem" }}>
			<NavigationTop />
			<Dashboard />
		</div>
	);
}
