import React from "react"
import TrainerScheduleCard from "./TrainerScheduleCard"
import TrainerSearchCard from "./TrainerSearchCard"

const TrainerDashboard = () => {
	return (
		<div>
			<TrainerSearchCard />
			<TrainerScheduleCard />
		</div>
	)
}

export default TrainerDashboard
