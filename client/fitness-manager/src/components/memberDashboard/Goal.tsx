import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, X } from "lucide-react"
import { useState } from "react"
import { useUser } from "@/context/userContext"

import { patchData } from "@/utils/patchData"

import moment from "moment"
import { start } from "repl"

const GoalForm = ({
	goalId,
	goalVal,
	goalStart,
	achievedDate,
	deleted,
	goalEnd,
}: {
	goalId: number
	goalVal: number
	goalStart: Date
	achievedDate: Date | null
	deleted: boolean
	goalEnd: Date
}) => {
	const user = useUser()
	const userId = user.userId

	async function achieveGoal(goalId: string) {
		const res = await patchData(
			`members/${userId}/goals/${goalId}/achieve`,
			{}
		)
		return res.data
	}

	async function deleteGoal(goalId: string) {
		const res = await patchData(
			`members/${userId}/goals/${goalId}/delete`,
			{}
		)
		return res.data
	}
	const [isDeleted, setIsDeleted] = useState(deleted)
	const [isCompleted, setIsCompleted] = useState(achievedDate !== null)
	const [achievedDateState, setAchievedDateState] = useState(achievedDate)
	console.log(goalVal)

	console.log()

	const onComplete = async () => {
		await achieveGoal(goalId.toString())
		setIsCompleted(true)
		setAchievedDateState(new Date())
	}

	const startFormatted = moment(goalStart).format("MM/DD/YYYY")
	const endFormatted = moment(goalEnd).format("MM/DD/YYYY")

	const completedGoal = achievedDateState !== null
	const cancelledGoal = isDeleted

	return (
		<div className="padding-4">
			<div className="grid items-center grid-cols-4 grid-rows 1">
				<h2 className="">{String(goalVal)}lbs</h2>
				<div>
					<h3 className="self-center h-full text-xs text-gray-500">
						{String(startFormatted)}
					</h3>
				</div>
				<div>
					<h3 className="self-center h-full text-xs text-gray-500">
						{String(endFormatted)}
					</h3>
				</div>

				{!isCompleted && !isDeleted && (
					<div className="flex flex-row gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={onComplete}
						>
							<Check />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								setIsDeleted(true)
								deleteGoal(goalId.toString())
							}}
						>
							<X />
						</Button>
					</div>
				)}

				{isCompleted && !isDeleted && (
					<div className="flex flex-row gap-2">
						<h3 className="self-center h-full text-sm text-green-500">
							{moment(achievedDateState).format("MM/DD/YYYY")}
						</h3>
					</div>
				)}

				{!isCompleted && isDeleted && (
					<div className="flex flex-row gap-2">
						<h3 className="text-sm text-red-500 ">Cancelled</h3>
					</div>
				)}

				{/* {!isCompleted && !isDeleted && (
					<div className="flex items-center space-x-2">
						{moment(goalStart).format("MM/DD/YYYY")}
						<Button
							variant="outline"
							size="icon"
							onClick={onComplete}
						>
							<Check />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								setIsDeleted(true)
								deleteGoal(goalId.toString())
							}}
						>
							<X />
						</Button>
					</div>
				)}
				{isCompleted && !isDeleted && (
					<div>
						{moment(goalStart).format("MM/DD/YYYY")} -{" "}
						{moment(achievedDateState).format("MM/DD/YYYY")}
					</div>
				)}
				{!isCompleted && isDeleted && (
					<div>
						{moment(goalStart).format("MM/DD/YYYY")} - unfinished.
					</div>
				)} */}
			</div>
			<Separator className="mt-2" />
		</div>
	)
}

export default GoalForm
