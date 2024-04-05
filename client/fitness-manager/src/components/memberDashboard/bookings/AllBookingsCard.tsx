import DashboardCard from "../../util/DashboardCard"
import TrainerBookingsCard from "./TrainerBookingsCard"
import ClassBookingsCard from "./ClassBookingsCard"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"
import { useUser } from "@/context/userContext"

type ClassBookings = {
	class_id: number
	name: string
	price: number
	first_name: string
	last_name: string
	room_number: number
	booking_timestamp: Date
	member_booking_id: number
	class_time: Date
	trainer_id: number
	room_id: number
	room_booking_id: number
}

export default function AllBookingsCard() {
	const user = useUser()
	const userId = user.userId

	const [trainerBookings, setTrainerBookings] = useState([])
	const [classBookings, setClassBookings] = useState<ClassBookings[]>([])

	useEffect(() => {
		getData(`members/${userId}/booking`).then((response) => {
			setTrainerBookings(response.data?.trainer_bookings || [])
			setClassBookings(response.data?.class_bookings || [])
		})
	}, [])

	return (
		<div className="w-fit">
			<DashboardCard
				title="Bookings"
				description="View all your bookings here."
				footer={null}
			>
				<div className="flex flex-col justify-around gap-4">
					<TrainerBookingsCard
						trainerBookings={trainerBookings}
						setTrainerBookings={setTrainerBookings}
					/>
					<ClassBookingsCard
						setClassBookings={setClassBookings}
						classBookings={classBookings}
					/>
				</div>
			</DashboardCard>
		</div>
	)
}
