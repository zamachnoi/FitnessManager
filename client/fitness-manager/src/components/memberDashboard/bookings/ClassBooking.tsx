import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import moment from "moment"

import { patchData } from "@/utils/patchData"
import { deleteData } from "@/utils/deleteData"

import ClassRescheduleDialog from "./ClassRescheduleDialog"

import { useState, useEffect } from "react"
import MoveClassDialog from "@/components/adminDashboard/classes/MoveClassDialog"

type ClassBookingProps = {
	class_id: number
	name: string
	price: number
	first_name: string
	last_name: string
	room_number: number
	booking_timestamp: Date
	classes: any
	setClasses: any
	member_booking_id: number
	deleteType: "class" | "booking"
	class_time: Date
	trainer_id: number
	room_id: number
	room_booking_id: number
}

export default function ClassBooking(props: ClassBookingProps) {
	const [date, setDate] = useState<Date>(
		props.class_time || props.booking_timestamp
	)

	const { deleteType, classes, setClasses, ...rest } = props
	const memberId = 1
	const deleteClass = async (): Promise<any> => {
		if (props.deleteType === "booking") {
			const res = await patchData(
				`members/${memberId}/booking/${props.member_booking_id}/classes`,
				{}
			)
			return res
		} else {
			const res = await deleteData(`classes/${props.class_id}`, {})
			return res
		}
	}

	const onCancel = () => {
		deleteClass().then((res) => {
			console.log(res)
			if (res && res.status === 200) {
				props.setClasses(
					props.classes.filter(
						(b: any) =>
							b.member_booking_id !== props.member_booking_id
					)
				)
			}
		})
	}

	const previous = moment(props.booking_timestamp).isBefore(moment())

	return (
		<div>
			<div>
				<div className="flex flex-row items-center justify-between gap-2 align-center">
					<h3 className="flex flex-row items-center justify-center font-bold">
						{props.name} - Room {props.room_number}
					</h3>

					<p className="flex flex-row items-center justify-center text-xs text-center">
						{props.first_name} {props.last_name}
					</p>

					<p className="flex flex-row items-center justify-center text-xs text-center">
						{moment(date).format("MMMM Do YYYY h:mm:ss a")}
					</p>
					{!previous ? (
						<div className="flex flex-row">
							{props.deleteType == "class" && (
								<div className="flex flex-row">
									<ClassRescheduleDialog
										date={date}
										setDate={setDate}
										classId={props.class_id}
									/>
									<MoveClassDialog
										setClasses={setClasses}
										class={rest}
									/>
								</div>
							)}
							<Button
								variant="link"
								onClick={() => {
									onCancel()
								}}
							>
								Cancel
							</Button>
						</div>
					) : null}
				</div>
				<Separator />
			</div>
		</div>
	)
}
