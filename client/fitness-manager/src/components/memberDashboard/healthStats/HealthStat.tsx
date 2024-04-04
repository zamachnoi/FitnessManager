import { Separator } from "@/components/ui/separator"
import moment from "moment"

type HealthStatsProps = {
	stat_id: number
	member_id: number
	systolic_bp: number
	diastolic_bp: number
	heart_rate: number
	recorded: Date
}

export default function HealthStat(props: HealthStatsProps) {
	return (
		<div className="flex flex-col gap-1">
			<div className="flex flex-row justify-evenly">
				<div className="flex flex-col gap-8">
					{moment(props.recorded).format("MMMM Do YYYY")}
				</div>
				<div className="flex flex-col">
					{moment(props.recorded).format("h:mm:ss a")}
				</div>
				<div className="flex flex-row items-center gap-4">
					<p className="text-xs text-gray-500">BP</p>
					{props.systolic_bp} / {props.diastolic_bp}
				</div>
				<div className="flex flex-row items-center gap-4">
					<p className="text-xs text-gray-500">HR</p>
					<p>{props.heart_rate} bpm</p>
				</div>
			</div>
			<Separator />
		</div>
	)
}
