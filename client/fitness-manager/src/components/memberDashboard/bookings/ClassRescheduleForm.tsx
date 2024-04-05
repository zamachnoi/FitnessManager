import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { DatePicker } from "../../util/DatePicker"
import { patchData } from "@/utils/patchData"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const RescheduleSchema = z.object({
	date: z.date(),
	time: z.number(),
})

type ClassRescheduleType = {
	date: Date
	time: number
}

type ClassRescheduleProps = {
	date: Date
	setDate: any
	classId: number
}

const ClassRescheduleForm = (props: ClassRescheduleProps) => {
	const form = useForm({
		resolver: zodResolver(RescheduleSchema),
	})

	const rescheduleClass = async (data: ClassRescheduleType) => {
		const dt = new Date(data.date)
		dt.setHours(data.time, 0, 0, 0)

		const unix = dt.getTime()

		const res = await patchData(
			`classes/reschedule/${props.classId}/${unix}`,
			{}
		)
		return res
	}

	const onSubmit = form.handleSubmit((data: any) => {
		rescheduleClass(data).then((res: any) => {
			if (res && res.status === 200) {
				const dt = new Date(data.date)
				dt.setHours(data.time, 0, 0, 0)
				props.setDate(dt)
				toast.success("Class rescheduled")
			} else {
				console.log(res)
				toast.error("Failed to reschedule class")
			}
		})
	})

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex flex-col space-y-2">
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col space-y-3">
							<FormLabel>Date</FormLabel>
							<FormControl>
								<DatePicker
									date={field.value}
									setDate={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="time"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time</FormLabel>
							<FormControl>
								<Select
									onValueChange={(val) =>
										field.onChange(parseInt(val, 10))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a time" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="time" disabled>
											Select a time
										</SelectItem>
										{[...Array(24)].map((_, index) => (
											<SelectItem
												key={index}
												value={String(index)}
											>
												{index}:00
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Reschedule</Button>
			</form>
		</Form>
	)
}

export default ClassRescheduleForm
