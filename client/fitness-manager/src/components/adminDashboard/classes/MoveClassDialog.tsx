import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getAvailableRooms } from "./ClassCreatorForm"
import { getData } from "@/utils/getData"
import { patchData } from "@/utils/patchData"

type Class = {
	trainer_id: number
	class_id: number
	name: string
	price: number
	class_time: Date
	first_name: string
	last_name: string
	room_number: number
	room_id: number
	room_booking_id: number
}

type AvailableRoom = {
	room_id: number
	room_number: number
	name: string
}

type MoveClassDialogProps = {
	class: Class
	setClasses: any
}

export default function MoveClassDialog(props: MoveClassDialogProps) {
	const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([])
	const [newRoom, setNewRoom] = useState<string>("")

	const getAvailRooms = async () => {
		console.log("CLASS TIME")
		console.log(props.class.class_time)
		const classTimeDate = new Date(props.class.class_time)
		const res = getData(`rooms/available/${classTimeDate.getTime()}`).then(
			(res) => {
				return res
			}
		)
		return res
	}

	useEffect(() => {
		getAvailRooms().then((res) => {
			setAvailableRooms(res.data)
		})
	}, [])

	const moveClass = () => {
		const data = {
			room_booking_id: props.class.room_booking_id,
			new_room_id: parseInt(newRoom),
		}
		patchData(`classes/${props.class.class_id}/move`, data).then((res) => {
			if (res && res.status === 200) {
				props.setClasses((prev: any) =>
					prev.map((c: any) =>
						c.class_id === props.class.class_id ? res.data : c
					)
				)
				getAvailRooms().then((res) => {
					setAvailableRooms(res.data)
				})
			}
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link">Move</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Move a Class</DialogTitle>
					<DialogDescription>
						Select a class to move
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<Select onValueChange={(value) => setNewRoom(value)}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Room Number / Name" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="room" disabled>
								Select a room
							</SelectItem>
							{availableRooms.map((room, index) => (
								<SelectItem
									key={index}
									value={String(room.room_id)}
								>
									<p>
										{room.room_number} / {room.name}
									</p>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Button onClick={moveClass}>Move Class</Button>
			</DialogContent>
		</Dialog>
	)
}
