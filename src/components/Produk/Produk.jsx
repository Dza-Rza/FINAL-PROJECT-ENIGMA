import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Card, CardHeader, CardBody, CardFooter, Input, Modal } from "@nextui-org/react";
import { axiosIntance } from "../../lib/axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import EditProduk from "./EditProduk";
import { FiEdit, FiFolderPlus, FiPlus, FiPlusSquare, FiTrash2 } from "react-icons/fi";

export default function Produk() {

    const tokenApps = useSelector(state => state.auth.token)

    const [dataProduk, setDataProduk] = useState([])
    const [createProduk, setCreateProduk] = useState({
        "id": "",
        "name": "",
        "price": 0,
        "type": ""
    })
    const [modalUpdate, setModalUpdate] = useState(false)
    const [create, setCreate] = useState(false)
    const [selectedProduk, setSelectedProduk] = useState(null)

    const fetchProduk = async () => {
        try {

            // console.log(tokenApps)
            const { data: produkdata } = await axiosIntance.get(
                "/products",
                { headers: { Authorization: `Bearer ${tokenApps}` } }
            )
            setDataProduk(produkdata.data)
            // console.log("dataresponse", produkdata.data)
        } catch (error) {
            console.log(error)
            toast.error("server error")
        }
    }

    useEffect(() => {
        fetchProduk()
    }, [])

    useEffect(() => {
        console.log(createProduk)
    }, [createProduk])

    const handleValueCreate = (typeData, value) => {
        if (typeData === "id") {
            setCreateProduk(prevalue => ({ ...prevalue, id: value }))
        } else if (typeData === "namaproduk") {
            setCreateProduk(prevalue => ({ ...prevalue, name: value }))
        } else if (typeData === "priceproduk") {
            setCreateProduk(prevalue => ({ ...prevalue, price: + value }))
        } else if (typeData === "typeproduk") {
            setCreateProduk(prevalue => ({ ...prevalue, type: value }))
        }

        // console.log(createProduk)
    }

    const deleteProduk = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${tokenApps}`,
            };
            const result = await axiosIntance.delete(`/products/${id}`, { headers });
            if (result.status === 204) {
                toast.success("success")
                fetchProduk()
            }
        } catch (error) {
            console.log(error.message);
            toast.error("error")
        }
    }

    const addProdukData = async () => {
        try {
            const { data: res } = await axiosIntance.post("/products", createProduk, { headers: { Authorization: `Bearer ${tokenApps}` } })
            const newData = res.data
            setDataProduk(prevData => ([...prevData, newData]))
        } catch (error) {
            console.log(error)
        }
    }

    const openModalUpdate = (produk) => {
        setModalUpdate(true)
        setSelectedProduk(produk)
    }

    const addProduk = () => {
        setCreate(true)
    }
    const CloseAddProduk = () => {
        setCreate(false)
    }

    return (
        <>
            <div className="flex p-4 flex-col items-center justify-center">
                {create && (
                    <div className="h-screen fixed w-[85%] bg-mute z-20">
                        <div className="flex justify-center items-center h-full">
                            <Card className="w-[300px] border-1 p-2 bg-white">
                                <CardBody onSubmit={addProdukData}>
                                    <h1>Nama</h1>
                                    <Input value={createProduk.name} onChange={(e) => {
                                        handleValueCreate("namaproduk", e.target.value)
                                    }} />
                                    <h1>Price</h1>
                                    <Input value={createProduk.price} onChange={(e) => {
                                        handleValueCreate("priceproduk", e.target.value)
                                    }} />
                                    <h1>Type</h1>
                                    <Input value={createProduk.type} onChange={(e) => {
                                        handleValueCreate("typeproduk", e.target.value)
                                    }} />
                                    <CardFooter className="justify-end">
                                        <Button color="danger" variant="ghost" onClick={CloseAddProduk}>Close</Button>
                                        <Button type="submit" color="success" variant="ghost" onClick={addProdukData}>Create</Button>
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                )}
                <div className="flex gap-[41rem]">
                    <h1>List Produk</h1>
                    <Button onClick={addProduk} color="primary" variant="shadow">Create<FiPlus /></Button>
                </div>
                <Table
                    className="text-center w-[64rem]"
                    aria-label="Example table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>PRICE</TableColumn>
                        <TableColumn>TYPE</TableColumn>
                        <TableColumn>EDIT</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {dataProduk.map((data) => {
                            return (
                                <TableRow key={"produk" + data.id}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.price}</TableCell>
                                    <TableCell>{data.type}</TableCell>
                                    <TableCell>
                                        <Button color="warning" variant="bordered" onClick={() => openModalUpdate(data)}>Edit<FiEdit /></Button>
                                        <Button color="danger" variant="bordered" onClick={() => deleteProduk(data.id)}>hapus<FiTrash2 /></Button>
                                    </TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
                <Modal
                    isOpen={modalUpdate}
                    onOpenChange={() => setModalUpdate(false)}
                    onClose={() => setModalUpdate(false)}
                >
                    <EditProduk produk={selectedProduk} handleFetchProduk={fetchProduk} />
                </Modal>
            </div>
        </>
    );
}
