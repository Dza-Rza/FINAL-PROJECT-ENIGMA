import { Card, CardBody, CardFooter, ModalContent, Input, Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";

export default function EditCustomers({ customer, handleFetchData }) {

    const token = useSelector(state => state.auth.token)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
        },
    });

    useEffect(() => {
        if (customer) {
            reset({
                id: customer.id,
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                address: customer.address,
            })
        }
    }, [customer])

    const updateCustomer = async (data) => {
        try {
            // console.log(data);
            const res = await axiosIntance.put("/customers",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (res.data.status.code === 200) {
                toast.success("success")
                handleFetchData()
            }
            // console.log(res.data.status)
        } catch (error) {
            console.log(error.message)
            toast.error("error")
        }
    }

    return (

        <ModalContent>
            {(onClose) => (
                <div
                // className="flex items-center justify-center"
                >
                    {/* <Card
                    //  className="w-[250px]"
                    > */}
                    <ModalBody className="gap-2">
                        <form onSubmit={handleSubmit(updateCustomer)}>
                            <h1>Nama</h1>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => {
                                    return <Input {...field} label="name" />
                                }}
                            />
                            <h1>Phone Number</h1>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field }) => {
                                    return <Input {...field} label="phoneNumber" />
                                }}
                            />
                            <h1>Address</h1>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => {
                                    return <Input {...field} label="address" />
                                }}
                            />
                            <ModalFooter
                            //  className="flex justify-end gap-2"
                            >
                                <Button onPress={onClose} color="danger" variant="ghost" >Close</Button>
                                <Button type="submit" color="success" variant="ghost">Update</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                    {/* </Card> */}
                </div>
            )}
        </ModalContent>
    )
}