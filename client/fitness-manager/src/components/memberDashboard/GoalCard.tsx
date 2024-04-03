import DashboardCard from '../util/DashboardCard';
import Goal from './Goal';
import GoalForm from './GoalForm';
import { useState, useEffect } from 'react';
import { getData } from '@/utils/getData';

type GoalType = {
  goal_id: number
  member_id: number
  weight_goal: number
  goal_start: Date
  achieved_date: Date
  deleted: boolean

}

export async function getGoals() {
  const res = await getData(`members/1/goals`)
  console.log(res)
  return res.data
}

const GoalCard = ({
}: {

}) => {

  const [goalsState, setGoalsState] = useState([])

  useEffect(() => {
    getGoals().then((data) => {
      setGoalsState(data)
    })
  }, [])

  console.log(goalsState)

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
            goalId={goal.goal_id}
            goalVal={goal.weight_goal}
            goalStart={goal.goal_start}
            achievedDate={goal.achieved_date}
            deleted={goal.deleted}

          />
        ))}
        <GoalForm goals={goalsState} setGoalsState={setGoalsState}/>
      </div>
      
      
      
    </DashboardCard>
  )
}

export default GoalCard
