import { Router } from "express"
import * as routineController from "../controllers/routineController"

export const routineRoute = Router()

// GET
routineRoute.get("/", async (req, res) => {
  const data = await routineController.generateAllRoutinesGetResponse()

  res.status(data.status).json(data)
})

routineRoute.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const data = await routineController.generateRoutineByIdGetResponse(id)

  res.status(data.status).json(data)
})

routineRoute.get("/member/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const data = await routineController.generateRoutinesByMemberIdGetResponse(id)

  res.status(data.status).json(data)
})

// POST
routineRoute.post("/assign", async (req, res) => {
  const { memberId, routineId } = req.body
  const data = await routineController.generateAssignRoutineToMemberPostResponse(memberId, routineId)
  res.status(data.status).json(data)
})

// DELETE
routineRoute.delete("/unassign", async (req, res) => {
  const { memberId, routineId } = req.body
  const data = await routineController.generateUnassignRoutineFromMemberPostResponse(memberId, routineId)
  res.status(data.status).json(data)
})

