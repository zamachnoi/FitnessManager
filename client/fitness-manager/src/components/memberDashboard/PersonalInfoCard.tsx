import DashboardCard from "@/components/memberDashboard/DashboardCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const PersonalInfoCard = ({
  weight=0
}: {
  weight?: number
}) => {
  return (
    <DashboardCard
      title="Personal Info"
      description="Update your personal information"
      footer={(
        <Button className="btn">Update</Button>
      )}
    >
      <Input
        type="firstName"
        placeholder="First Name"
        className="mb-4"
      />
      <Input
        type="lastName"
        placeholder="Last Name"
        className="mb-4"
      />
      <Input
        type="weight"
        placeholder="Weight"
        className="mb-4"
        value={weight || ""}
      />
    </DashboardCard>

  )
}

export default PersonalInfoCard