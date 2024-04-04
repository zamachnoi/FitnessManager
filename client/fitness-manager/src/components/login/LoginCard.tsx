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

export const LoginCard = ({}) => {
	const navigate = useNavigate()

	const [isLogin, setIsLogin] = useState(true)

	const handleSubmit = async () => {
		if (isLogin) {
			const login = await postData("auth/login", {
				username: "m1",
				password: "123",
			})

			if (login.status === 200) {
				navigate("/dashboard")
			}
		}
		if (!isLogin) {
			await postData("auth/register", {
				username: "m4",
				password: "123",
				firstName: "John",
				lastName: "Doe",
				accountType: "Member",
			})
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
				/>
				{!isLogin ? (
					<>
						<Input
							type="firstName"
							placeholder="First Name"
							className="mb-4"
						/>
						<Input
							type="lastName"
							placeholder="Last Name"
							className="mb-4"
						/>
					</>
				) : null}
				<Input
					type="password"
					placeholder="Password"
					className="mb-4"
				/>

				{!isLogin ? (
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Account Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Account Type</SelectLabel>
								<SelectItem value="member">Member</SelectItem>
								<SelectItem value="trainer">Trainer</SelectItem>
								<SelectItem value="admin">Admin</SelectItem>
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
