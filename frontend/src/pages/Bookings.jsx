import { useState, useEffect } from 'react';
import { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Heading, Flex, Box, VStack } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        AuthenticationService.axiosToken();
        axios.get("http://localhost:8080/bookings")
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                setBookings(response.data.filter((value) => value.guestId == AuthenticationService.loggedInUserId()));
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve bookings!', error);
        });
    }, []);

    if (AuthenticationService.loggedInUserRole() == "renter") {
        const cancelBooking = async (event, bookingId) => {
            event.preventDefault();
            await axios.delete("http://localhost:8080/bookings/" + bookingId)
            .then(response => {
                console.log(response.data);
                if (response.status == 200) {
                    setBookings(bookings.filter((value) => value.bookingId != bookingId));
                }
            })
            .catch(error => {
                console.error('Error on booking deletion attempt!', error);
            });
        }

        return (
            <Flex width="full" align="center" justifyContent="center">
                <VStack>
                    <Box p="3" align="center">
                        <Heading size='lg'>Your Bookings</Heading>
                        <br/>
                        <ChakraLink as={ReactRouterLink} to="/rent"><Button>Back</Button></ChakraLink>
                    </Box>
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Start</Th>
                                    <Th>End</Th>
                                    <Th>Status</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {bookings && bookings.map && bookings.map(booking =>
                                    <>
                                    <Tr key = {booking.bookingId}>
                                        <Td>{booking.startDate}</Td>
                                        <Td>{booking.endDate}</Td>
                                        <Td>{booking.status}</Td>
                                        <Td><Button variant = "link" onClick = {(e) => {cancelBooking(e, booking.bookingId)}}>Cancel</Button></Td>
                                    </Tr>
                                    </>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>
            </Flex>
        )
    } else {
        return <Navigate to = '/login' />
    }
}