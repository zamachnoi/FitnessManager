import AddRoutineDialog from "./AddRoutineDialog"
import CreateRoutineDialog from "./CreateRoutineDialog"
import { RoutineType } from "./Routines"

type RoutinesFooterProps = {
	setParentRoutines: any
	parentRoutines: RoutineType[]
}
export default function RoutinesFooter(props: RoutinesFooterProps) {
	return (
		<div className="flex flex-row items-center justify-between w-full">
			<AddRoutineDialog
				setParentRoutines={props.setParentRoutines}
				parentRoutines={props.parentRoutines}
			/>
			<CreateRoutineDialog
				parentRoutines={props.parentRoutines}
				setParentRoutines={props.setParentRoutines}
			/>
		</div>
	)
}
