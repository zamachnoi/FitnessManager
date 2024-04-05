import { Separator } from "@/components/ui/separator"
import { ExerciseType } from "./Routines"

type ExerciseProps = {
	exercise: ExerciseType
	index: number
}

export default function ExerciseInfo({ exercise, index }: ExerciseProps) {
	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-row items-center w-full gap-4 ">
				<p>{index + 1}.</p>
				<div className="grid items-center w-full grid-cols-4 grid-rows-1 gap-1">
					<p>{exercise.exercise_name}</p>

					<p>{exercise.exercise_description}</p>

					<p>{exercise.equipment_name}</p>

					<p>{exercise.exercise_type}</p>
				</div>
			</div>
			<Separator />
		</div>
	)
}
