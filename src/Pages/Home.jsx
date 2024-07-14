import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Divider, Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Header() {

    const selector = useSelector(state => state.auth)

    useEffect(() => {
        console.log(selector.userInfo.exp)
    }, [])

    const dispact = useDispatch()
    const navigate = useNavigate()

    const HandleLogOut = () => {
        dispact({ type: "LOGOUT" })
        navigate("/login")
    }

    return (
        <>
            <Navbar className="flex justify-center px-[24px] bg-slate-900 text-background backdrop-blur-xl">
                <NavbarBrand className="font-bold">
                    <h1>Logo</h1>
                </NavbarBrand>
                <NavbarContent className="flex font-mono gap-8 p-4">
                    <NavbarItem>
                        <Link to="products">
                            Produk
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="customers">
                            Customer
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link to="list-transaksi">
                            Transaction
                        </Link>
                    </NavbarItem>
                    {
                        selector.userInfo.role == "admin" ?
                            < NavbarItem >
                                <Link to="/list-transaksi">
                                    User Manajement
                                </Link>
                            </NavbarItem>
                            : null
                    }
                </NavbarContent>
                <NavbarContent className="flex justify-center m-4">
                    <NavbarItem>
                        {
                            selector.token ?
                                <Button color="primary" variant="ghost" onClick={HandleLogOut}>
                                    Log Out <FiLogOut />
                                </Button>
                                : <Button >
                                    Login
                                </Button>
                        }
                    </NavbarItem>
                </NavbarContent>
            </Navbar >
            <Outlet />
            <Divider />
        </>
    )
}