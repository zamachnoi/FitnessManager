import { useState } from "react"
import { ExerciseType } from "./Routines"
import { Badge } from "@/components/ui/badge"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import ExerciseInfo from "./ExerciseInfo"
type ExerciseBadgeProps = {
	exercise: ExerciseType
	selectedExercises: ExerciseType[]
	setSelectedExercises: any
	selectableExercises: ExerciseType[]
	setSelectableExercises: any
	selected: boolean
}

export default function ExerciseBadge(props: ExerciseBadgeProps) {
	const [selected, setSelected] = useState(false)

	const moveExercise = () => {
		if (props.selected) {
			props.setSelectedExercises(
				props.selectedExercises.filter(
					(exercise: ExerciseType) =>
						exercise.exercise_id !== props.exercise.exercise_id
				)
			)

			props.setSelectableExercises([
				...props.selectableExercises,
				props.exercise,
			])
		} else {
			props.setSelectedExercises([
				...props.selectedExercises,
				props.exercise,
			])

			props.setSelectableExercises(
				props.selectableExercises.filter(
					(exercise: ExerciseType) =>
						exercise.exercise_id !== props.exercise.exercise_id
				)
			)
		}
		setSelected(!selected)
	}

	return (
		<HoverCard>
			<HoverCardTrigger>
				<Badge className="hover:cursor-pointer" onClick={moveExercise}>
					{props.exercise.exercise_name}
				</Badge>
			</HoverCardTrigger>
			<HoverCardContent className="w-[700px]">
				<div className="flex flex-row items-center gap-4">
					<div className="grid items-center w-full grid-cols-4 grid-rows-1 gap-1 pl-6">
						<p className="font-bold">Name</p>
						<p className="font-bold">Description</p>
						<p className="font-bold">Equipment</p>
						<p className="font-bold">Type</p>
					</div>
				</div>
				<ExerciseInfo exercise={props.exercise} index={0} />
			</HoverCardContent>
		</HoverCard>
	)
}
