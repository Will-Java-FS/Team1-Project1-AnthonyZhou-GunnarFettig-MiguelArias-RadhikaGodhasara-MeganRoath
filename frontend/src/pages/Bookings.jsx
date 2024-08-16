import { useState, useEffect } from 'react';
import axios from "axios";
import  { Navigate, Link } from 'react-router-dom'
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
            <h1>Your Bookings</h1>
            <Link to="/rent"><button>Back</button></Link>
            <br/>
            <table>
                <tr>
                    <th>Address</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Status</th>
                    <th>Cancel</th>
                </tr>
                <tbody>
                    {bookings && bookings.map && bookings.map(booking =>
                        <>
                        <tr key = {booking.id}>
                            <th>{booking.property.address}</th>
                            <th>{booking.startDate}</th>
                            <th>{booking.endDate}</th>
                            <th>{booking.status}</th>
                            <th><button onClick = {cancelBooking(booking.id)}>Cancel</button></th>
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