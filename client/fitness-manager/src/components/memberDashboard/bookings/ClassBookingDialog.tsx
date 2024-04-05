import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ClassBookingForm from "./ClassBookingForm"

type ClassBookingDialogProps = {
	parentClasses: any
	setParentClasses: any
}

const ClassBookingDialog = (props: ClassBookingDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn">Book</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Book a Class</DialogTitle>
					<DialogDescription>
						Select a class to book
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<ClassBookingForm
						parentClasses={props.parentClasses}
						setParentClasses={props.setParentClasses}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ClassBookingDialog
