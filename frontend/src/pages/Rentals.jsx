import { useState, useEffect } from 'react';
import { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button, TableContainer, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Rentals() {
    const [rentals, setRentals] = useState([]);
    useEffect(async () => {
        await axios.get("https://localhost:8080/properties")
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                setRentals(response.data.results);
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve rentals!', error);
        });
    }, [rentals]);

    if (AuthenticationService.isLoggedInRenter()) {
        return (
            <>
            <h1>Available properties</h1>
            <br/>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Description</Th>
                            <Th>Max Guests</Th>
                            <Th>Address</Th>
                            <Th>Rent</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rentals && rentals.map && rentals.map(rental =>
                            <>
                            <Tr key = {rental.id}>
                                <Th>{rental.description}</Th>
                                <Th>{rental.maxGuests}</Th>
                                <Th>{rental.location}</Th>
                                <Th><ChakraLink as={ReactRouterLink} to={"/rent/" + rental.id}><Button>Rent</Button></ChakraLink></Th>
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