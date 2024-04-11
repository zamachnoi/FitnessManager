// UserContext.tsx
import { set } from "date-fns"
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	FunctionComponent,
} from "react"

type UserContextType = {
	userId: string | null
	setUserId: (userId: string | null) => void
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
	const [userId, setUserId] = useState<string | null>(null)
	const [userType, setUserType] = useState<
		"Member" | "Trainer" | "Admin" | null
	>(null)

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
