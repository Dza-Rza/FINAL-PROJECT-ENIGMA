import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, Modal, useDisclosure, ModalContent } from "@nextui-org/react";
import CreateCustomers from "./CreateCustomers";
import { axiosIntance } from "../../lib/axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";


export default function Customers() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [dataCustomers, setDataCustomers] = useState([])
    const [newDataCustomers, setNewDataCustomers] = useState()

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
            toast.error("error asu")
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <>
            <div className="flex text-balance p-4 flex-col items-center justify-center">
                <div className="flex gap-[41rem]">
                    <h1>List Customer</h1>
                    <Button onPress={onOpen} color="primary" variant="bordered">Create</Button>
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
                                    <TableCell><Button color="warning" variant="flat">edit</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    
                        <CreateCustomers />
                    
                </Modal>

            </div>
        </>
    )
}

