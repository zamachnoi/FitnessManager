import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

import { patchData } from '@/utils/patchData';

import moment from "moment"

export async function achieveGoal(goalId: string) {
  const res = await patchData(`members/1/goals/${goalId}/achieve`, {})
  return res.data
}

export async function deleteGoal(goalId: string) {
  const res = await patchData(`members/1/goals/${goalId}/delete`, {})
  return res.data
}

const GoalForm = ({
  goalId,
  goalVal,
  goalStart,
  achievedDate,
  deleted,
}: {
  goalId: number;
  goalVal: number;
  goalStart: Date;
  achievedDate: Date | null;
  deleted: boolean;
}) => {

  const [isDeleted, setIsDeleted] = useState(deleted)
  const [isCompleted, setIsCompleted] = useState(achievedDate !== null)
  const [achievedDateState, setAchievedDateState] = useState(achievedDate)
  console.log(goalVal)

  const onComplete = async () => {
    await achieveGoal(goalId.toString())
    setIsCompleted(true)
    setAchievedDateState(new Date())
  }

  return (
    <div className="padding-4 ">
      <div className="flex justify-between items-center space-x-2">
        <h2 className="text-m">{String(goalVal)}lbs {}</h2>
        { !isCompleted && !isDeleted && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onComplete}
          >
            <Check />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsDeleted(true)
            }}
          >
            <X />
          </Button>
        </div>)}
        { isCompleted && !isDeleted && (
          <div>
            {moment(goalStart).format("MM/DD/YYYY")} - {moment(achievedDateState).format("MM/DD/YYYY")}
          </div>
            )}
        { !isCompleted && isDeleted && (
          <div>
            {moment(goalStart).format("MM/DD/YYYY")} - unfinished.
          </div>
            )}
        
      </div>
      <Separator className="mt-2" />
    </div>
    
  )
}

export default GoalForm