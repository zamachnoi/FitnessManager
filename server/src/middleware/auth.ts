import { Request, Response, NextFunction } from "express"
import { authEnabled } from "../app"
export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!authEnabled) {
		return next()
	}

	const pathSegments = req.path.split("/").filter(Boolean)

	// Check if user is authenticated
	if (!(req.session?.user && req.session.user.authenticated)) {
		console.log("No session")
		return res.status(401).json({ status: 401, message: "Unauthorized" })
	}

	// Check if path is valid
	if (pathSegments.length < 2) {
		console.log("Invalid path")
		return res.status(401).json({ status: 401, message: "Unauthorized" })
	}

	const pathId = parseInt(pathSegments[1])

	const routeType = pathSegments[0]

	// Check if user is authorized
	if (req.session.user.user_id !== pathId) {
		console.log("wrong user id")
		return res.status(401).json({ status: 401, message: "Unauthorized" })
	}

	const allowedTypes = {
		Member: ["members"],
		Trainer: ["trainers", "members"],
		Admin: ["trainers", "members", "admins"],
	}

	// Check if user type is allowed to access the route
	if (!allowedTypes[req.session.user.type].includes(routeType)) {
		console.log("wrong user type")
		return res.status(401).json({ status: 401, message: "Unauthorized" })
	}

	next()
}

export function applyMiddlewareToRoutesStartingWith(
	prefixes: string[],
	middleware: (req: Request, res: Response, next: NextFunction) => void
) {
	return (req: Request, res: Response, next: NextFunction) => {
		const shouldApplyMiddleware = prefixes.some((prefix) =>
			req.path.startsWith(prefix)
		)
		if (shouldApplyMiddleware) {
			middleware(req, res, next)
		} else {
			next()
		}
	}
}

export function excludeGetRequests(
	middleware: (req: Request, res: Response, next: NextFunction) => void
) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (req.method !== "GET") {
			middleware(req, res, next)
		} else {
			next()
		}
	}
}
