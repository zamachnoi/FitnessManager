import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import moment from "moment"

import { deleteData } from "@/utils/deleteData"


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
}

export default function ClassBooking(props: ClassBookingProps) {

	const deleteClass = async (class_id: number): Promise<any> => {
		const res = await deleteData(`classes/${class_id}`, {});
		return res;
	};

	const onCancel = (class_id: number) => {
		deleteClass(class_id).then((res) => {
			console.log(res)
			if (res && res.status === 200) {
				props.setClasses(props.classes.filter((c: any) => c.class_id !== class_id));
			}
		});
	};

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
						{moment(props.booking_timestamp).format(
							"MMMM Do YYYY, h:mm:ss a"
						)}
					</p>
					<div className="flex flex-row">
						<Button variant="link" onClick={() => {
							onCancel(props.class_id);
						}}>Cancel</Button>
					</div>
				</div>
				<Separator />
			</div>
		</div>
	)
}
