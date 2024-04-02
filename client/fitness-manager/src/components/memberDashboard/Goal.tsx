import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator';

const GoalForm = ({
  goalId,
  goalName,
}: {
  goalId: string;
  goalName: string;
}) => {

  return (
    <div className="padding-4 ">
      <div className="flex justify-between items-center space-x-2">
        <h2 className="text-m">{goalName}</h2>
        <Checkbox
          id={goalId}
        />
      </div>
      <Separator className="mt-2" />
    </div>
    
  )
}

export default GoalForm