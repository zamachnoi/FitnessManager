import moment from "moment"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type TrainerBookingProps = {
	trainer_id: number
	first_name: string
	last_name: string
	rate: number
	booking_timestamp: Date
}

function TrainerBooking(props: TrainerBookingProps) {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-between gap-2 align-center">
				<h3 className="flex flex-row items-center justify-center font-bold">
					{props.first_name} {props.last_name}
				</h3>

				<p className="flex flex-row items-center justify-center text-xs text-center">
					{moment(props.booking_timestamp).format(
						"MMMM Do YYYY, h:mm:ss a"
					)}
				</p>
				<div className="flex flex-row">
					<Button variant="link">Reschedule</Button>
					<Button variant="link">Cancel</Button>
				</div>
			</div>
			<div>
				<Separator />
			</div>
		</div>
	)
}

export default TrainerBooking
