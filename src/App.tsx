import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Dashboard from "./dashboard/Dashboard";
import Pages from "./Pages";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Pages />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;