import { useState, useEffect } from 'react';
import { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(async () => {
        await axios.get("https://localhost:8000/bookings")
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                setBookings(response.data.results);
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve bookings!', error);
        });
    }, [bookings]);

    if (AuthenticationService.isLoggedInRenter()) {
        const cancelBooking = async (bookingId, event) => {
            event.preventDefault();
            await axios.delete("https://localhost:8080/bookings/" + bookingId)
            .then(response => {
                console.log(response.data);
                if (response.ok) {
                    setBookings(bookings.filter((value) => value.id != bookingId));
                }
            })
            .catch(error => {
                console.error('Error on booking deletion attempt!', error);
            });
        }

        return (
            <>
            <TableContainer>
                <Heading size='md'>Your Bookings</Heading>
                <ChakraLink as={ReactRouterLink} to="/rent"><Button>Back</Button></ChakraLink>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Address</Th>
                            <Th>Start</Th>
                            <Th>End</Th>
                            <Th>Status</Th>
                            <Th>Cancel</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookings && bookings.map && bookings.map(booking =>
                            <>
                            <Tr key = {booking.id}>
                                <Td>{booking.property.address}</Td>
                                <Td>{booking.startDate}</Td>
                                <Td>{booking.endDate}</Td>
                                <Td>{booking.status}</Td>
                                <Td><Button variant = "link" onClick = {cancelBooking(booking.id)}>Cancel</Button></Td>
                            </Tr>
                            </>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}