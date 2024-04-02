import DashboardCard from './DashboardCard';
import Goal from './Goal';
import GoalForm from './GoalForm';
import { useState } from 'react';

type GoalType = {
  goalId: string,
  goalName: string

}

const GoalCard = ({
  goals = []
}: {
  goals?: GoalType[]

}) => {

  const [goalsState, setGoalsState] = useState(goals)


  return (
    <DashboardCard
      title="Goal"
      description="Update your goal"
      footer={null}
    >
      <div className="flex flex-col space-y-4">
        {goalsState.map((goal: GoalType, index: number) => (
          <Goal
            key={index}
            goalId={goal?.goalId}
            goalName={goal?.goalName}
          />
        ))}
        <GoalForm goals={goalsState} setGoalsState={setGoalsState}/>
      </div>
      
      
      
    </DashboardCard>
  )
}

export default GoalCard
