import { Outlet, Navigate } from "react-router-dom";
import Logout from "../components/Logout";

export default function Layout() {
    if (window.location.pathname === "/") {return <Navigate to = '/redirect' />}
    return (
        <>
        <nav>
            <h1>Project 1 - Property Booking</h1>
            <Logout />
        </nav>

        <Outlet />
        </>
    )
}
