import DashboardCard from "@/components/memberDashboard/DashboardCard"
import { Input } from "@/components/ui/input"

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
        <button className="btn">Update</button>
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