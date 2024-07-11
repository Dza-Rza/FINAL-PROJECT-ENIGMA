// import { Input, Button } from "@nextui-org/react"
// import { useEffect, useState } from "react"
// import { AxiosInstance } from "../lib/axios"
// import { toast } from "sonner"

// export default function Create() {

//     const [wistlist, setWistlist] = useState([])
//     const [wistlistInput, setWistlistInput] = useState("")

//     const fetchWistListItems = async () => {
//         try {
//             const res = await AxiosInstance.get("")

//             setWistlist(res.data)
//         } catch (error) {
//             toast.error("Server error, please wait a momment")
//         }
//     }

//     const addWistlist = async () => {
//         try {
//             await AxiosInstance.post("", {
//                 name: wistlistInput
//             })
//             fetchWistListItems()
//             setWistlistInput("")

//             toast.success("success added a items")
//         } catch (error) {
//             toast.error("Server error, please wait a momment")
//         }
//     }

//     useEffect(() => {
//         fetchWistListItems()
//     }, [])

//     return (
//         <>
//             <div className=" flex justify-center font-bold m-4">
//                 <h1></h1>
//             </div>
//             <div className="flex justify-center font-mono p-4 gap-4">
//                 <Input value={wistlistInput} onChange={(e) => {
//                     setWistlistInput(e.target.value)
//                 }} label="Wistlist-Items" color="secondary" />
//                 <Button type="cange" onClick={addWistlist} color="primary" >Add</Button>
//             </div>
//             <ul className=" text-center justify-center list-decimal list-inside font-semibold">
//                 {wistlist.map((items) => {
//                     return <li>{items.name}</li>
//                 })}
//             </ul>
//         </>
//     )
// }