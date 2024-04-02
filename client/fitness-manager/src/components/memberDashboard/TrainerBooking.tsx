import moment from "moment"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TrainerBooking = ({
  member_id,
  trainer_id,
  booking_timestamp,
}:{
  member_id: number,
  trainer_id: number,
  booking_timestamp: Date,
}) => {
  return (
    <div>
      <div className="flex flex-row justify-between align-center">
        <p>{moment(booking_timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <div className="flex flex-row">
          <Button variant="link">Reschedule</Button>
          <Button variant="link">Cancel</Button>
        </div>
      </div>
      <Separator />
    </div>
    
  )
}

export default TrainerBooking