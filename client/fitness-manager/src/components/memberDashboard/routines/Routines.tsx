import { Separator } from "@/components/ui/separator"
import RoutineExercisesDialog from "./RoutineExercisesDialog"
import { Button } from "@/components/ui/button"
import { patchData } from "@/utils/patchData"

export type ExerciseType = {
	exercise_id: number
	exercise_name: string
	exercise_description: string
	equipment_type_id: number
	equipment_name: string
	exercise_type: string
}

export type RoutineType = {
	routine_id: number
	routine_name: string
	exercises: ExerciseType[]
}

type RoutineProps = {
	routine: RoutineType
	parentRoutines: RoutineType[]
	setParentRoutines: any
	addButton?: boolean
	removeButton?: boolean
}

export function RoutineInfo(props: RoutineProps) {
	const memberId = 1
	const onAddRoutine = () => {
		patchData(
			`members/${memberId}/routines/${props.routine.routine_id}/assign`,
			{}
		).then((response) => {
			console.log(`add routine response`)
			if (response.status === 200) {
				props.setParentRoutines([
					...(props.parentRoutines ?? []),
					props.routine,
				])
			}
		})
	}

	const onRemoveRoutine = () => {
		patchData(
			`members/${memberId}/routines/${props.routine.routine_id}/unassign`,
			{}
		).then((response) => {
			console.log(`remove routine response`)
			if (response.status === 200) {
				props.setParentRoutines(
					props.parentRoutines.filter(
						(routine: RoutineType) =>
							routine.routine_id !== props.routine.routine_id
					)
				)
			}
		})
	}
	return (
		<div>
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-row items-center gap-2">
					<h1 className="font-bold">Routine</h1>
					<p>{props.routine.routine_name}</p>
				</div>
				<div>
					<RoutineExercisesDialog routine={props.routine} />
				</div>
				{props.addButton && props.parentRoutines !== undefined && (
					<div>
						<Button onClick={onAddRoutine}>Add</Button>
					</div>
				)}
				{props.removeButton && props.parentRoutines !== undefined && (
					<div>
						<Button onClick={onRemoveRoutine}>Remove</Button>
					</div>
				)}
			</div>
			<Separator />
		</div>
	)
}
