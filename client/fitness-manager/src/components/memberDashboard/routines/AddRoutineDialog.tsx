import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { RoutineInfo, RoutineType } from "./Routines"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"

type AddRoutineProps = {
	parentRoutines: RoutineType[]
	setParentRoutines: any
}

export default function AddRoutineDialog({
	parentRoutines,
	setParentRoutines,
}: AddRoutineProps) {
	const getAllRoutines = async () => {
		const routines = await getData("routines")
		return routines.data
	}
	const [dialogRoutines, setDialogRoutines] = useState<RoutineType[]>([])

	useEffect(() => {
		async function fetchRoutines() {
			const allRoutines = await getAllRoutines()
			const newRoutines = allRoutines.filter(
				(routine: RoutineType) =>
					!parentRoutines.some(
						(parentRoutine) =>
							parentRoutine.routine_id === routine.routine_id
					)
			)
			setDialogRoutines(newRoutines)
		}

		fetchRoutines()
	}, [parentRoutines])

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="m-2">Add Routine</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Routine</DialogTitle>
					<DialogDescription>Add a new routine</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-2">
					{dialogRoutines.map((routine) => (
						<RoutineInfo
							routine={routine}
							key={routine.routine_id}
							parentRoutines={parentRoutines}
							setParentRoutines={setParentRoutines}
							addButton={true}
						/>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
