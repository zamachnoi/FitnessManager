import { getData } from "@/utils/getData"
import { postData } from "@/utils/postData"
import moment from "moment"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"


type ClassType = {
  class_id: number
  name: string
  first_name: string
  last_name: string
  class_time: Date
  price: number
}

async function getBookableClasses() {
  const res = await getData("classes/1/bookable")
  return res.data
}

async function bookClass(classId: number) {
  const res = await postData(`members/1/booking/classes/${classId}`, {})
  return res.data
}


const ClassBookingForm = () => {

  const [classes, setClasses] = useState<ClassType[]>([])

  useEffect(() => {
    getBookableClasses().then((data) => {
      setClasses(data)
    })
  }, [])

  const onBook = (classId: number) => {
    bookClass(classId).then(() => {
      getBookableClasses().then((data) => {
        setClasses(data)
      })
    })
  }

  return (
    <div>
      {classes && classes.map((classData) => (
        <div>
          <div className="border py-1 px-2 rounded-md flex flex-row justify-between">
            <div>

              <div className="flex flex-row space-x-1">
                <div className="font-bold">
                  {classData.name} with {classData.first_name} {classData.last_name} 
                </div>
                <div >
                  - ${classData.price}
                </div>
              </div>
              <div className="text-xs">
                {moment(classData.class_time).format("YYYY-MM-DD HH:mm")}
              </div>
            </div>
            <div>
              <Button variant="link" onClick={() => onBook(classData.class_id)} >
                Book
              </Button>
            </div>
            
          </div>
        </div>

      ))}
      {!classes.length && <div>No classes available</div>}
    </div>
  )
}

export default ClassBookingForm