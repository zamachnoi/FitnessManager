import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HealthStatsType } from "./HealthStatsCard"
import { useEffect, useState } from "react"

import { postData } from "@/utils/postData"
import HealthStat from "./HealthStat"
import { useUser } from "@/context/userContext"

export type HealthStatsFormProps = {
	setHealthStats: React.Dispatch<React.SetStateAction<HealthStatsType[]>>
	healthStats: HealthStatsType[]
}

type HealthStatsData = {
	heart_rate: number
	systolic_bp: number
	diastolic_bp: number
}

export default function HealthStatsForm({
	healthStats,
	setHealthStats,
}: HealthStatsFormProps) {
	const user = useUser()
	const userId = user.userId
	const [errorText, setErrorText] = useState("")

	async function postHealthStat(data: HealthStatsData) {
		const res = await postData(`members/${userId}/stats`, data)
		return res.data
	}

	const [newStat, setNewStat] = useState({
		heart_rate: 0,
		systolic_bp: 0,
		diastolic_bp: 0,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewStat({
			...newStat,
			[e.target.name]: parseInt(e.target.value),
		})
	}

	useEffect(() => {
		setErrorText("")
	}, [newStat])

	const submit = async () => {
		console.log(newStat)
		for (let key in newStat) {
			if (
				isNaN(newStat[key as keyof typeof newStat]) ||
				newStat[key as keyof typeof newStat] === 0
			) {
				setErrorText("Please enter a number for all fields")
				return
			}
		}
		setErrorText("")
		console.log(newStat)
		const newStatRes = await postHealthStat(newStat)
		setHealthStats([...healthStats, newStatRes])
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row gap-2">
				<div className="flex flex-row gap-1">
					<p className="text-sm text-gray-500">Systolic BP</p>
					<Input
						min={0}
						onChange={handleChange}
						name="systolic_bp"
						type="number"
						defaultValue={0}
					/>
				</div>
				<div className="flex flex-row gap-1">
					<p className="text-sm text-gray-500">Diastolic BP</p>
					<Input
						min={0}
						onChange={handleChange}
						name="diastolic_bp"
						type="number"
						defaultValue={0}
					/>
				</div>
				<div className="flex flex-row gap-1">
					<p className="text-sm text-gray-500">Heart Rate</p>
					<Input
						min={0}
						onChange={handleChange}
						name="heart_rate"
						type="number"
						defaultValue={0}
					/>
				</div>
			</div>

			<p className="text-sm text-red-500">{errorText}</p>
			<Button onClick={submit}>Submit</Button>
		</div>
	)
}
