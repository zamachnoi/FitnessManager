import { db } from "../lib/db"

import { PaymentsData } from "../models/io/paymentsIo"

export async function getAllPayments(): Promise<PaymentsData[]> {
	const payments = await db.selectFrom("payments").selectAll().execute()

	if (!payments) {
		throw new Error("No payments found")
	}

	return payments
}

export async function getPaymentById(id: number): Promise<PaymentsData> {
	const payment = await db
		.selectFrom("payments")
		.where("payment_id", "=", id)
		.selectAll()
		.executeTakeFirstOrThrow()

	if (!payment) {
		throw new Error("No payment found")
	}

	return payment
}

export async function processPayment(paymentId: number) {
	const payment = await db
		.updateTable("payments")
		.set("processed", true)
		.where("payment_id", "=", paymentId)
		.returningAll()
		.executeTakeFirstOrThrow()

	return payment
}

export async function processPayments(
	paymentIds: number[]
): Promise<PaymentsData[]> {
	const payments = await db
		.updateTable("payments")
		.set("processed", true)
		.where("payment_id", "in", paymentIds)
		.returningAll()
		.execute()

	return payments
}
