import PersonalInfoCard from "./PersonalInfoCard"
import GoalCard from "./GoalCard"

import AllBookingsCard from "./bookings/AllBookingsCard"
import HealthStatsCard from "./healthStats/HealthStatsCard"
import RoutinesCard from "./routines/RoutinesCard"

const MemberDashboard = () => {
	return (
		<div className="flex flex-row gap-4">
			<div>
				<PersonalInfoCard />
				<GoalCard />
			</div>
			<div>
				<AllBookingsCard />
				<HealthStatsCard />
			</div>
			<div>
				<RoutinesCard />
			</div>
		</div>
	)
}

export default MemberDashboard
