import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { ExerciseType, RoutineInfo, RoutineType } from "./Routines"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import ExerciseBadge from "./ExerciseBadge"
import { Separator } from "@/components/ui/separator"
import CreateExercises from "./CreateExercises"
import { postData } from "@/utils/postData"
import { patchData } from "@/utils/patchData"
import { useUser } from "@/context/userContext"

type CreateRoutineDialogProps = {
	parentRoutines: RoutineType[]
	setParentRoutines: any
}

export default function CreateRoutineDialog(props: CreateRoutineDialogProps) {
	const user = useUser()
	const userId = user.userId
	const [allExercises, setAllExercises] = useState<ExerciseType[]>([])
	const [selectableExercises, setSelectableExercises] = useState<
		ExerciseType[]
	>([])

	const [routineName, setRoutineName] = useState("")
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoutineName(e.target.value)
	}

	const [selectedExercises, setSelectedExercises] = useState<ExerciseType[]>(
		[]
	)

	const [dialogButtonClicked, setDialogButtonClicked] = useState(false)

	async function fetchExercises() {
		const res = await getData("exercises").then((response) => {
			console.log(response.data)
			setAllExercises(response.data)
			if (response.data) {
				setSelectableExercises(
					response.data.filter(
						(exercise: ExerciseType) =>
							!selectedExercises.some(
								(selectedExercise) =>
									selectedExercise.exercise_id ===
									exercise.exercise_id
							)
					)
				)
			}
		})
	}

	useEffect(() => {
		fetchExercises()
	}, [dialogButtonClicked])

	const handleDialogButtonClick = () => {
		setDialogButtonClicked(!dialogButtonClicked)
		setSelectableExercises(allExercises)
		setSelectedExercises([])
	}

	const createRoutine = () => {
		// input should be an object with routine_name and array of exercise ids
		const exerciseIds = selectedExercises.map(
			(exercise: ExerciseType) => exercise.exercise_id
		)
		const data = {
			routine_name: routineName,
			exercises: exerciseIds,
		}
		postData("routines", data).then((response: any) => {
			console.log(response)
			if (response.status === 200) {
				setRoutineName("")
				setSelectedExercises([])
				setSelectableExercises(allExercises)
				assignRoutine(response.data.routine_id)
			}
		})
	}

	const assignRoutine = (routineId: number) => {
		patchData(`members/${userId}/routines/${routineId}/assign`, {}).then(
			(response) => {
				console.log(`add routine response`)
				if (response.status === 200) {
					props.setParentRoutines([
						...(props.parentRoutines ?? []),
						response.data,
					])
				}
			}
		)
	}

	return (
		<Dialog onOpenChange={handleDialogButtonClick}>
			<DialogTrigger asChild>
				<Button className="m-2">Create Routine</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Routine</DialogTitle>
					<DialogDescription>Create a new routine</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col items-center w-full">
					<div className="flex flex-row items-center justify-between w-full">
						<p className="font-bold">Routine Name</p>
						<Input
							name="routine_name"
							className="w-9/12 m-4"
							placeholder="Routine Name"
							value={routineName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="flex flex-row items-center justify-between w-full">
						<p className="font-bold">Selected</p>
						<ScrollArea className="w-9/12 h-16 m-4 border rounded-lg ">
							<div className="flex flex-wrap gap-2 mx-1 my-1">
								{selectedExercises.map((exercise) => (
									<ExerciseBadge
										exercise={exercise}
										selectedExercises={selectedExercises}
										setSelectedExercises={
											setSelectedExercises
										}
										selectableExercises={
											selectableExercises
										}
										setSelectableExercises={
											setSelectableExercises
										}
										key={exercise.exercise_id}
										selected={true}
									/>
								))}
							</div>
						</ScrollArea>
					</div>
					<div className="flex flex-row items-center justify-between w-full">
						<p className="font-bold">Selectable</p>
						<ScrollArea className="w-9/12 h-16 m-4 border rounded-lg">
							<div className="flex flex-wrap gap-2 mx-1 my-1">
								{selectableExercises.map((exercise) => (
									<ExerciseBadge
										exercise={exercise}
										selectedExercises={selectedExercises}
										setSelectedExercises={
											setSelectedExercises
										}
										selectableExercises={
											selectableExercises
										}
										setSelectableExercises={
											setSelectableExercises
										}
										key={exercise.exercise_id}
										selected={false}
									/>
								))}
							</div>
						</ScrollArea>
					</div>
					<div>
						<Button onClick={createRoutine} className="m-2">
							Create Routine
						</Button>
					</div>
				</div>
				<Separator />
				<DialogHeader>
					<DialogTitle>Create Exercise</DialogTitle>
					<DialogDescription>Create a new exercise</DialogDescription>
				</DialogHeader>
				<div>
					<CreateExercises
						allExercises={allExercises}
						setAllExercises={setAllExercises}
						selectableExercises={selectableExercises}
						setSelectableExercises={setSelectableExercises}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
