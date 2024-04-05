import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import TrainerRescheduleForm from "./TrainerRescheduleForm"

type Booking = {
	trainer_id: number
	first_name: string
	last_name: string
	rate: number
	booking_timestamp: Date
	member_booking_id: number
	trainer_booking_id: number
}
type TrainerResecheduleDialogProps = {
	setBookings: any
	bookings: Booking[]
	booking: Booking
}

export default function TrainerRescheduleDialog(
	props: TrainerResecheduleDialogProps
) {
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<Button variant="link">Reschedule</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Reschedule Booking with {props.booking.first_name}{" "}
							{props.booking.last_name}
						</DialogTitle>
						<DialogDescription>
							Select a new date and time for your booking with{" "}
							{props.booking.first_name} {props.booking.last_name}
						</DialogDescription>
						<div>
							<TrainerRescheduleForm
								setBookings={props.setBookings}
								bookings={props.bookings}
								booking={props.booking}
							/>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}
