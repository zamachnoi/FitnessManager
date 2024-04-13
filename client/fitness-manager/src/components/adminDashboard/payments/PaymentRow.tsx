import { Separator } from "@/components/ui/separator"
import { Payment } from "./PaymentsCard"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { postData } from "@/utils/postData"
type PaymentRowProps = {
	payment: Payment
	setUnprocessedPayments: any
	unProcessedPayments: Payment[]
	setProcessedPayments: any
	processedPayments: Payment[]
	processed: boolean
}

export default function PaymentRow(props: PaymentRowProps) {
	const processPayment = async () => {
		postData(`admin/payments/${props.payment.payment_id}`, {}).then(
			(response) => {
				if (response.data) {
					const newUnprocessedPayments =
						props.unProcessedPayments.filter(
							(payment) =>
								payment.payment_id !== props.payment.payment_id
						)
					props.setUnprocessedPayments(newUnprocessedPayments)
					props.setProcessedPayments([
						...props.processedPayments,
						props.payment,
					])
				}
			}
		)
	}
	return (
		<div className="flex flex-row w-[675px]">
			<div className="flex flex-col gap-2">
				<div className="grid items-center grid-cols-7 grid-rows-1 gap-8 text-center">
					<p>{props.payment.payment_id}</p>
					<p>{props.payment.member_id}</p>
					<p>{props.payment.payment_type}</p>
					<p>{props.payment.amount_paid}</p>
					<p>{props.payment.booking_id}</p>
					<p>
						{moment(props.payment.date_paid).format("MM/DD/YYYY")}
					</p>
					{props.processed ? (
						<div>Processed</div>
					) : (
						<Button onClick={processPayment}>Process</Button>
					)}
				</div>
				<Separator />
			</div>
		</div>
	)
}
