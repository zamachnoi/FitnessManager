import { getData } from "@/utils/getData"
import { postData } from "@/utils/postData"
import moment from "moment"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/userContext"

type ClassType = {
	class_id: number
	name: string
	first_name: string
	last_name: string
	class_time: Date
	price: number
}

async function getBookableClasses() {
	const res = await getData("classes/1/bookable")
	return res.data
}

type ClassBookingFormProps = {
	parentClasses: any
	setParentClasses: any
}

const ClassBookingForm = (props: ClassBookingFormProps) => {
	const user = useUser()
	const userId = user.userId
	const [classes, setClasses] = useState<ClassType[]>([])

	useEffect(() => {
		getBookableClasses().then((data) => {
			setClasses(data)
		})
	}, [])

	const bookClass = async (classId: number) => {
		const res = await postData(
			`members/${userId}/booking/classes/${classId}`,
			{}
		).then((res) => {
			if (res.status === 200) {
				const newClass = res.data
				console.log(newClass)
				props.setParentClasses([...props.parentClasses, newClass])
			}
			return res.data
		})
	}

	const onBook = (classId: number) => {
		bookClass(classId).then(() => {
			getBookableClasses().then((data) => {
				setClasses(data)
			})
		})
	}

	return (
		<div>
			{classes &&
				classes.map((classData) => (
					<div>
						<div className="flex flex-row justify-between px-2 py-1 border rounded-md">
							<div>
								<div className="flex flex-row space-x-1">
									<div className="font-bold">
										{classData.name} with{" "}
										{classData.first_name}{" "}
										{classData.last_name}
									</div>
									<div>- ${classData.price}</div>
								</div>
								<div className="text-xs">
									{moment(classData.class_time).format(
										"YYYY-MM-DD HH:mm"
									)}
								</div>
							</div>
							<div>
								<Button
									variant="link"
									onClick={() => onBook(classData.class_id)}
								>
									Book
								</Button>
							</div>
						</div>
					</div>
				))}
			{!classes.length && <div>No classes available</div>}
		</div>
	)
}

export default ClassBookingForm
