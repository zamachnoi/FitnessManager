import PersonalInfoCard from "./PersonalInfoCard"
import GoalCard from "./GoalCard"
import PersonalTrainingCard from "./PersonalTrainingCard"

import { getData } from "@/utils/getData"
import AllBookingsCard from "./bookings/AllBookingsCard"
import HealthStatsCard from "./healthStats/HealthStatsCard"

export async function getServerSideProps(memberId: number) {
	const memberHealthStats = await getData(`/member/${memberId}/stats`)
	const memberGoals = await getData(`/member/${memberId}/goals`)

	return {
		props: {
			memberHealthStats,
			memberGoals,
		},
	}
}

const MemberDashboard = ({ memberId }: { memberId: number }) => {
	const testGoals = [
		{
			goalId: "1",
			goalName: "Lose 10 pounds",
		},
		{
			goalId: "2",
			goalName: "Gain 10 pounds",
		},
	]

	const testBookings = [
		{
			member_booking_id: 1,
			trainer_booking_id: 1,
			member_id: 1,
			trainer_id: 6,
			booking_timestamp: new Date("2024-04-02T16:00:00.000Z"),
		},
	]

	const testTimes = [1, 2, 3, 4, 5, 6]

	const props = getServerSideProps(memberId)
	console.log(props)

	return (
		<div className="flex flex-row gap-4">
			<div>
				<PersonalInfoCard />
				<GoalCard />
				<PersonalTrainingCard
					bookings={testBookings}
					times={testTimes}
				/>
			</div>
			<div>
				<AllBookingsCard />
				<HealthStatsCard />
			</div>
		</div>
	)
}

export default MemberDashboard
