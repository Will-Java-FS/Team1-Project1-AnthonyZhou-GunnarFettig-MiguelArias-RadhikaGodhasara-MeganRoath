import { Outlet, Navigate } from "react-router-dom";
import { Heading, Flex, Spacer } from '@chakra-ui/react'
import Logout from "../components/Logout";

export default function Layout() {
    if (window.location.pathname === "/") {return <Navigate to = '/redirect' />}
    return (
        <>
        <Flex p="5" color = "white" bg = "grey" w = 'full' h = '100px' align="center">
            <Heading size = '2xl'>Project 1 - Property Booking</Heading>
        <Spacer/>
            <Logout />
        </Flex>

        <Outlet />
        </>
    )
}
