import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./MainLayout";
import { AuthProvider } from "./context/AuthContext";
import Tugas from "./pages/tugas/Tugas";
import Dashboard from "./pages/dashboard/Dashboard";
import DetailMatkul from "./pages/detailMatkul/DetailMatkul";
import Profil from "./pages/profil/Profil";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					{/* tanpa navigasi */}
					<Route path="/login" element={<Login />} />

					<Route
						element={
							<ProtectedRoute>
								<MainLayout />
							</ProtectedRoute>
						}
					>
						<Route path="/" element={<Dashboard />} />
						<Route path="/tugas" element={<Tugas />}>
							<Route
								index
								element={<p className="kosong">Pilih mata kuliah untuk melihat detail.</p>}
							/>
							<Route path=":id" element={<DetailMatkul />} />
						</Route>
						<Route path="/profil" element={<Profil />} />
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
