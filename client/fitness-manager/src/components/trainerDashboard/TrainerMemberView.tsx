import { useUser } from "@/context/userContext"
import { useNavigate } from "react-router"
import { getData } from "@/utils/getData"
import { ScrollArea } from "../ui/scroll-area"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import RoutineExercisesDialog from "../memberDashboard/routines/RoutineExercisesDialog"
import { Separator } from "../ui/separator"
import moment from "moment"
type TrainerMemberViewProps = {
	memberId: number | null
}

type MemberViewData = {
	member_data: {
		member_id: number
		username: string
		first_name: string
		last_name: string
		weight: number | null
	}
	unachieved_goals: {
		goal_id: number
		weight_goal: number
		goal_end: Date
		goal_start: Date
	}[]
	achieved_goals: {
		goal_id: number
		weight_goal: number
		goal_end: Date
		achieved_date: Date | null
		goal_start: Date
	}[]

	routines: {
		routine_id: number
		routine_name: string
		exercises: {
			exercise_id: number
			exercise_name: string
			exercise_type: string
			exercise_description: string
			equipment_name: string
		}[]
	}[]

	bookings: {
		trainer_bookings: {
			trainer_id: number | null
			first_name: string | null
			last_name: string | null
			rate: number | null
			booking_timestamp: Date | null
			member_booking_id: number | null
			trainer_booking_id: number | null
		}[]
		class_bookings: {
			class_id: number | null
			class_name: string | null
			price: number | null
			first_name: string | null
			last_name: string | null
			room_number: number | null
			booking_timestamp: Date | null
			member_booking_id: number | null
		}[]
	}
}
export default function TrainerMemberView(props: TrainerMemberViewProps) {
	const [memberData, setMemberData] = useState<MemberViewData | null>(null)

	const getMemberData = async () => {
		if (props.memberId) {
			const res = await getData(`trainers/memberView/${props.memberId}`)
			setMemberData(res.data)
		}
	}

	useEffect(() => {
		getMemberData()
	}, [props.memberId])

	return (
		<Card className="w-[700px]">
			<CardHeader>
				<CardTitle>Member View</CardTitle>
				<CardDescription>View your member's progress</CardDescription>
			</CardHeader>
			<CardContent>
				{props.memberId && (
					<div className="flex flex-col gap-2">
						<div className="flex flex-col">
							<div className="flex flex-row items-center gap-4">
								<div className="flex flex-row items-center gap-2">
									<p className="text-xl font-bold">
										{memberData?.member_data.first_name}
									</p>
									<p className="text-xl font-bold">
										{memberData?.member_data.last_name}
									</p>
								</div>
								<div className="flex flex-row gap-2">
									<p className="font-bold">Weight: </p>
									<p>{memberData?.member_data.weight}lbs</p>
								</div>
								<div className="flex flex-row gap-2">
									<p className="font-bold">Member ID: </p>
									<p>{memberData?.member_data.member_id}</p>
								</div>
								<div className="flex flex-row gap-2">
									<p className="font-bold">Username: </p>
									<p>{memberData?.member_data.username}</p>
								</div>
							</div>
						</div>
						<ScrollArea className="border rounded-md w-[650px] h-[600px] flex-col flex gap-2">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2 m-4">
									<CardTitle>Unachieved Goals</CardTitle>
									{memberData?.unachieved_goals.map(
										(goal) => (
											<div className="flex flex-col gap-2">
												<div
													key={goal.goal_id}
													className="flex flex-row gap-2"
												>
													<div className="flex flex-row gap-2">
														<div className="flex flex-row gap-2">
															<p className="font-bold">
																Goal:
															</p>
															<p>
																{
																	goal.weight_goal
																}
																lbs
															</p>
														</div>
														<div className="flex flex-row gap-2">
															<p className="font-bold">
																Start:
															</p>
															<p>
																{moment(
																	goal.goal_start
																).format(
																	"MM/DD/YYYY"
																)}
															</p>
														</div>
														<div className="flex flex-row gap-2">
															<p className="font-bold">
																End:
															</p>
															<p>
																{moment(
																	goal.goal_end
																).format(
																	"MM/DD/YYYY"
																)}
															</p>
														</div>
													</div>
												</div>
												<Separator />
											</div>
										)
									)}
								</div>
								<div className="flex flex-col gap-2 m-4">
									<CardTitle>Current Goals</CardTitle>
									<div className="flex flex-col gap-2">
										{memberData?.achieved_goals.map(
											(goal) => (
												<div className="flex flex-col gap-2">
													<div
														key={goal.goal_id}
														className="flex flex-row gap-2"
													>
														<div className="flex flex-row gap-2">
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Goal:
																</p>
																<p>
																	{
																		goal.weight_goal
																	}
																	lbs
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Start:
																</p>
																<p>
																	{moment(
																		goal.goal_start
																	).format(
																		"MM/DD/YYYY"
																	)}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	End:
																</p>
																<p>
																	{moment(
																		goal.goal_end
																	).format(
																		"MM/DD/YYYY"
																	)}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Achieved:
																</p>
																<p className="text-green-500">
																	{moment(
																		goal.goal_end
																	).format(
																		"MM/DD/YYYY"
																	)}
																</p>
															</div>
														</div>
													</div>
													<Separator />
												</div>
											)
										)}
									</div>
								</div>
								<div className="flex flex-col gap-2 m-4">
									<CardTitle>Routines</CardTitle>
									<div className="flex flex-col w-full">
										{memberData?.routines.map((routine) => (
											<div className="flex flex-col gap-2">
												<div
													key={routine.routine_id}
													className="flex flex-row justify-between w-full"
												>
													<div className="flex flex-row items-center gap-2 justify-self-start">
														<h1 className="font-bold">
															Routine:
														</h1>
														<p>
															{
																routine.routine_name
															}
														</p>
													</div>
													<div className="justify-self-center">
														<RoutineExercisesDialog
															routine={routine}
														/>
													</div>
												</div>
												<Separator />
											</div>
										))}
									</div>
								</div>
								<div className="flex flex-col gap-4 m-4">
									<CardTitle>Bookings</CardTitle>
									<div className="flex flex-col gap-2">
										<div>
											<CardTitle className="text-xl">
												Trainer Bookings
											</CardTitle>
											{memberData?.bookings.trainer_bookings.map(
												(booking) => (
													<div
														key={
															booking.trainer_booking_id
														}
														className="flex flex-col px-4"
													>
														<div className="flex flex-row gap-2">
															<p className="font-bold">
																Trainer:
															</p>
															<div className="flex flex-row">
																<p>
																	{
																		booking.first_name
																	}
																</p>
																<p>
																	{
																		booking.last_name
																	}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Price:
																</p>
																<p>
																	$
																	{
																		booking.rate
																	}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Date:
																</p>
																<p>
																	{moment(
																		booking.booking_timestamp
																	).format(
																		"MM/DD/YYYY hh:mm A"
																	)}
																</p>
															</div>
														</div>
														<Separator />
													</div>
												)
											)}
										</div>
										<div className="flex flex-col">
											<CardTitle className="text-xl">
												Class Bookings
											</CardTitle>
											{memberData?.bookings.class_bookings.map(
												(booking) => (
													<div
														key={booking.class_id}
														className="flex flex-col justify-around gap-2 m-4"
													>
														<div className="flex flex-row gap-2">
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Class:
																</p>
																<p>
																	{
																		booking.class_name
																	}{" "}
																	|{" "}
																	{
																		booking.room_number
																	}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Trainer:
																</p>
																<p>
																	{
																		booking.first_name
																	}{" "}
																	{
																		booking.last_name
																	}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Price:
																</p>
																<p>
																	$
																	{
																		booking.price
																	}
																</p>
															</div>
															<div className="flex flex-row gap-2">
																<p className="font-bold">
																	Date:
																</p>
																<p>
																	{moment(
																		booking.booking_timestamp
																	).format(
																		"MM/DD/YYYY hh:mm A"
																	)}
																</p>
															</div>
														</div>

														<Separator />
													</div>
												)
											)}
										</div>
									</div>
								</div>
							</div>
						</ScrollArea>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
