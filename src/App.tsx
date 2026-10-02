import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./MainLayout";
import { AuthProvider } from "./context/AuthContext";
import Tugas from "./tugas/Tugas";
import Dashboard from "./dashboard/Dashboard";

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
						<Route path="/tugas" element={<Tugas />} />
						{/* halaman lain tinggal tambah di sini */}
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;