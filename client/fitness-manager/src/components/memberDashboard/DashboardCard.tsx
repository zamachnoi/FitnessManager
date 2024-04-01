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
}: {
  title: string,
  description: string,
  footer: React.ReactNode,
  children: React.ReactNode,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  )
}

export default DashboardCard