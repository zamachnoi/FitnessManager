import { Input } from "@/components/ui/input"
import { ExerciseType } from "./Routines"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectItem,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { postData } from "@/utils/postData"

type CreateExercisesProps = {
	allExercises: ExerciseType[]
	setAllExercises: any
	selectableExercises: ExerciseType[]
	setSelectableExercises: any
}

type EquipmentType = {
	equipment_type_id: number
	name: string
}

type ExerciseRequest = {
	name: string
	description: string
	equipment_type_id: string | number
	type: string
}

export default function CreateExercises(props: CreateExercisesProps) {
	const [newExercise, setNewExercise] = useState<ExerciseRequest>({
		name: "",
		description: "",
		equipment_type_id: 0,
		type: "",
	})

	const [errorText, setErrorText] = useState("")

	const [equipmentTypes, setEquipmentTypes] = useState([])

	const getEquipmentTypes = async () => {
		getData("equipmentTypes").then((response) => {
			console.log(response.data)
			setEquipmentTypes(response.data)
		})
		console.log(equipmentTypes)
	}

	useEffect(() => {
		getEquipmentTypes()
	}, [])

	const onExerciseChange = (e: any) => {
		setNewExercise({
			...newExercise,
			[e.target.name]: e.target.value,
		})
	}

	const onEquipmentChange = (value: string) => {
		setNewExercise((prevExercise: any) => ({
			...prevExercise,
			equipment_type_id: Number(value),
		}))
	}

	const createExercise = async () => {
		// if any value is null, return
		for (let key in newExercise) {
			if (!newExercise[key as keyof typeof newExercise]) {
				setErrorText("Please fill out all fields")
				return
			}
			setErrorText("")
		}
		postData("exercises", newExercise).then((response) => {
			if (response.status === 200) {
				props.setAllExercises([...props.allExercises, response.data])
				props.setSelectableExercises([
					...props.selectableExercises,
					response.data,
				])
				// clear the inputs
				setNewExercise({
					name: "",
					description: "",
					equipment_type_id: 0,
					type: "",
				})

				// clear the form
				document
					.querySelectorAll("input")
					.forEach((input) => (input.value = ""))
			} else {
				setErrorText("Error creating exercise")
			}
		})
	}

	useEffect(() => {
		console.log(newExercise)
	}, [newExercise])

	useEffect(() => {
		setErrorText("")
	}, [newExercise])

	return (
		<div className="flex flex-col w-full gap-4">
			<div className="flex flex-row items-center justify-between w-full">
				<p className="font-bold">Exercise Name</p>
				<Input
					className="w-8/12"
					name={"name"}
					placeholder="Heavy Treadmill"
					onChange={onExerciseChange}
				/>
			</div>
			<div className="flex flex-row items-center justify-between w-full">
				<p className="font-bold">Exercise Description</p>
				<Input
					className="w-8/12"
					name={"description"}
					placeholder="Treadmill for 30 minutes at 5mph"
					onChange={onExerciseChange}
				/>
			</div>
			<div className="flex flex-row items-center justify-between w-full">
				<p className="font-bold">Exercise Type</p>
				<Input
					className="w-8/12"
					name={"type"}
					placeholder="Running"
					onChange={onExerciseChange}
				/>
			</div>
			<div className="flex flex-row items-center justify-between w-full">
				<p className="font-bold">Equipment Type</p>
				<Select
					value={newExercise.equipment_type_id.toString()}
					onValueChange={onEquipmentChange}
				>
					<SelectTrigger className="w-8/12">
						<SelectValue placeholder="" />
					</SelectTrigger>
					<SelectContent>
						{equipmentTypes.map((equipment: EquipmentType) => (
							<SelectItem
								value={equipment.equipment_type_id.toString()}
								key={equipment.equipment_type_id}
							>
								{equipment.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<p className="text-red-500">{errorText}</p>
			<Button onClick={createExercise} className="m-2">
				Create Exercise
			</Button>
		</div>
	)
}
