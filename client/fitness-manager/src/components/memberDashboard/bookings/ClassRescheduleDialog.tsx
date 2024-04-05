import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import ClassRescheduleForm from "./ClassRescheduleForm"

type ClassRescheduleDialogProps = {
	date: any
	setDate: any
  classId: number
}

const ClassRescheduleDialog = (props: ClassRescheduleDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn" variant="link">Reschedule</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Reschedule Class</DialogTitle>
					<DialogDescription>
						Reschedule a class
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<ClassRescheduleForm
						date={props.date}
            setDate={props.setDate}
            classId={props.classId}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ClassRescheduleDialog
