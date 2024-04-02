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

const BookingSchema = z.object({
  date: z.date(),
  time: z.number(),
  trainer_id: z.number(),
  member_id: z.number(),
})


const BookingForm = ({
  times,
}: {
  times: number[]
}) => {

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema)
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
        <Button type="submit">Book</Button>
      </form>
    </Form>
  )
}

export default BookingForm