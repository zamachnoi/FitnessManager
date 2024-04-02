import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { DatePicker } from "../util/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import BookingForm from "./BookingForm"

import { useState } from "react"


const BookingDialog = ({
  date,
  setDate,
  times
}: {
  date: Date | null
  setDate: any
  times: number[]
}) => {

  const [selectedTime, setSelectedTime] = useState<number | null>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn">Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Personal Trainer</DialogTitle>
          <DialogDescription>
            Select a date and time to book a personal trainer
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">

          {/* <DatePicker date={date} setDate={setDate} />
          {date && (
            <Select >
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time" disabled>
                  Select a time
                </SelectItem>
                {times.map((time) => (
                  <SelectItem key={time} value={String(time)}>
                    {time}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )} */}
          <BookingForm times={times} />
          {/* <Button className="btn">Book</Button> */}
        </div>
        

      </DialogContent>
    </Dialog>
  )
}

export default BookingDialog