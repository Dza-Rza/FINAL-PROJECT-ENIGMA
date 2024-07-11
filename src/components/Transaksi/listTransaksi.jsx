import { Card, CardHeader, CardBody, Divider, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z, ZodError } from "zod";

const transaksiFormSchema = z.object({
    kodeTransaksi: z.string().nonempty("Kode Transaksi tidak boleh kosong"),
    namaKonsumen: z.string().min(4, "Nama Konsumen tidak boleh kosong"),
    paketLaundry: z.string().nonempty("Peket Laundry tidak boleh kosong"),
    Qty: z.coerce.number().min(1, "Qty tidak boleh kosong")
})

import { useState } from "react";

export default function ListTransactions() {

    const [openModal, setOpenModal] = useState(false)

    const openSubmit = () => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const optionPaketLaundry = [
        { key: "Standard", label: "Standard" },
        { key: "Premium", label: "Premium" },
        { key: "Express", label: "Express" }
    ]

    const formInput = useForm({
        defaultValues: {
            kodeTransaksi: "",
            namaKonsumen: "",
            paketLaundry: optionPaketLaundry,
            Qty: ""
        },
        resolver: zodResolver(transaksiFormSchema)
    })

    const onSubmit = (data) => {
        try {
            console.log(data)
            toast.success("Transaksi Success!")
        } catch (error) {
            if (error instanceof ZodError) {
                toast.error("Terjadi kesalahan. Mohon perikasa kembali formulir.")
            }
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-[900px] mt-8">
                <CardHeader className="font-semibold justify-between p-2">
                    <h1>Daftar Transaksi</h1>
                    <Button color="primary" onClick={openSubmit}>Tambah Transaksi</Button>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="text-center font-sans flex justify-between">
                        <h1>kode pelanggan</h1>
                        <h1>nama pelanggan</h1>
                        <h1>riwayat transkasi</h1>
                    </div>
                </CardBody>
            </Card>
            <div className="h-screen justify-center items-center">
                {openModal && (
                    <Card className="border-1 p-2 w-[300px] bg-slate-100">
                        <CardHeader className="font-semibold justify-between py-2">
                            <h1>Daftar Transaksi</h1>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <form onSubmit={formInput.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                                <h1>Kode Transakasi</h1>
                                <Controller
                                    name="kodeTransaksi"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => { return <Input {...field} variant="bordered" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} /> }}
                                />
                                <h1>Nama Konsumen</h1>
                                <Controller
                                    name="namaKonsumen"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => { return <Input {...field} variant="bordered" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} /> }}
                                />
                                <h1>Pilih paket Laundry</h1>
                                <Controller
                                    name="paketLaundry"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => {
                                        return <Select {...field} placeholder="pilih-paket" variant="bordered" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} >
                                            {optionPaketLaundry.map((option) => (
                                                <SelectItem className="bg-slate-100 text-center" key={option.key} value={option.key}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    }}
                                />
                                <h1>Qty(Kg)</h1>
                                <Controller
                                    name="Qty"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => { return <Input {...field} type="number" variant="bordered" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} /> }}
                                />
                                <h1>Total Bayar</h1>
                                <Input variant="bordered" disabled />
                                <div className="flex justify-end gap-2">
                                    <Button color="danger" variant="ghost" onClick={closeModal}>
                                        Tutup
                                    </Button>
                                    <Button type="submit" color="primary" variant="ghost">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                )}
            </div>
        </div>
    )
}