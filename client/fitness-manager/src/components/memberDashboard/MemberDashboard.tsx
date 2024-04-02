import PersonalInfoCard from "./PersonalInfoCard"
import GoalCard from "./GoalCard"
import { getData } from "@/utils/getData"

export async function getServerSideProps(memberId: number) {
  const memberHealthStats = await getData(`/member/${memberId}/stats`)
  const memberGoals = await getData(`/member/${memberId}/goals`)

  return {
    props: {
      memberHealthStats,
      memberGoals,
    }
  }
}



const MemberDashboard = ({
  memberId
}: {
  memberId: number
}) => {

  const testGoals = [
    {
      goalId: "1",
      goalName: "Lose 10 pounds"
    },
    {
      goalId: "2",
      goalName: "Gain 10 pounds"
    }
  
  ]

  const props = getServerSideProps(memberId)
  console.log(props)

  return (
    <div>
      <PersonalInfoCard />
      <GoalCard goals={testGoals} />
    </div>
    
  )
}

export default MemberDashboard