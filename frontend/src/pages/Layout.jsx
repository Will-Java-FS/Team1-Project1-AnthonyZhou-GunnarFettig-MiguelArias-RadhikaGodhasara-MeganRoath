import { Outlet, Navigate } from "react-router-dom";
import { Heading, Flex } from '@chakra-ui/react'
import Logout from "../components/Logout";

export default function Layout() {
    if (window.location.pathname === "/") {return <Navigate to = '/redirect' />}
    return (
        <>
        <Flex color = "white" bg = "black" w = '100%' h = '80px'>
            <Heading size = '2xl'>Project 1 - Property Booking</Heading>
            <Logout />
        </Flex>

        <Outlet />
        </>
    )
}
