import MemberDashboard from "./components/memberDashboard/MemberDashboard"
import LoggedInNavbar from "./components/navbar/LoggedInNavbar"
import LoggedOutNavbar from "./components/navbar/LoggedOutNavbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardSelector from "./components/dashboardSelector/DashboardSelector"
import MainPage from "./components/mainPage/MainPage"
import { UserProvider } from "./context/userContext"
import AdminDashboard from "./components/adminDashboard/AdminDashboard"

function App() {
	const loggedIn = false

	return (
		<UserProvider>
			<Router>
				{loggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/dashboard" element={<DashboardSelector />} />
					<Route path="/admin" element={<AdminDashboard />} />
				</Routes>
		</Router>
		</UserProvider>
		
	)
}

export default App
