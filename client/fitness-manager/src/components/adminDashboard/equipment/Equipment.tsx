import { useState, useEffect } from "react"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { patchData } from "@/utils/patchData"

type EquipmentType = {
	equipment_id: number
	name: string
	equipment_type_id: number
	equipment_type_name: string
	under_maintenance: boolean
	last_maintained: Date
}

async function toggleMaintenance(equipmentId: number, maintenance: boolean) {
	if (maintenance) {
		const res = await patchData(
			`admin/equipment/${equipmentId}/endMaintenance`,
			{}
		)
		return res
	} else {
		const res = await patchData(
			`admin/equipment/${equipmentId}/startMaintenance`,
			{}
		)
		return res
	}
}

const Equipment = ({ equipment }: { equipment: EquipmentType }) => {
	const [maintenance, setMaintenance] = useState(equipment.under_maintenance)

	const handleMaintenance = async () => {
		const res = await toggleMaintenance(equipment.equipment_id, maintenance)
		if (res.status === 200) {
			setMaintenance(!maintenance)
		}
	}

	return (
		<div className="flex flex-row w-[650px]">
			<div className="flex flex-col gap-2">
				<div className="grid items-center grid-cols-7 grid-rows-1 gap-8 text-center">
					<p>{equipment.equipment_id}</p>
					<p>{equipment.name}</p>
					<p>{equipment.equipment_type_name}</p>
					<p>{maintenance ? "Yes" : "No"}</p>
					<p>
						{moment(equipment.last_maintained).format("MM/DD/YYYY")}
					</p>
					{maintenance ? (
						<Button
							className="w-[150px]"
							onClick={() => handleMaintenance()}
						>
							Remove Maintenance
						</Button>
					) : (
						<Button
							className="w-[150px]"
							onClick={() => handleMaintenance()}
						>
							Set Maintenance
						</Button>
					)}
				</div>
				<Separator />
			</div>
		</div>
	)
}

export default Equipment
