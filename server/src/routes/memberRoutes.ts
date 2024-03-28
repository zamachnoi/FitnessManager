import { Router } from 'express'
import * as memberController from '../controllers/memberController'

export const memberRoute = Router()

memberRoute.get('/:id/health-stats', async (req, res) => {
  try {
    const memberId = parseInt(req.params.id)
    const memberHealthStats = await memberController.generateMembersGetHealthStatsResponse(memberId)
    res.status(200).json(memberHealthStats)
  } catch (e: any) {
    res.status(500).json({ message: e.message, status: "error" })
  }
})
