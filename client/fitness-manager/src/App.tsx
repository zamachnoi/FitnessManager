import LoggedInNavbar from "./components/navbar/LoggedInNavbar"
import LoggedOutNavbar from "./components/navbar/LoggedOutNavbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardSelector from "./components/dashboardSelector/DashboardSelector"
import MainPage from "./components/mainPage/MainPage"
import { UserProvider } from "./context/userContext"
import AdminDashboard from "./components/adminDashboard/AdminDashboard"
import TrainerDashboard from "./components/trainerDashboard/TrainerDashboard"
import MemberDashboard from "./components/memberDashboard/MemberDashboard"
import { useEffect, useState } from "react"
import { getData } from "./utils/getData"
import { Toaster } from "./components/ui/sonner"

type SessionData = {
	type: "Member" | "Trainer" | "Admin" | "none"
	user_id: number
	authenticated: boolean
}

function App() {
	const authEnabled = false

	const getSessionData = async () => {
		const sessionData = await getData("auth/dashboard")
		if (authEnabled) {
			setUserSession(sessionData.data)
		} else {
			setUserSession({
				type: "Member", // change between dashboards by changing this value
				user_id: 1,
				authenticated: true,
			})
		}
	}

	useEffect(() => {
		getSessionData()
	}, [])

	const [userSession, setUserSession] = useState<SessionData>({
		type: "none",
		user_id: 0,
		authenticated: false,
	})

	const loggedIn = userSession?.authenticated
	return (
		<UserProvider>
			<Router>
				
				{loggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route
						path="/dashboard"
						element={<DashboardSelector type={userSession.type} />}
					/>
					<Route path="/admin" element={<AdminDashboard />} />
					<Route path="/trainer" element={<TrainerDashboard />} />
					<Route path="/member" element={<MemberDashboard memberId={1}/>} />
				</Routes>
				<Toaster />
			</Router>
		</UserProvider>
	)
}

export default App
