import { Divider, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, ModalContent, ModalBody, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function RiwayatTransactions({ transDetails }) {

    const [detailsTransaksi, setDetailsTransaksi] = useState()

    useEffect(() => {
        if (transDetails) {
            console.log(transDetails)
            setDetailsTransaksi(transDetails)
        }
    }, [transDetails])

    return (
        <ModalContent className="w-[500px]">
            {(onClose) => (
                <>
                    <ModalBody className="text-center">
                        <h1>Riwayat Transaksi</h1>
                        <Divider />
                        <Table aria-label="Riwayat Transaksi" className="text-center">
                            <TableHeader>
                                <TableColumn>Kode Transaksi</TableColumn>
                                <TableColumn>Tanggal Transaksi</TableColumn>
                                <TableColumn>Qty</TableColumn>
                                <TableColumn>Paket</TableColumn>
                                <TableColumn>Total Harga</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Chip color="success" variant="bordered">
                                            {detailsTransaksi?.id.substring(0, 8)}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(detailsTransaksi?.createdAt).toLocaleDateString(
                                            'id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }
                                        )}
                                    </TableCell>
                                    <TableCell>{detailsTransaksi?.qty}</TableCell>
                                    <TableCell>{detailsTransaksi?.product.name}</TableCell>
                                    <TableCell>{(detailsTransaksi?.price * detailsTransaksi?.qty).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button color="primary" variant="ghost" onClick={onClose}>Close</Button>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    )
}