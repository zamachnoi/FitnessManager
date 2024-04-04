import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


import BookingForm from "./BookingForm"


const BookingDialog = () => {

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="btn">Book</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Book a Personal Trainer</DialogTitle>
					<DialogDescription>
						Select a date and time to book a personal trainer
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<BookingForm  />
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default BookingDialog
