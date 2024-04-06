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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { getData } from "@/utils/getData"
import { postData } from "@/utils/postData"

import { useState, useEffect } from "react"
import { useUser } from "@/context/userContext"

const BookingSchema = z.object({
	date: z.date(),
	time: z.number(),
	trainer_id: z.number(),
	member_id: z.number(),
})

type TrainerType = {
	trainerId: number
	rate: number
	trainer_id: number
	first_name: string
	last_name: string
}

type BookingFormProps = {
	setTrainerBookings: any
	trainerBookings: any
}

const BookingForm = (props: BookingFormProps) => {
	const user = useUser()
	const userId = user.userId

	// get serverside props
	async function getAvailableTrainers(date: Date, time: number) {
		// add time to date
		const dt = new Date(date)
		dt.setHours(time, 0, 0, 0)
		// convert to unix
		const unix = dt.getTime() / 1000
		console.log(unix)

		const res = await getData(`trainers/booking/${unix}000`)
		console.log(res)
		return res.data
	}

	async function getAvailableHours(date: Date) {
		const dt = new Date(date)
		dt.setHours(0, 0, 0, 0)
		const unix = dt.getTime() / 1000
		const res = await getData(`members/${userId}/booking/hours/${unix}000`)
		return res.data
	}

	async function book(date: Date, time: number, trainerId: number) {
		const dt = new Date(date)
		dt.setHours(time, 0, 0, 0)
		const unix = dt.getTime() / 1000
		const res = await postData(`members/${userId}/booking/trainers`, {
			trainer_id: trainerId,
			booking_timestamp: unix * 1000,
		})
		return res.data
	}

	const [trainers, setTrainers] = useState<TrainerType[]>([])

	const [times, setTimes] = useState([])

	const form = useForm<z.infer<typeof BookingSchema>>({
		resolver: zodResolver(BookingSchema),
		defaultValues: {
			date: undefined,
			time: undefined,
			trainer_id: undefined,
			member_id: 1,
		},
	})

	const watchedDate = form.watch("date")
	const watchedTime = form.watch("time")

	useEffect(() => {
		if (!watchedDate) return
		if (watchedDate < new Date()) {
			form.setError("date", { message: "Date cannot be in the past" })
			form.resetField("date")
			form.resetField("time")
			return
		}
		form.clearErrors("date")
		getAvailableHours(watchedDate).then((res) => {
			setTimes(res)
		})
		//form.resetField("time", { defaultValue: undefined })
	}, [watchedDate])

	useEffect(() => {
		if (!watchedTime || !watchedDate) return
		if (watchedDate === new Date() && watchedTime < new Date().getHours()) {
			form.setError("time", { message: "Time cannot be in the past" })
			form.resetField("time")
			return
		}
		getAvailableTrainers(watchedDate, watchedTime).then((res) => {
			setTrainers(res)
			//form.resetField("trainer_id", { defaultValue: undefined })
		})
	}, [watchedTime])

	function onSubmit(values: z.infer<typeof BookingSchema>) {
		book(values.date, values.time, values.trainer_id).then((res) => {
			console.log("submitting")
			console.log(res)
			console.log("HERE")
			getData(`trainers/${res.trainer_id}`).then((response) => {
				console.log(response.data)
				props.setTrainerBookings([
					...props.trainerBookings,
					{ ...response.data, ...res },
				])
			})
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-2"
			>
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
				{watchedDate && (
					<FormField
						control={form.control}
						name="time"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Time</FormLabel>
								<FormControl>
									<Select
										key={watchedDate && +watchedDate}
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
											{times.map((time) => (
												<SelectItem
													key={time}
													value={String(time)}
												>
													{time}:00
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				)}
				{watchedTime && watchedDate && (
					<FormField
						control={form.control}
						name="trainer_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Trainer</FormLabel>
								<FormControl>
									<Select
										key={
											watchedTime &&
											watchedDate &&
											watchedTime + +watchedDate
										}
										onValueChange={(val) =>
											field.onChange(parseInt(val, 10))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a trainer" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value="trainer_id"
												disabled
											>
												Select a trainer
											</SelectItem>
											{trainers.map((trainer) => (
												<SelectItem
													key={trainer.trainer_id}
													value={String(
														trainer.trainer_id
													)}
												>
													{trainer.first_name}{" "}
													{trainer.last_name} - $
													{trainer.rate}/hr
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				)}
				<Button type="submit">Book</Button>
			</form>
		</Form>
	)
}

export default BookingForm
