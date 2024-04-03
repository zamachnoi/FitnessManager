import { Payments } from "../db/types"

export type PaymentsData = Omit<
	Payments,
	"payment_id" | "date_paid" | "processed"
> & {
	payment_id: number
	date_paid: Date | null
	processed: boolean | null
}

export type PaymentsResponse = {
	status: number
	message: string
	data: PaymentsData | null
}

export type PaymentsArrayResponse = {
	status: number
	message: string
	data: PaymentsData[]
}
