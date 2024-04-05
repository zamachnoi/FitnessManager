import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import DashboardCard from "@/components/util/DashboardCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { patchData } from "@/utils/patchData"
import { getData } from "@/utils/getData"
import { useEffect } from "react"
import { useUser } from "@/context/userContext"

const PersonalInfoSchema = z.object({
	username: z.string().min(1, "Username is required"),
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	weight: z.number().min(1, "Weight must be greater than 0"),
	password: z.string().optional(),
})

type PersonalInfoType = {
	username?: string
	first_name?: string
	last_name?: string
	weight?: number
	password?: string
}

const PersonalInfoCard = () => {
	const user = useUser()
	const userId = user.userId
	const { register, handleSubmit, setValue } = useForm({
		resolver: zodResolver(PersonalInfoSchema),
	})

	async function updatePersonalInfo(data: PersonalInfoType) {
		const res = await patchData(`members/${userId}`, data) //GET MEMBER ID
		return res.data
	}

	async function getPersonalInfo() {
		const res = await getData(`members/${userId}`)
		return res.data
	}

	useEffect(() => {
		getPersonalInfo().then((data) => {
			// Set form default values
			Object.keys(data).forEach((key) => {
				setValue(key, data[key])
			})
		})
	}, [setValue])

	const onSubmit = async (data: PersonalInfoType) => {
		const cleanedData: PersonalInfoType = Object.entries(data)
			.filter(([key, value]) => value != null && value !== "")
			.reduce(
				(acc, [key, value]) => ({ ...acc, [key]: value }),
				{} as PersonalInfoType
			)

		await updatePersonalInfo(cleanedData)
	}

	return (
		<DashboardCard
			title="Personal Info"
			description="Update your personal information"
			footer={
				<Button className="btn" form="personal-info-form" type="submit">
					Update
				</Button>
			}
		>
			<form
				id="personal-info-form"
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				<Input
					type="text"
					placeholder="Username"
					{...register("username")}
					className="mb-4"
				/>
				<Input
					type="text"
					placeholder="First Name"
					{...register("first_name")}
					className="mb-4"
				/>
				<Input
					type="text"
					placeholder="Last Name"
					{...register("last_name")}
					className="mb-4"
				/>
				<Input
					type="number"
					placeholder="Weight"
					{...register("weight", { valueAsNumber: true })}
					className="mb-4"
				/>
				<Input
					type="password"
					placeholder="New Password (optional)"
					{...register("password")}
					className="mb-4"
				/>
			</form>
		</DashboardCard>
	)
}

export default PersonalInfoCard
