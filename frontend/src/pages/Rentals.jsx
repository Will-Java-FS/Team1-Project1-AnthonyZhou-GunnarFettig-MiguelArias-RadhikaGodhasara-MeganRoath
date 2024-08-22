import { useState, useEffect } from 'react';
import { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, Button, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react'
import axios from "axios";
import AuthenticationService from "../components/AuthenticationService";

export default function Rentals() {
    const [rentals, setRentals] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/properties")
        .then(response => {
            console.log(response.data);
            if (response.status == 200) {
                setRentals(response.data);
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve rental properties!', error);
        });
    }, [])

    if (AuthenticationService.loggedInUserRole() == "renter") {
        return (
            <>
            <Heading size='lg'>Available properties</Heading>
            <ChakraLink as={ReactRouterLink} to={"/bookings"}><Button>Your Bookings</Button></ChakraLink>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Address</Th>
                            <Th>City</Th>
                            <Th>Zip Code</Th>
                            <Th>State</Th>
                            <Th>Bathrooms</Th>
                            <Th>Bedrooms</Th>
                            <Th>Price</Th>
                            <Th>Description</Th>
                            <Th>Max Guests</Th>
                            <Th>Pets</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rentals && rentals.map && rentals.map(rental =>
                            <>
                            <Tr key = {rental.id}>
                                <Td>{rental.address}</Td>
                                <Td>{rental.city}</Td>
                                <Td>{rental.zipcode}</Td>
                                <Td>{rental.state}</Td>
                                <Td>{rental.bathrooms}</Td>
                                <Td>{rental.bedrooms}</Td>
                                <Td>{rental.price}</Td>
                                <Td>{rental.description}</Td>
                                <Td>{rental.guests}</Td>
                                <Td>{rental.pets ? 'Yes' : 'No'}</Td>
                                <Td><ChakraLink as={ReactRouterLink} to={"/rent/" + rental.id}><Button>Rent</Button></ChakraLink></Td>
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