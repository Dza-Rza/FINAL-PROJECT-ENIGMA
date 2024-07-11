import { Card, CardBody, CardFooter, CardHeader, Input, Button, ModalContent, ModalBody } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";
// import { useDisclosure } from "@nextui-org/react"

export default function CreateCustomers() {

    // const {on} = useDisclosure()
    const token = useSelector(state => state.auth.token)
    const FormCustomers = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: ""
        }
    })

    const addCustomers = async (data) => {
        try {

            const res = await axiosIntance.post("/customers", {
                ...data
            }, { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data)
            // console.log(token)
            if (res.data.status.code === 201) {
                toast.success("success")

            }
        } catch (error) {
            console.log(error)
            toast.error("error")
        }
    }

    return (
        <ModalContent>
            {(onClose) => (
                <ModalBody>
                    <div className="flex flex-col h-screen items-center justify-center">
                        <Card className="w-[275px] gap-2 border-[1px] p-2">
                            <CardHeader className="justify-center">
                                <h1>New Custumers</h1>
                            </CardHeader>
                            <CardBody>
                                <form className="gap-14" onSubmit={FormCustomers.handleSubmit(addCustomers)}>
                                    <label>NAME</label>
                                    <Controller
                                        name="name"
                                        control={FormCustomers.control}
                                        render={({ field }) => {
                                            return (<Input {...field} required />)
                                        }}
                                    />
                                    <label>PHONE NUMBER</label>
                                    <Controller
                                        name="phoneNumber"
                                        control={FormCustomers.control}
                                        render={({ field }) => {
                                            return (<Input {...field} required />)
                                        }}
                                    />
                                    <label>ADDRESS</label>
                                    <Controller
                                        name="address"
                                        control={FormCustomers.control}
                                        render={({ field }) => {
                                            return (<Input {...field} required />)
                                        }}
                                    />
                                    <CardFooter className="justify-end gap-2">
                                        <Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
                                        <Button type="submit" color="success" variant="ghost">Save</Button>
                                    </CardFooter>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </ModalBody>
            )}
        </ModalContent>
    )
}