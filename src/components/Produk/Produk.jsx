import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, Card, CardHeader, CardBody, CardFooter, Input } from "@nextui-org/react";
import { axiosIntance } from "../../lib/axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function Produk() {

    const tokenApps = useSelector(state => state.auth.token)

    const [dataProduk, setDataProduk] = useState([])
    const [createProduk, setCreateProduk] = useState({
        "name": "",
        "price": 0,
        "type": ""
    })
    const [openTable, setOpenTable] = useState(false)
    const [create, setCreate] = useState(false)

    const fetchProduk = async () => {
        try {

            console.log(tokenApps)
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
        // setCreateProduk(prevalue => ({ ...prevalue, type: value }))
        if (typeData === "namaproduk") {
            setCreateProduk(prevalue => ({ ...prevalue, name: value }))
        } else if (typeData === "priceproduk") {
            setCreateProduk(prevalue => ({ ...prevalue, price: + value }))
        } else if (typeData === "typeproduk") {
            setCreateProduk(prevalue => ({ ...prevalue, type: value }))
        }

        console.log(createProduk)
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

    const postProduk = () => {
        fetchProduk
    }

    const open = () => {
        setOpenTable(true)
    }

    const close = () => {
        setOpenTable(false)
    }

    const addProduk = () => {
        setCreate(true)
    }
    const CloseAddProduk = () => {
        setCreate(false)
    }

    return (
        <>
            <div className="flex mt-8 p-4 flex-col items-center justify-center">
                {create && (
                    <div className="h-screen fixed w-[85%] bg-mute z-20">
                        <div className="flex justify-center items-center h-full">
                            <Card className="w-[300px] border-1 p-2 bg-white">
                                <CardBody className="gap-2">
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
                                    <CardFooter className="flex justify-end gap-2">
                                        <Button color="danger" variant="ghost" onClick={CloseAddProduk}>Close</Button>
                                        <Button color="success" variant="ghost" onClick={addProdukData}>Create</Button>
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                )}
                {openTable && (
                    <div className="h-screen fixed w-[300px] bg-mute z-20">
                        <div className="flex justify-center items-center h-full">
                            <Card className="bg-white">
                                <CardHeader className="justify-center">
                                    <h1>Hello World!</h1>
                                </CardHeader>
                                <CardBody>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam odio excepturi ex reprehenderit in maiores ratione suscipit sint, impedit incidunt.</p>
                                </CardBody>
                                <CardFooter className="justify-end gap-2">
                                    <Button color="danger" variant="ghost" onClick={close}>Close</Button>
                                    <Button color="success" variant="ghost">Save</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )}
                <div className="flex gap-[41rem]">
                    <h1>List Customer</h1>
                    <Button onClick={addProduk} color="primary" variant="bordered">Create</Button>
                </div>
                <Table
                    className="text-center w-[64rem]"
                    aria-label="Example table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>PRICE</TableColumn>
                        <TableColumn>TYPE</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {dataProduk.map((data) => {
                            return (
                                <TableRow key={"produk" + data.id}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.type}</TableCell>
                                    <TableCell>
                                        <Button color="warning" variant="bordered" onClick={open}>...</Button>
                                    </TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-center items-center">

            </div>
            <div>

            </div>
        </>
    );
}
