import DashboardCard from "@/components/util/DashboardCard"
import TrainerBooking from "./TrainerBooking"
import BookingDialog from "./TrainerBookingDialog"

type TrainerBookingsProps = {
	trainerBookings: {
		trainer_id: number
		first_name: string
		last_name: string
		rate: number
		booking_timestamp: Date
		member_booking_id: number
		trainer_booking_id: number
	}[]
	setTrainerBookings: any
}

export default function TrainerBookingsCard(props: TrainerBookingsProps) {
	return (
		<div className="w-full">
			<DashboardCard
				title="Trainer Bookings"
				description="View all your trainer bookings here."
				footer={
					<BookingDialog
						trainerBookings={props.trainerBookings}
						setTrainerBookings={props.setTrainerBookings}
					/>
				}
			>
				<div>
					{props.trainerBookings.map((booking, index) => (
						<TrainerBooking
							{...booking}
							key={index}
							trainerBookings={props.trainerBookings}
							setTrainerBookings={props.setTrainerBookings}
						/>
					))}
				</div>
			</DashboardCard>
		</div>
	)
}
