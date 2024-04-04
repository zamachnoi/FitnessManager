import moment from "moment"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { deleteData } from "@/utils/deleteData"

type TrainerBookingProps = {
	trainer_id: number
	first_name: string
	last_name: string
	rate: number
	booking_timestamp: Date
	bookings: any
	member_booking_id: number
	trainer_booking_id: number
	setBookings: any
}



function TrainerBooking(props: TrainerBookingProps) {

	const deleteBooking = async (member_booking_id: number, trainer_booking_id: number): Promise<any> => {
		console.log(member_booking_id, trainer_booking_id)
		const res = await deleteData(`members/1/booking`, {member_booking_id, trainer_booking_id});
		return res;
	}

	const onCancel = (member_booking_id: number, trainer_booking_id: number) => {
		deleteBooking(member_booking_id, trainer_booking_id).then((res) => {
			console.log(res)
			if (res && res.status === 200) {
				props.setBookings(props.bookings.filter((b: any) => b.member_booking_id !== member_booking_id));
			}
		});
	}

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
					<Button variant="link" onClick={() => {
						onCancel(props.member_booking_id, props.trainer_booking_id);
					}}>Cancel</Button>
				</div>
			</div>
			<div>
				<Separator />
			</div>
		</div>
	)
}

export default TrainerBooking
