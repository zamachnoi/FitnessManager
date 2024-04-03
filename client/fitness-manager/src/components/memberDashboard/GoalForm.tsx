import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState } from "react"

import { postData } from "@/utils/postData"

export async function postGoal(goalVal: number) {
  const res = await postData(`members/1/goals`, { weight_goal: goalVal })
  return res.data
}

const GoalForm = ({
  goals,
  setGoalsState
}: {
  goals: any,
  setGoalsState: any
}) => {

  const [goal, setGoal] = useState('')

  const onAdd = async () => {
    const newGoal = await postGoal(parseInt(goal))
    setGoalsState([...goals, newGoal])
  }

  return (
    <div className="flex justify-between items-center space-x-4">
      <Input
        type="number"
        placeholder="add a goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <Button className="btn" onClick={
        onAdd
      }>Add</Button>
    </div>
  )
}

export default GoalForm