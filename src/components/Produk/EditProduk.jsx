import { Button, Input, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { axiosIntance } from "../../lib/axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";


export default function EditProduk({ produk, handleFetchProduk }) {

    const token = useSelector(state => state.auth.token)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            price: "",
            type: ""
        }
    })

    useEffect(() => {
        if (produk) {
            reset({
                id: produk.id,
                name: produk.name,
                price: produk.price,
                type: produk.type
            })
        }
    }, [produk])

    const updateProduk = async (data) => {
        try {
            // console.log(data)
            const res = await axiosIntance.put("/products",
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            if (res.data.status.code === 200) {
                toast.success("success")
                handleFetchProduk()
            }
        } catch (error) {
            console.log(error.message);
            toast.error("error")
        }
    }

    return (
        <ModalContent>
            {(onClose) => (
                <ModalBody>
                    <form onSubmit={handleSubmit(updateProduk)}>
                        <h1>Nama</h1>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => {
                                return <Input {...field} label="name" type="text" />
                            }}
                        />
                        <h1>Price</h1>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => {
                                return <Input {...field} label="price" type="text" />
                            }}
                        />
                        <h1>Type</h1>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => {
                                return <Input {...field} label="type" type="text" />
                            }}
                        />
                        <ModalFooter>
                            <Button onPress={onClose}>Close</Button>
                            <Button type="submit">Update</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            )}
        </ModalContent>
    )
}