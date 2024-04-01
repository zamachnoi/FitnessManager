import { Request, Response, NextFunction } from "express"

export function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Check if user is authenticated
	if (!(req.session?.user && req.session.user.authenticated)) {
		return res.status(401).json({ status: 401, message: "Unauthorized" })
	}

	// Extract IDs from URL parameters
	const { memberId, adminId, trainerId } = req.params

	// Assuming there's a 'user_id' and 'role' in the session to compare
	const userId = req.session.user.user_id
	const userRole = req.session.user.type

	// Compare the IDs based on the role; adjust logic as needed for your session structure
	if (
		(memberId && userRole === "Member" && memberId !== userId.toString()) ||
		(adminId && userRole === "Admin" && adminId !== userId.toString()) ||
		(trainerId && userRole === "Trainer" && trainerId !== userId.toString())
	) {
		return res
			.status(403)
			.json({ status: 403, message: "Forbidden: ID mismatch" })
	}

	// Proceed if everything checks out
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
