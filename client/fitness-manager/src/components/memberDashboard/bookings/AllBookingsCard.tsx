import DashboardCard from "../../util/DashboardCard"
import TrainerBookingsCard from "./TrainerBookingsCard"
import ClassBookingsCard from "./ClassBookingsCard"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"

export default function AllBookingsCard() {
	const memberId = 1

	const [bookings, setBookings] = useState({
		trainer_bookings: [],
		class_bookings: [],
	})

	useEffect(() => {
		getData(`members/${memberId}/booking`).then((response) => {
			setBookings(response.data)
		})
	}, [])

	return (
		<div className="w-fit">
			<DashboardCard
				title="Bookings"
				description="View all your bookings here."
				footer={<div>Footer</div>}
			>
				<div className="flex flex-col justify-around gap-4">
					<TrainerBookingsCard
						trainerBookings={bookings.trainer_bookings}
					/>
					<ClassBookingsCard
						classBookings={bookings.class_bookings}
					/>
				</div>
			</DashboardCard>
		</div>
	)
}
