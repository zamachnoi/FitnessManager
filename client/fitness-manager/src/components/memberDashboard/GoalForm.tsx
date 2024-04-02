import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const GoalForm = () => {
  return (
    <div className="flex justify-between items-center h-[20px]">
      <Input
        type="goalName"
        placeholder="add a goal..."
        className="mb-4"
      />
      <Button className="btn">Add</Button>
    </div>
  )
}

export default GoalForm