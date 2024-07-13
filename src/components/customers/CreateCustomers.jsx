import { Card, CardBody, CardFooter, CardHeader, Input, Button, ModalContent, ModalBody, Modal, } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";

export default function CreateCustomers() {

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        <>
            <Modal
                placement="top-center"
            >
                <>
                    <ModalContent>
                        {(onClose) => (
                            <ModalBody className="flex justify-center">
                                <Card>
                                    <CardHeader>
                                        <h1>New Custumers</h1>
                                    </CardHeader>
                                    <CardBody>
                                        <form onSubmit={FormCustomers.handleSubmit(addCustomers)} className="w-[275px]">
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
                            </ModalBody>
                        )}
                    </ModalContent>
                </>
            </Modal >
        </>
    )
}

