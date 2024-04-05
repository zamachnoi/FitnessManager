import { useState } from "react"

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from "@/components/ui/select"
import { postData } from "@/utils/postData"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { useUser } from "@/context/userContext"

export const LoginCard = ({}) => {
	const navigate = useNavigate()

	const user = useUser()
	const [isLogin, setIsLogin] = useState(true)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [accountType, setAccountType] = useState("")

	const handleSubmit = async () => {
		if (isLogin) {
			const login = await postData("auth/login", {
				username: username,
				password: password,
			})

			if (login.status === 200) {
				user.setUserId(login.data.user_id)
				user.setUserType(login.data.type)
				navigate("/dashboard")
			}
		}
		if (!isLogin) {
			const register = await postData("auth/register", {
				username: username,
				password: password,
				firstName: firstName,
				lastName: lastName,
				accountType: accountType,
			})
			if (register.status === 200) {
				user.setUserId(register.data.user_id)
				user.setUserType(register.data.type)
				navigate("/dashboard")
			}
		}
	}

	const buttonText = isLogin ? "Login" : "Signup"

	return (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>{isLogin ? "Login" : "Signup"}</CardTitle>
			</CardHeader>
			<CardContent>
				<Input
					type="username"
					placeholder="Username"
					className="mb-4"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{!isLogin ? (
					<>
						<Input
							type="firstName"
							placeholder="First Name"
							className="mb-4"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<Input
							type="lastName"
							placeholder="Last Name"
							className="mb-4"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</>
				) : null}
				<Input
					type="password"
					placeholder="Password"
					className="mb-4"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{!isLogin ? (
					<Select onValueChange={(value) => setAccountType(value)}>
						<SelectTrigger>
							<SelectValue placeholder="Account Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Account Type</SelectLabel>
								<SelectItem value="Member">Member</SelectItem>
								<SelectItem value="Trainer">Trainer</SelectItem>
								<SelectItem value="Admin">Admin</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				) : null}
				<Button onClick={handleSubmit}>{buttonText}</Button>
			</CardContent>
			<CardFooter>
				{isLogin ? (
					<p>
						Don't have an account?{" "}
						<a href="#" onClick={() => setIsLogin(false)}>
							signup
						</a>
					</p>
				) : (
					<p>
						Already have an account?{" "}
						<a href="#" onClick={() => setIsLogin(true)}>
							login
						</a>
					</p>
				)}
			</CardFooter>
		</Card>
	)
}

export default LoginCard
