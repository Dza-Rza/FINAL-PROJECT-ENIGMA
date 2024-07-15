import RiwayatTransactions from "./components/Transaksi/RiwayatTransaksi"
import ListTransactions from "./components/Transaksi/listTransaksi"
import Header from "./Pages/Home"
import { Routes, Route } from "react-router-dom"
import RegisterUser from "./Pages/RegisterUser"
import { Toaster } from "sonner"
import CheckAuth from "./hoc/CheckAuth"
import LoginUser from "./Pages/Login"
import Produk from "./components/Produk/Produk"
import Customers from "./components/customers/Customers"
import NotFound from "./components/NotFound"


function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<CheckAuth />}>
          <Route element={<Header />} path="/" >
            <Route element={<ListTransactions />} path="/list-transaksi" />
            <Route element={<RiwayatTransactions />} path="/riwayat-transaksi" />
            <Route element={<Produk />} path="/products" />
            <Route element={<Customers />} path="/customers" />
            <Route element={<NotFound />} path="*" />
          </Route>
        </Route>
        <Route element={<RegisterUser />} path="/register-user" />
        <Route element={<LoginUser />} path="/login" />
      </Routes>
    </>
  )
}

export default App
