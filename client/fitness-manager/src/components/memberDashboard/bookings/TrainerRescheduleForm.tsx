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
import { patchData } from "@/utils/patchData"

import { useState, useEffect } from "react"
import { time } from "console"
import { watch } from "fs"
import { useUser } from "@/context/userContext"

const RescheduleSchema = z.object({
	date: z.date(),
	time: z.number(),
})

type Booking = {
	trainer_id: number
	first_name: string
	last_name: string
	rate: number
	booking_timestamp: Date
	member_booking_id: number
	trainer_booking_id: number
}
type TrainerRescheduleFormProps = {
	setBookings: any
	bookings: Booking[]
	booking: Booking
}

export default function TrainerRescheduleForm(
	props: TrainerRescheduleFormProps
) {
	const user = useUser()
	const userId = user.userId
	const [memberAvailableHours, setMemberAvailableHours] = useState<number[]>(
		[]
	)

	const [setTrainerrAvailableHours, setTrainerAvailableHours] = useState<
		number[]
	>([])

	const [totalAvailableHours, setTotalAvailableHours] = useState<number[]>([])

	const form = useForm<z.infer<typeof RescheduleSchema>>({
		defaultValues: {
			date: undefined,
			time: undefined,
		},
	})

	const getTrainerAvailableHours = async (date: Date) => {
		const res = await getData(
			`members/${userId}/booking/trainers/${
				props.booking.trainer_id
			}/hours/${date.getTime()}`
		)
		return res
	}

	const getMemberAvailableHours = async (date: Date) => {
		const res = await getData(
			`members/${userId}/booking/hours/${date.getTime()}`
		)
		return res
	}

	const onSubmit = (values: z.infer<typeof RescheduleSchema>) => {
		const dt = new Date(values.date)
		dt.setHours(values.time, 0, 0, 0)
		console.log(dt.getTime())
		patchData(
			`members/${userId}/booking/${props.booking.member_booking_id}/trainers/${props.booking.trainer_id}/booking/${props.booking.trainer_booking_id}/reschedule`,
			{
				new_booking_timestamp: dt.getTime(),
			}
		).then((res) => {
			if (res.status === 200) {
				console.log("res", res.data)
				props.setBookings(
					props.bookings.filter(
						(b: any) =>
							b.member_booking_id !==
							props.booking.member_booking_id
					)
				)
				props.setBookings((prev: any) => {
					return [...prev, res.data]
				})
			} else {
				console.log(res)
			}
		})
	}

	const watchedDate = form.watch("date")

	useEffect(() => {
		if (!watchedDate) return
		getTrainerAvailableHours(watchedDate).then((res) => {
			setTrainerAvailableHours(res.data)
		})
		getMemberAvailableHours(watchedDate).then((res) => {
			setMemberAvailableHours(res.data)
		})

		setTotalAvailableHours(
			memberAvailableHours.filter((hour) =>
				totalAvailableHours.includes(hour)
			)
		)
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
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
							<FormItem className="flex flex-col space-y-3">
								<FormLabel>Hour</FormLabel>
								<FormControl>
									<Select
										key={watchedDate && +watchedDate}
										onValueChange={(val) =>
											field.onChange(parseInt(val, 10))
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a time"></SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="time" disabled>
												Select a time
											</SelectItem>
											{totalAvailableHours.map((time) => (
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
				<Button type="submit">Reschedule</Button>
			</form>
		</Form>
	)
}
