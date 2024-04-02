import DashboardCard from './DashboardCard';
import Goal from './Goal';

type GoalType = {
  goalId: string,
  goalName: string

}

const GoalCard = ({
  goals = []
}: {
  goals?: GoalType[]

}) => {
  return (
    <DashboardCard
      title="Goal"
      description="Update your goal"
      footer={null}
    >

      {goals.map((goal: GoalType, index: number) => (
        <Goal
          key={index}
          goalId={goal?.goalId}
          goalName={goal?.goalName}
        />
      ))  
      }

      
    </DashboardCard>
  )
}

export default GoalCard
