import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

const ClassSchema = z.object({
	date: z.date(),
	time: z.number(),
	class_name: z.string().min(3),
	trainer_id: z.number(),
	room_number: z.number(),
	cost: z.number(),
})

type TrainerType = {
	rate: number
	trainer_id: number
	first_name: string
	last_name: string
}

type RoomType = {
	room_id: number
	room_number: number
	name: string
}

// get serverside props
export async function getAvailableTrainers(date: Date, time: number) {
	// add time to date
	const dt = new Date(date)
	dt.setHours(time, 0, 0, 0)
	// convert to unix
	const unix = dt.getTime() / 1000

	const res = await getData(`trainers/booking/${unix}000`)
	console.log(res.data)
	return res.data
}

export async function getAvailableRooms(date: Date, time: number) {
	console.log(date)
	const dt = new Date(date)
	dt.setHours(time, 0, 0, 0)
	const unix = dt.getTime() / 1000
	console.log(dt)
	console.log(unix)

	const res = await getData(`rooms/available/${unix}000`)
	console.log(res.data)
	return res.data
}

export async function bookClass(data: any) {
	// fix route
	const fixedData = {
		name: data.class_name,
		trainer_id: data.trainer_id,
		room_id: data.room_number,
		timeslot: data.date.setHours(data.time, 0, 0, 0),
		cost: data.cost,
	}

	const res = await postData("classes/", fixedData)
	return res.data
}

const ClassCreatorForm = ({
	setOpen,
	classes,
	setClasses,
}: {
	setOpen: (val: boolean) => void
	classes: any
	setClasses: any
}) => {
	const [trainers, setTrainers] = useState<TrainerType[]>([])
	const [rooms, setRooms] = useState<RoomType[]>([])

	const form = useForm<z.infer<typeof ClassSchema>>({
		resolver: zodResolver(ClassSchema),
		defaultValues: {
			date: undefined,
			time: undefined,
			class_name: "",
			trainer_id: undefined,
			room_number: undefined,
			cost: 0,
		},
	})

	const watchedDate = form.watch("date")
	const watchedTime = form.watch("time")

	useEffect(() => {
		if (!watchedDate || !watchedTime) return
		getAvailableTrainers(watchedDate, watchedTime).then((data) => {
			setTrainers(data)
		})
		getAvailableRooms(watchedDate, watchedTime).then((data) => {
			setRooms(data)
		})
	}, [watchedDate, watchedTime])

	const onSubmit = (data: any) => {
		bookClass(data).then((res) => {
			setClasses([...classes, res])
			setOpen(false)
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
				<FormField
					control={form.control}
					name="class_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Class Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
									className="input"
									placeholder="Class Name"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cost"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cost ($)</FormLabel>
							<FormControl>
								<Input
									type="number"
									className="input"
									placeholder="Cost"
									value={field.value}
									onChange={(e) => {
										field.onChange(parseInt(e.target.value))
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
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
													{trainer.last_name}
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
						name="room_number"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Room</FormLabel>
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
											<SelectValue placeholder="Select a room" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value="room_number"
												disabled
											>
												Select a room
											</SelectItem>
											{rooms.map((room) => (
												<SelectItem
													key={room.room_id}
													value={String(room.room_id)}
												>
													{room.name} - Room{" "}
													{room.room_number}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
				)}
				<Button type="submit">Create Class</Button>
			</form>
		</Form>
	)
}

export default ClassCreatorForm
