import { Card, CardHeader, CardBody, Divider, Button, Input, Select, SelectItem, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z, ZodError } from "zod";

const transaksiFormSchema = z.object({
    customerId: z.string().min(4, "Nama Konsumen tidak boleh kosong"),
    productId: z.string().nonempty("Paket Laundry tidak boleh kosong"),
    Qty: z.coerce.number().min(1, "Qty tidak boleh kosong")
});

import { useEffect, useState } from "react";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";

export default function ListTransactions() {
    const token = useSelector(state => state.auth.token);
    const [dataTransaksi, setDataTransaksi] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [dataProduk, setDataProduk] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const formInput = useForm({
        defaultValues: {
            customerId: "",
            productId: "",
            Qty: ""
        },
        resolver: zodResolver(transaksiFormSchema)
    });

    const getTransaksi = async () => {
        try {
            const response = await axiosIntance.get("/bills", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transactions = response.data.data;

            const newCustomerDataTransaction = [];

            transactions.forEach((transaction) => {
                const customerId = transaction.customer.id;
                let customer = newCustomerDataTransaction.find(c => c.id === customerId);

                if (!customer) {
                    customer = {
                        ...transaction.customer,
                        transactions: [],
                        transactionCount: 0,
                    };
                    newCustomerDataTransaction.push(customer);
                }

                customer.transactions.push(transaction);
                customer.transactionCount += 1;
            });

            setDataTransaksi(newCustomerDataTransaction);
            console.log(newCustomerDataTransaction);
        } catch (error) {
            console.log(error.message);
            toast.error("error");
        }
    };

    const fetchCustomers = async () => {
        try {
            const { data: customerData } = await axiosIntance.get("/customers", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDataCustomer(customerData.data);
        } catch (error) {
            console.log(error);
            toast.error("error");
        }
    };

    const getProduk = async () => {
        try {
            const res = await axiosIntance.get("/products/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status.code === 200) {
                setDataProduk(res.data.data);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("error");
        }
    };

    const createTransaction = async (data) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`
            };
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
            };
            const res = await axiosIntance.post("/bills", payload, { headers });
            if (res.status === 201) {
                toast.success("Transaksi Berhasil!");
                closeModal();
                getTransaksi();
            }
            console.log(res);
        } catch (error) {
            console.log(error.message);
            toast.error("error");
        }
    };

    useEffect(() => {
        getTransaksi();
        getProduk();
        fetchCustomers();
    }, []);

    useEffect(() => {
        console.log(dataTransaksi);
    }, [dataTransaksi]);

    const openSubmit = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

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
                            {dataTransaksi.map((customer, index) => (
                                <TableRow key={index + 1} className="text-center">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>
                                        <h1>{customer.name}</h1>
                                        <br />
                                        <h1>{customer.transactionCount} transaksi</h1>
                                    </TableCell>
                                    <TableCell>
                                        <Button>
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
            <div className="flex justify-center items-center">
                {openModal && (
                    <Card className="border-1 p-2 w-[300px] bg-slate-100">
                        <CardHeader className="font-semibold justify-between py-2">
                            <h1>Tambah Transaksi</h1>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <form onSubmit={formInput.handleSubmit(createTransaction)} className="flex flex-col gap-2">
                                <h1>Nama Konsumen</h1>
                                <Controller
                                    name="customerId"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => (
                                        <Select {...field} variant="bordered" placeholder="Nama Konsumen" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message}>
                                            {dataCustomer.map((customer) => (
                                                <SelectItem variant="bordered" color="primary" className="bg-slate-100 text-center" key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <h1>Pilih Paket Laundry</h1>
                                <Controller
                                    name="productId"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => (
                                        <Select {...field} variant="bordered" placeholder="Paket Laundry" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message}>
                                            {dataProduk.map((produk) => (
                                                <SelectItem variant="bordered" color="primary" className="bg-slate-100 text-center" key={produk.id} value={produk.id}>
                                                    {produk.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <h1>Qty (Kg)</h1>
                                <Controller
                                    name="Qty"
                                    control={formInput.control}
                                    render={({ field, fieldState }) => (
                                        <Input {...field} type="number" variant="bordered" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} />
                                    )}
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
    );
}