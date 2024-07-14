import { Card, CardHeader, CardBody, Divider, Button, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, select, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { FiCreditCard, FiEdit, FiList } from "react-icons/fi";

const transaksiFormSchema = z.object({
    customerId: z.string().min(4, "Nama Konsumen tidak boleh kosong"),
    productId: z.string().nonempty("Peket Laundry tidak boleh kosong"),
    Qty: z.coerce.number().min(1, "Qty tidak boleh kosong")
})

import { useEffect, useState } from "react";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";
import RiwayatTransactions from "./RiwayatTransaksi";

export default function ListTransactions() {

    const token = useSelector(state => state.auth.token)
    const [dataTranskasi, setDataTransaksi] = useState([])
    const [dataCustomer, setDataCustomer] = useState([])
    const [dataProduk, setDataProduk] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [modalDetails, setModalDetails] = useState(false)
    const [selectedDetails, setSelectedDetails] = useState(null)

    const formInput = useForm({
        defaultValues: {
            customerId: "",
            productId: "",
            Qty: ""
        },
        resolver: zodResolver(transaksiFormSchema)
    })

    const getTransksi = async () => {
        try {
            const res = await axiosIntance.get("/bills", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const transactions = res.data.data;

            const newCustomerdataTransaksion = [];

            transactions.forEach((transaction) => {
                const customerId = transaction.customer.id;
                let customer = newCustomerdataTransaksion.find(c => c.id === customerId);
                if (!customer) {
                    customer = {
                        ...transaction.customer,
                        transactions: [],
                        transactionCount: 0
                    }
                    newCustomerdataTransaksion.push(customer)
                }

                customer.transactions.push(transaction)
                customer.transactionCount += 1
            })

            console.log(newCustomerdataTransaksion)
            if (res.data.status.code === 200) {
                setDataTransaksi(newCustomerdataTransaksion);
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

    const createTransaction = async (data) => {
        try {
            console.log(data)
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const payload = {
                customerId: data.customerId,
                billDetails: [
                    {
                        product: {
                            id: data.productId
                        },
                        qty: data.Qty
                    }
                ]
            }
            const res = await axiosIntance.post("/bills", payload, { headers })
            if (res.status == 201) {
                toast.success("Transaksi Success!")
                closeModal()
                getTransksi()
            }
            console.log(res)
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

    const toggleDetails = (customer) => {
        // setSelectedDetails([transaksi])
        console.log(customer)
        setModalDetails(true)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-[900px]">
                <CardHeader className="font-semibold justify-between p-2">
                    <h1>Daftar Transaksi</h1>
                    <Button color="primary" variant="shadow" onClick={openSubmit}>Tambah Transaksi <FiCreditCard /></Button>
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
                                dataTranskasi.map((customer, index) => (
                                    <TableRow key={index + 1} className="text-center">
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>
                                            <h1>{customer.name}</h1>
                                            <br />
                                            <h1>{customer.transactionCount} transaksi</h1>
                                        </TableCell>
                                        <TableCell>
                                            <Button color="success" variant="bordered" onClick={() => toggleDetails(customer)}>
                                                Details <FiList />
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
                    <Card className="border-1 p-2 w-[300px] bg-slate-300">
                        <CardHeader className="font-semibold justify-between py-2">
                            <h1>Daftar Transaksi</h1>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <form onSubmit={formInput.handleSubmit(createTransaction)} className="flex flex-col gap-2">
                                <h1>Nama Konsumen</h1>
                                <Controller
                                    name="customerId"
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
                                    name="productId"
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
                <Modal isOpen={modalDetails}
                    onOpenChange={() => setModalDetails(false)}
                    onClose={() => setModalDetails(false)}>
                    <RiwayatTransactions details={selectedDetails} onClose={() => setModalDetails(false)} />
                </Modal>
            </div>
        </div>
    )
}