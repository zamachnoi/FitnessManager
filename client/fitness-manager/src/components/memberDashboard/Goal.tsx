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
    <div>
      <div className="flex justify-between items-center h-[20px]">
        <h2 className="text-2xl font-bold">{goalName}</h2>
        <Checkbox
          id={goalId}
        />
      </div>
      <Separator />
    </div>
    
  )
}

export default GoalForm