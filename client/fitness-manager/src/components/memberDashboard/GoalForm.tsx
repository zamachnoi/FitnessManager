import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react"


const GoalForm = ({
  goals,
  setGoalsState
}: {
  goals: any,
  setGoalsState: any
}) => {

  const [goal, setGoal] = useState('')

  return (
    <div className="flex justify-between items-center space-x-4">
      <Input
        type="goalName"
        placeholder="add a goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <Button className="btn" onClick={
        () => {
          setGoalsState([...goals, { goalId: goals[goals.length - 1].goalId + 1, goalName: goal }])
        }
      }>Add</Button>
    </div>
  )
}

export default GoalForm