import DashboardCard from "@/components/util/DashboardCard"
import { getData } from "@/utils/getData"
import { useEffect, useState } from "react"
import { RoutineInfo, RoutineType } from "./Routines"
import RoutinesFooter from "./RoutinesFooter"
export default function RoutinesCard() {
	const memberId = 1

	const [routines, setRoutines] = useState<RoutineType[]>([])

	useEffect(() => {
		getData(`members/${memberId}/routines`).then((response) => {
			console.log(response)
			setRoutines(response.data || [])
			console.log(routines)
		})
	}, [])

	return (
		<div className="w-[650px]">
			<DashboardCard
				title="Routines"
				description="View all your routines here."
				footer={
					<RoutinesFooter
						parentRoutines={routines}
						setParentRoutines={setRoutines}
					/>
				}
			>
				<div className="w-full">
					{routines.map((routine, index) => (
						<RoutineInfo
							routine={routine}
							parentRoutines={routines}
							setParentRoutines={setRoutines}
							key={index}
							removeButton={true}
						/>
					))}
				</div>
			</DashboardCard>
		</div>
	)
}
