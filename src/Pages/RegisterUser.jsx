// import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
// import { useFormik } from "formik";
// import * as yup from "yup"

// export default function RegisterUser() {

//     const regUser = () => {
//         alert("woi")
//     }

//     const formik = useFormik({
//         initialValues: {
//             username: "",
//             email: "",
//             password: ""
//         },
//         onSubmit: regUser,
//         validationSchema: yup.object().shape({
//             username: yup.string().required().min(3).max(10),
//             email: yup.string().required().email(),
//             password: yup.string().matches(/ ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$ /, "Minimum eight characters, at least one letter, one number and one special character")
//         })
//     })

//     const handleForm = (event) => {
//         const { target } = event
//         return formik.setFieldValue(target.name, target.value)
//     }

//     return (
//         <div className="flex h-screen justify-center items-center">
//             <Card className="border-1 p-2 bg-slate-100">
//                 <CardHeader className="justify-center font-semibold text-lg">
//                     <h1>Register User</h1>
//                 </CardHeader>
//                 <Divider />
//                 <CardBody className="flex gap-4 mt-2">
//                     <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-[300px]">
//                         <Input onChange={handleForm} name="username" type="text" label="username" variant="bordered" />
//                         <Input onChange={handleForm} name="email" type="email" label="email" variant="bordered" />
//                         <Input onChange={handleForm} name="password" type="password" label="password" variant="bordered" />
//                         <Button color="primary" type="submit">
//                             Submit
//                         </Button>
//                     </form>
//                 </CardBody>
//             </Card>
//         </div>
//     )
// }

import { Card, CardHeader, CardBody, Divider, Input, Button } from "@nextui-org/react"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { axiosIntance } from "../lib/axios"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"

const signUpFormSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    username: z.string().min(4),
    password: z.string().min(3)
    // regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character")
})

export default function Register() {
    const form = useForm({
        defaultValues: {
            email: "",
            name: "",
            username: "",
            password: "",
            role: "employee"
        },
        resolver: zodResolver(signUpFormSchema),
    })

    const navigate = useNavigate()

    const postRegUser = async (data) => {
        try {
            const res = await axiosIntance.post("/auth/register", {
                ...data,
                "role": "employee"
            })
            if (res.data.status.code === 201) {
                toast.success("register berhasil")
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            }
        } catch (error) {
            console.log(er)
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
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return <Input {...field} type="email" label="Email" size="sm" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} />
                            }}
                        />
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return <Input {...field} type="text" label="name" size="sm" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} />
                            }}
                        />
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
                        <p className="gap-4">Already Have An Account <Link to="/Login" >Login</Link> </p>
                        <Button type="submit" color="primary">Register</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}