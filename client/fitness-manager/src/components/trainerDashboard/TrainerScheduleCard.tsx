import { useState, useEffect } from 'react'
import DashboardCard from '../util/DashboardCard'

import { getData } from '@/utils/getData'
import moment from "moment"

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { patchData } from '@/utils/patchData'



const TrainerUpdateSchema = z.object({
  start_availability: z.number(),
  end_availability: z.number(),
  rate: z.number(),
})

type TrainerType = {
  trainer_id: number,
  start_availability: string,
  end_availability: string,
  rate: number,
  user_id: number,
  last_name: string,
  first_name: string,
  type: string
}

type TrainerUpdateType = {
  start_availability: number,
  end_availability: number,
  rate: number,
}

type TrainerUpdateRequest = {
  start_availability: string,
  end_availability: string,
  rate: number,
}

async function getTrainerData() {
  const res = await getData(`trainers/4`)
  return res.data
}

async function updateTrainerData(data: TrainerUpdateRequest) {
  const res = await patchData(`trainers/4`, data)
  return res.data
}

const TrainerScheduleCard = () => {



  useEffect(() => {
    getTrainerData().then((data: TrainerType) => {
      const newValues = {
        start_availability: parseInt(moment(data.start_availability, "HH:mm:ss").format("HH")),
        end_availability: parseInt(moment(data.end_availability, "HH:mm:ss").format("HH")),
        rate: data.rate
      }
      form.setValue('start_availability', newValues.start_availability)
      form.setValue('end_availability', newValues.end_availability)
      form.setValue('rate', newValues.rate)
    })
  }, [])

  const onSubmit = async (data: TrainerUpdateType) => {
    console.log('here')
    console.log(data)
    const vals = {
      start_availability: `${data.start_availability}:00`,
      end_availability: `${data.end_availability}:00`,
      rate: data.rate
    }
    await updateTrainerData(vals)
  }



  const form = useForm<z.infer<typeof TrainerUpdateSchema>>({
    resolver: zodResolver(TrainerUpdateSchema),
    defaultValues: {
      start_availability: 0,
      end_availability: 0,
      rate: 0,
    },
   // values: { start_availability: values.start_availability, end_availability: values.end_availability, rate: values.rate}
  })

  const watchHour = form.watch('start_availability')
  console.log(watchHour)


  return (
    <DashboardCard
      title="Schedule"
      description="Update your availabilities"
      footer={null}
    > 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="start_availability"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Start Time (hr)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Start Time"
                    onChange={(e) => { field.onChange(parseInt(e.target.value)) }}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_availability"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>End Time (hr)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="End Time"
                    onChange={(e) => { field.onChange(parseInt(e.target.value)) }}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Rate"
                    onChange={(e) => { field.onChange(parseInt(e.target.value)) }}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="mt-2" type="submit">Update</Button>

        </form>
      </Form>
    </DashboardCard>

  )
}

export default TrainerScheduleCard