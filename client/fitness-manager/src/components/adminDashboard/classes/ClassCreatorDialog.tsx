import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"


import ClassCreatorForm from "./ClassCreatorForm"


const ClassCreatorDialog = ({
  classes,
  setClasses,
} : {
  classes: any,
  setClasses: any
}) => {

  const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="btn">Create a class</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a Class</DialogTitle>
					<DialogDescription>
						Select a date and time to create a class
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<ClassCreatorForm  setOpen={setOpen} classes={classes} setClasses={setClasses} />
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ClassCreatorDialog
