import {
	PaymentsArrayResponse,
	PaymentsResponse,
} from "../models/io/paymentsIo"
import * as paymentsData from "../data/paymentsData"

export async function generateAllPaymentsGetResponse(): Promise<PaymentsArrayResponse> {
	try {
		const payments = await paymentsData.getAllPayments()
		let res: PaymentsArrayResponse = {
			message: `success`,
			status: 200,
			data: payments,
		}
		return res
	} catch (e) {
		return { message: "Could not find payments", status: 404, data: [] }
	}
}

export async function generatePaymentByIdGetResponse(
	id: number
): Promise<PaymentsResponse> {
	try {
		const payment = await paymentsData.getPaymentById(id)
		let res: PaymentsResponse = {
			message: `success`,
			status: 200,
			data: payment,
		}
		return res
	} catch (e) {
		return { message: "Could not find payment", status: 404, data: null }
	}
}

export async function generatePaymentPostResponse(
	paymentId: number
): Promise<PaymentsResponse> {
	try {
		const newPayment = await paymentsData.processPayment(paymentId)
		let res: PaymentsResponse = {
			message: `success`,
			status: 200,
			data: newPayment,
		}
		return res
	} catch (e) {
		return { message: "Could not create payment", status: 404, data: null }
	}
}

export async function generatePaymentsPostResponse(
	paymentIds: number[]
): Promise<PaymentsArrayResponse> {
	try {
		const payments = await paymentsData.processPayments(paymentIds)
		let res: PaymentsArrayResponse = {
			message: `success`,
			status: 200,
			data: payments,
		}
		return res
	} catch (e) {
		return { message: "Could not create payments", status: 404, data: [] }
	}
}
