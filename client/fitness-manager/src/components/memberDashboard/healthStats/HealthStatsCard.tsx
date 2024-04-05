import DashboardCard from "@/components/util/DashboardCard"
import HealthStat from "./HealthStat"
import { useEffect, useState } from "react"
import { getData } from "@/utils/getData"
import HealthStatsForm from "./HealthStatsForm"

export type HealthStatsType = {
	stat_id: number
	member_id: number
	systolic_bp: number
	diastolic_bp: number
	heart_rate: number
	recorded: Date
}

export default function HealthStatsCard() {
	const memberId = 1
	const [healthStats, setHealthStats] = useState([] as HealthStatsType[])

	useEffect(() => {
		getData(`members/${memberId}/stats`).then((response) => {
			setHealthStats(response.data)
		})
	}, [])
	return (
		<DashboardCard
			title="Health Stats"
			description="View all your health stats here."
			footer={
				<HealthStatsForm
					healthStats={healthStats}
					setHealthStats={setHealthStats}
				/>
			}
		>
			<div>
				<div>
					{healthStats.map((stat) => (
						<HealthStat {...stat} key={stat.stat_id} />
					))}
				</div>
			</div>
		</DashboardCard>
	)
}
