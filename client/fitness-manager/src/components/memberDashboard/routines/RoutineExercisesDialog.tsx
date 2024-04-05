import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import ExerciseInfo from "./ExerciseInfo"
import { RoutineType } from "./Routines"
import { Button } from "@/components/ui/button"

type RoutineExercisesDialogProps = {
	routine: RoutineType
}

export default function RoutineExercisesDialog({
	routine,
}: RoutineExercisesDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="m-2">View Exercises</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>{routine.routine_name}</DialogTitle>
					<DialogDescription>
						{routine.routine_name} exercises
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-2">
					<div className="flex flex-row items-center gap-4">
						<div className="grid items-center w-full grid-cols-4 grid-rows-1 gap-1 pl-6">
							<p className="font-bold">Name</p>
							<p className="font-bold">Description</p>
							<p className="font-bold">Equipment</p>
							<p className="font-bold">Type</p>
						</div>
					</div>
					{routine.exercises.map((exercise, index) => (
						<ExerciseInfo
							index={index}
							exercise={exercise}
							key={exercise.exercise_id}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
