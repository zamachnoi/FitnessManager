import DashboardCard from "@/components/util/DashboardCard"
import { getData } from "@/utils/getData"
import { useEffect, useState } from "react"
import PaymentRow from "./PaymentRow"
import { Button } from "@/components/ui/button"
import { postData } from "@/utils/postData"

export type Payment = {
	payment_id: number
	booking_id: number
	member_id: number
	amount_paid: number
	date_paid: Date
	payment_type: "Registration" | "Class" | "Trainer"
	processed: boolean
}

export default function PaymentsCard() {
	const [unprocessedPayments, setUnprocessedPayments] = useState<Payment[]>(
		[]
	)
	const [allPayments, setAllPayments] = useState<Payment[]>([])
	const [processedPayments, setProcessedPayments] = useState<Payment[]>([])

	useEffect(() => {
		getData("admin/payments").then((response) => {
			if (response.data) {
				setAllPayments(response.data)

				const unprocessedPayments = response.data.filter(
					(payment: Payment) => !payment.processed
				)
				setUnprocessedPayments(unprocessedPayments)

				const processedPayments = response.data.filter(
					(payment: Payment) => payment.processed
				)
				setProcessedPayments(processedPayments)
			}
		})
	}, [])

	const processAllPayments = async () => {
		const paymentIds = unprocessedPayments.map(
			(payment) => payment.payment_id
		)
		postData("admin/payments", { payment_ids: paymentIds }).then(
			(response) => {
				if (response.data) {
					setUnprocessedPayments([])
					setProcessedPayments([
						...processedPayments,
						...unprocessedPayments,
					])
				}
			}
		)
	}

	return (
		<div className="">
			<DashboardCard
				title="Unprocessed Payments"
				description="View all payments"
				footer={<p></p>}
				maxW="750px"
			>
				<div className="flex flex-row justify-between max-w-2xl gap-8">
					<div className="flex flex-col items-center justify-around gap-4">
						<div className="grid items-center grid-cols-7 grid-rows-1 gap-8 text-center">
							<p className="font-bold">Payment ID</p>
							<p className="font-bold">Member ID</p>
							<p className="font-bold">Payment Type</p>
							<p className="font-bold">Amount Paid</p>
							<p className="font-bold">Booking ID</p>
							<p className="font-bold">Date Paid</p>
							<p className="font-bold">Processed</p>
						</div>
						<div>
							{unprocessedPayments.map((payment) => (
								<PaymentRow
									key={payment.payment_id}
									payment={payment}
									setUnprocessedPayments={
										setUnprocessedPayments
									}
									unProcessedPayments={unprocessedPayments}
									setProcessedPayments={setProcessedPayments}
									processedPayments={processedPayments}
									processed={false}
								/>
							))}
						</div>
						<Button onClick={processAllPayments}>
							Process All
						</Button>
					</div>
				</div>
			</DashboardCard>
			<DashboardCard
				title="Processed Payments"
				description="View all processed payments"
				footer={<p></p>}
				maxW="750px"
			>
				<div className="flex flex-row justify-between max-w-2xl gap-8">
					<div className="flex flex-col items-center justify-around gap-4">
						<div className="grid items-center grid-cols-7 grid-rows-1 gap-8 text-center">
							<p className="font-bold">Payment ID</p>
							<p className="font-bold">Member ID</p>
							<p className="font-bold">Payment Type</p>
							<p className="font-bold">Amount Paid</p>
							<p className="font-bold">Booking ID</p>
							<p className="font-bold">Date Paid</p>
							<p className="font-bold">Processed</p>
						</div>
						<div>
							{processedPayments.map((payment) => (
								<PaymentRow
									key={payment.payment_id}
									payment={payment}
									setUnprocessedPayments={
										setUnprocessedPayments
									}
									unProcessedPayments={unprocessedPayments}
									setProcessedPayments={setProcessedPayments}
									processedPayments={processedPayments}
									processed={true}
								/>
							))}
						</div>
					</div>
				</div>
			</DashboardCard>
		</div>
	)
}
