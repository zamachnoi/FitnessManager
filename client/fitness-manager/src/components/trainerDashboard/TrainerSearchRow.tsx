import { Separator } from "../ui/separator"
export type TrainerSearchRowProps = {
	user_id: number
	last_name: string
	first_name: string
	username: string
	type: "Member"
	member_id: number
	weight: number
}
export default function TrainerSearchRow(props: TrainerSearchRowProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="grid items-center grid-cols-5 grid-rows-1 text-center">
				<p>{props.member_id}</p>
				<p>{props.first_name}</p>
				<p>{props.last_name}</p>
				<p>{props.username}</p>
				<p>{props.weight}</p>
			</div>
			<Separator />
		</div>
	)
}
