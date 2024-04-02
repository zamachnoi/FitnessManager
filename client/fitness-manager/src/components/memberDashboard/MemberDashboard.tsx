import PersonalInfoCard from "./PersonalInfoCard"
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

  const props = getServerSideProps(memberId)

  return (
    <PersonalInfoCard />
  )
}

export default MemberDashboard