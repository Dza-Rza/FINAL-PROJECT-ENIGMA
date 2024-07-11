import { Card, CardHeader, CardBody, Divider, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function RiwayatTransactions() {
    return (
        <div className="flex h-[128px] justify-center items-center">
            <Card className="w-[900px]">
                <CardHeader className="font-semibold justify-between">
                    <h1>Riwayat Transaksi</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="text-center font-sans flex justify-between">
                        <h1>Kode Pelanggan</h1>
                        <h1>Tanggal Transaksi</h1>
                        <h1>Paket Laundry</h1>
                        <h1>Qty</h1>
                        <h1>Total Bayar</h1>
                    </div>
                    <div className="flex justify-end">
                        <Button color="warning" variant="bordered">
                            <Link to="/">Close</Link>
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}