import { Outlet, Navigate } from "react-router-dom";
import { Heading } from '@chakra-ui/react'
import Logout from "../components/Logout";

export default function Layout() {
    if (window.location.pathname === "/") {return <Navigate to = '/redirect' />}
    return (
        <>
        <nav>
            <Heading>Project 1 - Property Booking</Heading>
            <Logout />
        </nav>

        <Outlet />
        </>
    )
}
