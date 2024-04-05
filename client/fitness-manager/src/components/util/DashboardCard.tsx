import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

const DashboardCard = ({
	title,
	description,
	footer,
	children,
	maxW,
}: {
	title: string
	description: string
	footer: React.ReactNode
	children: React.ReactNode
	maxW?: string
}) => {
	if (maxW !== undefined) {
		return (
			<Card className="max-w-fit">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter>{footer}</CardFooter>
			</Card>
		)
	}

	return (
		<Card className="max-w-[650px]">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>{footer}</CardFooter>
		</Card>
	)
}

export default DashboardCard
