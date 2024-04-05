import { Dispatch, SetStateAction } from "react"
import DashboardCard from "@/components/util/DashboardCard"
import ClassBooking from "./ClassBooking"
import ClassBookingDialog from "./ClassBookingDialog"
import { patchData } from "@/utils/patchData"

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

type ClassBookingsProps = {
	classBookings: ClassBookings[]
	setClassBookings: Dispatch<SetStateAction<ClassBookings[]>>
}

export default function ClassBookingsCard(props: ClassBookingsProps) {
	return (
		<div className="w-fit">
			<DashboardCard
				title="Class"
				description="View all your class bookings here."
				footer={
					<ClassBookingDialog
						parentClasses={props.classBookings}
						setParentClasses={props.setClassBookings}
					/>
				}
			>
				{props.classBookings.map((booking, index) => (
					<ClassBooking
						classes={props.classBookings}
						setClasses={props.setClassBookings}
						{...booking}
						key={index}
						deleteType="booking"
					/>
				))}
			</DashboardCard>
		</div>
	)
}
