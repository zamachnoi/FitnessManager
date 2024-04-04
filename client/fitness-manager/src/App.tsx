import MemberDashboard from "./components/memberDashboard/MemberDashboard"
import LoggedInNavbar from "./components/navbar/LoggedInNavbar"
import LoggedOutNavbar from "./components/navbar/LoggedOutNavbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardSelector from "./components/dashboardSelector/DashboardSelector"
import MainPage from "./components/mainPage/MainPage"

function App() {
	const loggedIn = false

	return (
		<Router>
			{loggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/dashboard" element={<DashboardSelector />} />
			</Routes>
		</Router>
	)
}

export default App
