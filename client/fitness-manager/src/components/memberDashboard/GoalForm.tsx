import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react"

import { postData } from "@/utils/postData"
import { useUser } from "@/context/userContext"

import { DatePicker } from "../util/DatePicker"

const GoalForm = ({
	goals,
	setGoalsState,
}: {
	goals: any
	setGoalsState: any
}) => {
	const user = useUser()
	const userId = user.userId
	async function postGoal(goalVal: number, goalEnd: Date) {
		const res = await postData(`members/${userId}/goals`, {
			weight_goal: goalVal,
			goal_end: goalEnd,
		})
		return res.data
	}

	const [goal, setGoal] = useState<string>("")
	const [goalEnd, setGoalEnd] = useState<Date | null>(null)

	const onAdd = async () => {
		if (!goal || !goalEnd) {
			return
		}
		const newGoal = await postGoal(parseInt(goal), goalEnd)
		setGoalsState([...goals, newGoal])
	}

	return (
		<div className="flex items-center justify-between space-x-4">
			<Input
				min={0}
				type="number"
				placeholder="Goal in lbs"
				value={goal}
				onChange={(e) => setGoal(e.target.value)}
			/>
			<DatePicker date={goalEnd} setDate={setGoalEnd} />
			<Button className="btn" onClick={onAdd}>
				Add
			</Button>
		</div>
	)
}

export default GoalForm
