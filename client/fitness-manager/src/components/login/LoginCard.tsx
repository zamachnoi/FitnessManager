import { useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"


const LoginCard = ({

}) => {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{isLogin ? (
          "Login"
          ) : (
          "Signup"
        )}</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="username"
          placeholder="Username"
          className="mb-4"
        />
        { !isLogin ? (
          <>

            <Input  
            type="firstName"
            placeholder="First Name"
            className="mb-4"
            />
            <Input 
            type="lastName"
            placeholder="Last Name"
            className="mb-4"
            />
          </>
          ) : (
          null
          )
        } 
        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
        />
        
        
        {!isLogin ? (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Account Type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Account Type</SelectLabel>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectGroup>
              
            </SelectContent>
          </Select>
          ) : (
          null
          )  }
        

      </CardContent>
      <CardFooter>
              {isLogin ? (
                <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>signup</a></p>
                ) : (
                <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>login</a></p>
                )}
            </CardFooter>
          </Card>

        )

}

export default LoginCard