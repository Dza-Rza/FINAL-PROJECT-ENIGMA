import { Divider, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, ModalContent, ModalBody } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function RiwayatTransactions({ details }) {

    const [riwayatData, setRiwayatData] = useState([])

    useEffect(() => {
        if (details) {
            formatData = details.map((transaction) => ({
                kodeTransaksi: transaction.id,
                tanggalTransaksi: new Date(transaction.createdAt).toLocaleString(),
                qty: transaction.billDetails.map((detail) => detail.qty),
                paket: transaction.billDetails.map((detail) => detail.product.name),
                totalHarga: transaction.billDetails.map((sum, detail) => sum + (detail.qty * detail.product.price), 0)
            }))
            setRiwayatData(formatData)
        }
    }, [details])

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
                                {riwayatData.map((transaction, index) => (
                                    <TableRow key={index + 1}>
                                        <TableCell>{transaction.kodeTransaksi}</TableCell>
                                        <TableCell>{transaction.tanggalTransaksi}</TableCell>
                                        <TableCell>{transaction.qty}</TableCell>
                                        <TableCell>{transaction.paket}</TableCell>
                                        <TableCell>{transaction.totalHarga}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button color="primary" variant="ghost" onClick={onClose}>Close</Button>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    )
}