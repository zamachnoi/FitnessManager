import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import moment from "moment"

import { patchData } from "@/utils/patchData"
import { deleteData } from "@/utils/deleteData"

import ClassRescheduleDialog from "./ClassRescheduleDialog"

import { useState, useEffect } from "react"

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
	class_time?: Date
	readOnly?: boolean
}

export default function ClassBooking(props: ClassBookingProps) {

	const [date, setDate] = useState<Date>(props.class_time || props.booking_timestamp)

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
						{moment(date).format(
									"MMMM Do YYYY h:mm:ss a"
							  )}
					</p>
					{!props?.readOnly && (<div className="flex flex-row">
						{props.deleteType == "class" && <ClassRescheduleDialog date={date} setDate={setDate} classId={props.class_id} />}
						<Button
							variant="link"
							onClick={() => {
								onCancel()
							}}
						>
							Cancel
						</Button>
					</div>)}
				</div>
				<Separator />
			</div>
		</div>
	)
}
