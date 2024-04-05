import { Router } from "express"

import * as paymentController from "../controllers/paymentsController"

export const paymentRoute = Router()

paymentRoute.get("/", async (req, res) => {
	const data = await paymentController.generateAllPaymentsGetResponse()

	res.status(data.status).json(data)
})

paymentRoute.get("/:id", async (req, res) => {
	const id = parseInt(req.params.id)

	const data = await paymentController.generatePaymentByIdGetResponse(id)

	res.status(data.status).json(data)
})

paymentRoute.post("/:paymentId", async (req, res) => {
	const paymentId = parseInt(req.params.paymentId)

	const data = await paymentController.generatePaymentPostResponse(paymentId)

	res.status(data.status).json(data)
})

paymentRoute.post("/", async (req, res) => {
	const paymentIds = req.body.payment_ids

	const data = await paymentController.generatePaymentsPostResponse(
		paymentIds
	)

	res.status(data.status).json(data)
})
