import { useState, useEffect } from 'react';
import axios from "axios";
import  { Navigate, Link } from 'react-router-dom'
import AuthenticationService from "../components/AuthenticationService";

export default function Rent() {
    const [rental, setRental] = useState();
    useEffect(async () => {
        await axios.get("https://localhost:8000/properties/" + window.location.pathname)
        .then(response => {
            console.log(response.data);
            if (response.ok) {
                setRental(response.data)
            }
        })
        .catch(error => {
            console.error('Error when attempting to retrieve property id: ' + window.location.pathname, error);
        });
    }, [rental]);

    if (AuthenticationService.isLoggedInRenter()) {
        const rentClicked = async (event) => {
            event.preventDefault();
            await axios.patch("https://localhost:8080/bookings/" + window.location.pathname, {
                username: AuthenticationService.loggedInUsername(),
                startDate: document.getElementById("startDateNew").value,
                endDate: document.getElementById("endDateNew").value,
                numGuests: document.getElementById("numGuestsNew").value 
            })
            .then(response => {
                console.log(response.data);
                if (response.ok) {
                    setRental(response.data)
                }
            })
            .catch(error => {
                console.error('Error updating property!', error);
            });
        }

        // TODO: Display bookings for location and dont allow new overlapping booking
        // TODO: If submit fails show message and/or change colors, etc
        return (
            <>
            <h1>Rent this property</h1>
            <Link to="/rent"><button>Back</button></Link>
            <br/>
            <b>Title:</b><p>{rental.title}</p>
            <br/>
            <b>Description:</b><p>{rental.description}</p>
            <br/>
            <b>Max Guests:</b><p>{rental.maxGuests}</p>
            <br/>
            <b>Address:</b><p>{rental.location}</p>
            <br/>
            <form id = "rentProperty">
                <label for = "startDate"><b>Start Date</b></label>
                <br/>
                <input type = "date" id = "startDateNew" placeholder = "Enter Start Date" name = "startDate" required />
                <br/>
                <label for = "endDate"><b>End Date</b></label>
                <br/>
                <input type = "date" id = "endDateNew" placeholder = "Enter End Date" name = "endDate" required />
                <br/>
                <label for = "numGuests"><b>Max Guests</b></label>
                <br/>
                <input type = "number" id = "numGuestsNew" placeholder = "Enter Number Of Guests" name = "numGuests" min = "1" max = {rental.maxGuests} required />
                <br/>
                <button type = "submit" onClick = {rentClicked}>Rent</button>
            </form>
            </>
        )
    } else {
        return <Navigate to = '/login' />
    }
}