import { Card, CardBody, CardFooter } from "@nextui-org/react";

export default function EditCustomers() {
    return (
        <div className="flex items-center justify-center">
            <Card className="w-[250px]">
                <CardBody className="gap-2">
                    <h1>Nama</h1>
                    <Input />
                    <h1>Phone Number</h1>
                    <Input />
                    <h1>Address</h1>
                    <Input />
                    <CardFooter className="flex justify-end gap-2">
                        <Button color="danger" variant="ghost" >Close</Button>
                        <Button color="success" variant="ghost">Create</Button>
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    )
}