import { Separator } from "../ui/separator"
export type TrainerSearchRowData = {
	user_id: number
	last_name: string
	first_name: string
	username: string
	type: "Member"
	member_id: number
	weight: number
}

export type TrainerSearchRowProps = {
	member: TrainerSearchRowData
	selected: number | null
	setSelected: (id: number) => void
}
export default function TrainerSearchRow(props: TrainerSearchRowProps) {
	const select = () => {
		props.setSelected(props.member.member_id)
	}

	return (
		<div className="flex flex-col gap-2">
			<div
				className={`grid items-center grid-cols-5 grid-rows-1 text-center  rounded-md hover:cursor-pointer ${
					props.member.member_id === props.selected
						? "border-2 border-black"
						: ""
				}`}
				onClick={select}
			>
				<p>{props.member.member_id}</p>
				<p>{props.member.first_name}</p>
				<p>{props.member.last_name}</p>
				<p>{props.member.username}</p>
				<p>{props.member.weight}</p>
			</div>
			<Separator />
		</div>
	)
}
