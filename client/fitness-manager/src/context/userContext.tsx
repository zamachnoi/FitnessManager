// UserContext.tsx
import { getData } from "@/utils/getData"
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	FunctionComponent,
	useEffect,
} from "react"

type UserContextType = {
	userId: number | null
	setUserId: (userId: number | null) => void
	userType: "Member" | "Trainer" | "Admin" | null
	setUserType: (userType: "Member" | "Trainer" | "Admin" | null) => void
}

// Define the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined)

type UserProviderProps = {
	children: ReactNode
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({
	children,
}) => {
	const authEnabled = true
	ß
	const [userId, setUserId] = useState<number | null>(null)
	const [userType, setUserType] = useState<
		"Member" | "Trainer" | "Admin" | null
	>(null)

	const getSessionData = async () => {
		const sessionData = await getData("auth/dashboard")
		if (authEnabled) {
			console.log(sessionData)
			if (sessionData.status !== 200) {
				setUserId(null)
				setUserType(null)
				return
			} else {
				setUserId(sessionData.data.user_id)
				setUserType(sessionData.data.type)
				console.log(userType)
			}
		} else {
			setUserId(1)
			setUserType("Member")
		}
	}

	useEffect(() => {
		getSessionData()
	}, [])

	const value = { userId, setUserId, userType, setUserType }

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Custom hook to use the context
export function useUser() {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider")
	}
	return context
}
