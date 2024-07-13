import { Card, CardHeader, CardBody, Divider, Button, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, select, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
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

import { useEffect, useState } from "react";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";

export default function ListTransactions() {


    const token = useSelector(state => state.auth.token)
    const [dataTranskasi, setDataTransaksi] = useState([])
    const [dataCustomer, setDataCustomer] = useState([])
    const [dataProduk, setDataProduk] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const animals = [{
        label: "aaaa",
    },
    {
        label: "aaaa",
    },
    {
        label: "aaaa",
    }]
    const formInput = useForm({
        defaultValues: {
            kodeTransaksi: "",
            namaKonsumen: "",
            paketLaundry: "",
            Qty: ""
        },
        resolver: zodResolver(transaksiFormSchema)
    })

    const getTransksi = async () => {
        try {
            const res = await axiosIntance.get("/bills",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (res.data.status.code === 200) {
                setDataTransaksi(res.data.data)
            }
        } catch (error) {
            console.log(error.message);
            toast.error("error")
        }
    }

    const fetchCustomers = async () => {
        try {

            // console.log(AuthCustomers)
            const { data: customerData } = await axiosIntance.get(
                `/customers`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setDataCustomer(customerData.data)
        } catch (error) {
            console.log(error)
            toast.error("error")
        }
    }

    const getProduk = async () => {
        try {
            const res = await axiosIntance.get("/products/",
                {
                    headers:
                        { Authorization: `Bearer ${token}` }
                }
            )
            // console.log(res.data.data)
            if (res.data.status.code == 200) {
                setDataProduk(res.data.data)
            }
        } catch (error) {
            console.log(error.message);
            toast.error("error")
        }
    }

    useEffect(() => {
        getTransksi()
        getProduk()
        fetchCustomers()
    }, [])

    useEffect(() => {
        console.log(dataTranskasi)
    }, [dataTranskasi])

    const openSubmit = () => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }


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
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>#</TableColumn>
                            <TableColumn>Kode Pelanggan</TableColumn>
                            <TableColumn>Nama Pelanggan</TableColumn>
                            <TableColumn>Label Transaksi</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                dataCustomer.map((customer, index) => (
                                    <TableRow key={index + 1} className="text-center">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>
                                            <Button>
                                                Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
            <div className="flex justify-center items-center">
                {openModal && (
                    <Card className="border-1 p-2 w-[300px] bg-slate-100">
                        <CardHeader className="font-semibold justify-between py-2">
                            <h1>Daftar Transaksi</h1>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <form onSubmit={formInput.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                                <h1>Nama Konsumen</h1>
                                <Controller
                                    name="namaKonsumen"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => {
                                        return <Select {...field} variant="bordered" placeholder="Nama Customers" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} >
                                            {dataCustomer.map((customer) => (
                                                <SelectItem variant="bordered" color="primary" className="bg-slate-100 text-center" key={customer.id}>
                                                    {customer.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    }}
                                />
                                <h1>Pilih paket Laundry</h1>
                                <Controller
                                    name="paketLaundry"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => {
                                        return <Select {...field} variant="bordered" placeholder="Paket Laundry" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} >
                                            {dataProduk.map((produk) => (
                                                <SelectItem variant="bordered" color="primary" className="bg-slate-100 text-center" key={produk.id}>
                                                    {produk.name}
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