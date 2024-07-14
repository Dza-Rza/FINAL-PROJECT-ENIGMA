import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Card, CardHeader, CardBody, CardFooter, Input, Modal } from "@nextui-org/react";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import EditCustomers from "./EditCustomers";
import { FiEdit, FiPlusSquare, FiTrash2 } from "react-icons/fi";


export default function Customers({ value, }) {

    const [modalCreate, setModalcreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [dataCustomers, setDataCustomers] = useState([])
    const [selected, setSelected] = useState({
        id: "",
        name: "",
        phoneNumber: "",
        address: ""
    })

    const handleUpdate = (customer) => {
        setModalUpdate(true)
        setSelectedCustomer(customer);
    }

    useEffect(() => {
        if (value) {
            setSelected({
                id: value.id,
                name: value.name,
                phoneNumber: value.phoneNumber,
                address: value.address
            })
        }
    }, [value])

    const toggleCreate = () => {
        setModalcreate(true)
    }
    const closeCreate = () => {
        setModalcreate(false)
    }
    const token = useSelector(state => state.auth.token)
    const FormCustomers = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: ""
        }
    })

    const AuthCustomers = useSelector((state) => state.auth.token)

    const fetchCustomers = async () => {
        try {

            // console.log(AuthCustomers)
            const { data: customerData } = await axiosIntance.get(
                `/customers`,
                { headers: { Authorization: `Bearer ${AuthCustomers}` } }
            )
            setDataCustomers(customerData.data)
        } catch (error) {
            console.log(error)
            toast.error("error")
        }
    }

    const addCustomers = async (data) => {
        try {

            const res = await axiosIntance.post("/customers", {
                ...data
            }, { headers: { Authorization: `Bearer ${token}` } })
            console.log(res.data)
            // console.log(token)
            if (res.data.status.code === 201) {
                toast.success("success")
                fetchCustomers()

            }
        } catch (error) {
            console.log(error)
            toast.error("error")
        }
    }

    const handleDelete = async (id) => {
        try {

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const result = await axiosIntance.delete(`/customers/${id}`, { headers });
            if (result.status === 204) {
                toast.success("success")
                fetchCustomers()
            }
        } catch (error) {
            console.log(error.message);
            toast.error("error")
        }
    }



    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <>
            <div className="flex mt-4 flex-col items-center justify-center z-50">
                {modalCreate && (
                    <div className="h-screen fixed w-[85%] bg-mute z-20">
                        <div className="flex justify-center items-center h-full">
                            <Card className="w-[300px] border-1 p-2 bg-white gap-2">
                                <CardHeader className="justify-center">
                                    <h1>New Custumers</h1>
                                </CardHeader>
                                <CardBody>
                                    <form onSubmit={FormCustomers.handleSubmit(addCustomers)} className="gap-4">
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
                                        <CardFooter className="justify-end gap-2 mt-2">
                                            <Button color="danger" variant="ghost" onPress={closeCreate}>Close</Button>
                                            <Button type="submit" color="success" variant="ghost">Save</Button>
                                        </CardFooter>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                )}
                <div className="flex gap-[41rem]">
                    <h1>List Customer</h1>
                    <Button onClick={toggleCreate} color="primary" variant="shadow">Create<FiPlusSquare /></Button>
                </div>

                <Table
                    className="text-center w-[64rem]"
                    aria-label="Customers Table">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>PHONE NUMBER</TableColumn>
                        <TableColumn>ADDRESS</TableColumn>
                        <TableColumn>EDIT</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {dataCustomers.map((customers, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{customers.name}</TableCell>
                                    <TableCell>{customers.phoneNumber}</TableCell>
                                    <TableCell>{customers.address}</TableCell>
                                    <TableCell>
                                        <div className="gap-4">
                                            <Button onClick={() => handleUpdate(customers)} color="warning" variant="ghost">Edit <FiEdit /> </Button>
                                            <Button onClick={() => handleDelete(customers.id)} color="danger" variant="ghost">Delete<FiTrash2 /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Modal isOpen={modalUpdate}
                    onOpenChange={() => setModalUpdate(false)}
                    onClose={() => setModalUpdate(false)}>
                    <EditCustomers customer={selectedCustomer} handleFetchData={fetchCustomers} />
                </Modal>
            </div>
        </>
    )
}

