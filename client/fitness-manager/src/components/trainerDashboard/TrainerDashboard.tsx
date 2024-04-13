import TrainerScheduleCard from "./TrainerScheduleCard"
import TrainerSearchCard from "./TrainerSearchCard"
import TrainerAllBookingsCard from "./TrainerAllBookingsCard"
import TrainerMemberView from "./TrainerMemberView"
import { useState } from "react"
const TrainerDashboard = () => {
	const [selected, setSelected] = useState<number | null>(null)
	return (
		<div className="flex flex-row">
			<div>
				<TrainerSearchCard
					selected={selected}
					setSelected={setSelected}
				/>
				<TrainerScheduleCard />
				<TrainerAllBookingsCard />
			</div>
			<div>
				<TrainerMemberView memberId={selected} />
			</div>
		</div>
	)
}

export default TrainerDashboard
