import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./MainLayout";
import { AuthProvider } from "./context/AuthContext";
import Tugas from "./tugas/Tugas";
import Dashboard from "./dashboard/Dashboard";
import DetailMatkul from "./detailMatkul/DetailMatkul";

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
						<Route path="/tugas/:id" element={<DetailMatkul />}/>
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;