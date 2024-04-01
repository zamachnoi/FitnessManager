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
        type="weight"
        placeholder="Weight"
        className="mb-4"
        value={weight || ""}
      />
    </DashboardCard>

  )
}

export default PersonalInfoCard