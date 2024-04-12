import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react"

import { postData } from "@/utils/postData"
import { useUser } from "@/context/userContext"

const GoalForm = ({
	goals,
	setGoalsState,
}: {
	goals: any
	setGoalsState: any
}) => {
	const user = useUser()
	const userId = user.userId
	async function postGoal(goalVal: number) {
		const res = await postData(`members/${userId}/goals`, {
			weight_goal: goalVal,
		})
		return res.data
	}

	const [goal, setGoal] = useState<string>("")

	const onAdd = async () => {
		if (!goal) {
			return
		}
		const newGoal = await postGoal(parseInt(goal))
		setGoalsState([...goals, newGoal])
	}

	return (
		<div className="flex items-center justify-between space-x-4">
			<Input
				type="number"
				placeholder="add a goal..."
				value={goal}
				onChange={(e) => setGoal(e.target.value)}
			/>
			<Button className="btn" onClick={onAdd}>
				Add
			</Button>
		</div>
	)
}

export default GoalForm
