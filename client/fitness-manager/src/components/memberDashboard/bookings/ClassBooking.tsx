import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import moment from "moment"

type ClassBookingProps = {
	class_id: number
	class_name: string
	price: number
	first_name: string
	last_name: string
	room_number: number
	booking_timestamp: Date
}

export default function ClassBooking(props: ClassBookingProps) {
	return (
		<div>
			<div>
				<div className="flex flex-row items-center justify-between gap-2 align-center">
					<h3 className="flex flex-row items-center justify-center font-bold">
						{props.class_name} - Room {props.room_number}
					</h3>

					<p className="flex flex-row items-center justify-center text-xs text-center">
						{props.first_name} {props.last_name}
					</p>

					<p className="flex flex-row items-center justify-center text-xs text-center">
						{moment(props.booking_timestamp).format(
							"MMMM Do YYYY, h:mm:ss a"
						)}
					</p>
					<div className="flex flex-row">
						<Button variant="link">Cancel</Button>
					</div>
				</div>
				<Separator />
			</div>
		</div>
	)
}
