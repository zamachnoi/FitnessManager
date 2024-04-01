import { useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

const LoginCard = ({

}) => {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="username"
          placeholder="Username"
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-4"
        />
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