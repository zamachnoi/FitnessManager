import DashboardCard from "../../util/DashboardCard"
import TrainerBookingsCard from "./TrainerBookingsCard"
import ClassBookingsCard from "./ClassBookingsCard"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"
import BookingDialog from "./BookingDialog"

type ClassBookings = {
	class_id: number
	name: string
	price: number
	first_name: string
	last_name: string
	room_number: number
	booking_timestamp: Date
	member_booking_id: number
}

export default function AllBookingsCard() {
	const memberId = 1

	const [bookings, setBookings] = useState({
		trainer_bookings: [],
		class_bookings: [],
	})

	const [trainerBookings, setTrainerBookings] = useState([])
	const [classBookings, setClassBookings] = useState<ClassBookings[]>([])

	useEffect(() => {
		getData(`members/${memberId}/booking`).then((response) => {
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
