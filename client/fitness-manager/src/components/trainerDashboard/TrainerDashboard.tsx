import TrainerScheduleCard from "./TrainerScheduleCard"
import TrainerSearchCard from "./TrainerSearchCard"
import TrainerAllBookingsCard from "./TrainerAllBookingsCard"

const TrainerDashboard = () => {
	return (
		<div>
			<TrainerSearchCard />
			<TrainerScheduleCard />
			<TrainerAllBookingsCard />
		</div>
	)
}

export default TrainerDashboard
