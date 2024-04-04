import DashboardCard from "@/components/util/DashboardCard"
import ClassBooking from "@/components/memberDashboard/bookings/ClassBooking"

import { getData } from "@/utils/getData"

import { useState, useEffect } from "react"

import ClassCreatorDialog from "./ClassCreatorDialog"

type ClassType = {
  class_id: number
  name: string
  first_name: string
  last_name: string
  class_time: Date
  price: number
  room_number: number
  booking_timestamp: Date
}

async function getClasses() {
  const classes = await getData("classes")
  console.log(classes.data)
  return classes.data

}

const ClassManagerCard = () => {

  const [classes, setClasses] = useState<ClassType[]>([])

  useEffect(() => {
    getClasses().then((data) => {
      setClasses(data)
    })
  }, [])

  return (


    <DashboardCard
      title="Class Manager"
      description="View and manage all classes here."
      footer={
        <ClassCreatorDialog classes={classes} setClasses={setClasses} />
      }
    >
      <div>
        {classes.map((booking, index) => (
          <ClassBooking {...booking} key={index} />
        ))}
      </div>
    </DashboardCard>
  )
}

export default ClassManagerCard