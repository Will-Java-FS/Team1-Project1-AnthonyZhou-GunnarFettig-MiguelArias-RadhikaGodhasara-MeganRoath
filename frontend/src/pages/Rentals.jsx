import { useState, useEffect } from 'react';
import axios from "axios";
import  { Navigate, Link } from 'react-router-dom'
import AuthenticationService from "../components/AuthenticationService";

export default function Rentals() {
    const [rentals, setRentals] = useState();
    useEffect(async () => {
        await axios.get("https://localhost:8000/properties")
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
            <table>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Max Guests</th>
                    <th>Address</th>
                    <th>Rent</th>
                </tr>
                <tbody>
                    {rentals && rentals.map && rentals.map(rental =>
                        <>
                        <tr key = {rental.id}>
                            <th>{rental.title}</th>
                            <th>{rental.description}</th>
                            <th>{rental.maxGuests}</th>
                            <th>{rental.location}</th>
                            <th><Link to={"/rent/" + rental.id}><button>Rent</button></Link></th>
                        </tr>
                        </>
                    )}
                </tbody>
            </table>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}