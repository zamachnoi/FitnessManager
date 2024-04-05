import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardSelector from "./components/dashboardSelector/DashboardSelector"
import MainPage from "./components/mainPage/MainPage"
import { UserProvider } from "./context/userContext"
import AdminDashboard from "./components/adminDashboard/AdminDashboard"
import TrainerDashboard from "./components/trainerDashboard/TrainerDashboard"
import MemberDashboard from "./components/memberDashboard/MemberDashboard"
import { Toaster } from "./components/ui/sonner"
import Navbar from "./components/navbar/SelectNavbar"

function App() {
	return (
		<UserProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/dashboard" element={<DashboardSelector />} />
					<Route path="/admin" element={<AdminDashboard />} />
					<Route path="/trainer" element={<TrainerDashboard />} />
					<Route path="/member" element={<MemberDashboard />} />
				</Routes>
				<Toaster />
			</Router>
		</UserProvider>
	)
}

export default App
