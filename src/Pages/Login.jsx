import { Card, CardHeader, CardBody, Divider, Input, Button } from "@nextui-org/react"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { axiosIntance } from "../lib/axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"

const signUpFormSchema = z.object({
    username: z.string().min(4),
    password: z.string()
    // regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character")
})

export default function LoginUser() {
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(signUpFormSchema),
    })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const postRegUser = async (data) => {
        try {
            const { data: resdata } = await axiosIntance.post("/auth/login", {
                ...data
            })
            if (resdata.status.code === 201) {
                toast.success("login berhasil")
                setTimeout(() => {
                    const userInfo = jwtDecode(resdata.data.token)
                    localStorage.setItem(
                        "token", resdata.data.token
                    )
                    localStorage.setItem(
                        "userInfo", JSON.stringify(userInfo)
                    )
                    dispatch({
                        type: "SET_LOGIN_DATA", dataPayload: {
                            token: resdata.data.token,
                            userInfo: userInfo
                        }
                    });
                    navigate("/")
                }, 500)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="border-1 gap-2 p-2">
                <CardHeader className=" justify-center font-semibold text-lg ">
                    <h1>Sign Up</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                    <form onSubmit={form.handleSubmit(postRegUser)} className=" flex flex-col gap-4 w-[300px]">
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return <Input {...field} label="Username" size="sm" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} />
                            }}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return <Input {...field} type="password" label="Password" size="sm" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} />
                            }}
                        />
                        <Button type="submit" color="primary">Register</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}