import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { DatePicker } from "../util/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getData } from "@/utils/getData"

import { useState, useEffect } from "react"

const BookingSchema = z.object({
  date: z.date(),
  time: z.number(),
  trainer_id: z.number(),
  member_id: z.number(),
})

type TrainerType = {
  trainerId: number,
  rate: number,
  trainer_id: number,
  first_name: string,
  last_name: string,
}

// get serverside props
export async function getAvailableTrainers(date: Date, time: number) {
  // add time to date
  const dt = new Date(date)
  dt.setHours(time)
  // convert to unix
  const unix = dt.getTime() / 1000

  const res = await getData(`/members/1/booking/trainers/${unix}`)
  return res
}

const BookingForm = ({
  times,
}: {
  times: number[]
}) => {

  const [trainers, setTrainers] = useState<TrainerType[]>([])

  useEffect(() => {
    getAvailableTrainers(new Date(), 0).then((res) => {
      setTrainers(res)
    })
  }, [])

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      date: new Date(),
      time: 0,
      trainer_id: 1,
      member_id: 1,
    }
  })

  function onSubmit(values: z.infer<typeof BookingSchema>) {
    console.log('here')
    console.log(values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker date={field.value} setDate={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                
                <Select onValueChange={(val) => field.onChange(parseInt(val, 10))}>
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
                
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trainer_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trainer</FormLabel>
              <FormControl>
                <Select onValueChange={(val) => field.onChange(parseInt(val, 10))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainer" disabled>
                      Select a trainer
                    </SelectItem>
                    {trainers.map((trainer) => (
                      <SelectItem key={trainer.trainer_id} value={String(trainer.trainer_id)}>
                        {trainer.first_name} {trainer.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Book</Button>
      </form>
    </Form>
  )
}

export default BookingForm