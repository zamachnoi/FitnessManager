import LoggedInNavbar from "./components/navbar/LoggedInNavbar"
import LoggedOutNavbar from "./components/navbar/LoggedOutNavbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import DashboardSelector from "./components/dashboardSelector/DashboardSelector"
import MainPage from "./components/mainPage/MainPage"
import { getData } from "./utils/getData"
import { useEffect, useState } from "react"

type SessionData = {
	user_id: number | undefined
	type: "Member" | "Trainer" | "Admin" | undefined
	authenticated: boolean | undefined
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

	const [userSession, setUserSession] = useState<SessionData | null>(null)

	const loggedIn = userSession?.authenticated
	return (
		<Router>
			{loggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route
					path="/dashboard"
					element={<DashboardSelector type={userSession?.type} />}
				/>
			</Routes>
		</Router>
	)
}

export default App
