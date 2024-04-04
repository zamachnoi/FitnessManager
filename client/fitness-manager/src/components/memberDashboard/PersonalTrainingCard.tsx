import DashboardCard from "../util/DashboardCard"

import TrainerBooking from "./bookings/TrainerBooking"
import BookingDialog from "./bookings/BookingDialog"

import { useState } from "react"

type Booking = {
	member_booking_id: number
	trainer_booking_id: number
	member_id: number
	trainer_id: number
	booking_timestamp: Date
}

const PersonalTrainingCard = ({
	bookings,
	times,
}: {
	bookings: Booking[]
	times: number[]
}) => {
	const [date, setDate] = useState<Date | null>(null)

	return (
		<DashboardCard
			title="Trainer Bookings"
			description="View / book personal trainer sessions"
			footer={
				<BookingDialog date={date} setDate={setDate} times={times} />
			}
		>
			<h1>REMOVED SORRY</h1>
			{/* <div>
				{bookings.map((booking) => (
					<TrainerBooking
						member_id={booking.member_id}
						trainer_id={booking.trainer_id}
						booking_timestamp={booking.booking_timestamp}
						key={booking.member_booking_id}
					/>
				))}
			</div> */}
		</DashboardCard>
	)
}

export default PersonalTrainingCard
