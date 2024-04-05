import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { getData } from "@/utils/getData"
import DashboardCard from "../util/DashboardCard"
import TrainerSearchRow from "./TrainerSearchRow"
import { TrainerSearchRowProps } from "./TrainerSearchRow"
import { Separator } from "@radix-ui/react-select"
import { ScrollArea } from "../ui/scroll-area"

export default function TrainerSearchCard() {
	const [search, setSearch] = useState("")
	const [memberData, setMemberData] = useState<TrainerSearchRowProps[]>([])
	const [error, setError] = useState("")

	const handleSearch = async () => {
		// if theres a space in search, replace with a %20
		const searchQuery = search.replace(" ", "%20")

		getData(`members/profile/${searchQuery}`).then((res) => {
			if (res.data) {
				setMemberData(res.data)
			}
		})
	}

	const handleSearchAll = async () => {
		getData("members").then((res) => {
			if (res.data) {
				setMemberData(res.data)
			}
		})
	}

	useEffect(() => {
		if (search === "") {
			handleSearchAll()
			setError("")
		}
		// if there is more than one space, set error
		else if (search.split(" ").length > 2) {
			setError("Please only enter (First), (Last), or (First Last) name.")
		} else {
			handleSearch()
			setError("")
		}

		//
	}, [search])

	return (
		<DashboardCard
			title="Member Search"
			description="Search for members"
			footer={<p></p>}
		>
			<div className="flex flex-col gap-4 h-fit">
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Separator />
			</div>
			<div className="flex-col gap-4">
				<div className="grid items-center grid-cols-5 grid-rows-1 text-center">
					<p className="font-bold">Member ID</p>
					<p className="font-bold">First Name</p>
					<p className="font-bold">Last Name</p>
					<p className="font-bold">Username</p>
					<p className="font-bold">Weight</p>
				</div>

				<ScrollArea className="h-40">
					<div>
						{memberData.map((member, index) => (
							<TrainerSearchRow {...member} key={index} />
						))}
					</div>
				</ScrollArea>
				<p className="text-red-500">{error}</p>
			</div>
		</DashboardCard>
	)
}
