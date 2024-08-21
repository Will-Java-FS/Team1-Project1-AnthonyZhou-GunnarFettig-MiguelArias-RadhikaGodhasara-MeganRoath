import  { Navigate } from 'react-router-dom'
import AuthenticationService from "../components/AuthenticationService";

export default function Redirector() {
    if (AuthenticationService.loggedInUserRole() == "renter") {return <Navigate to = '/rent' />}
    else if (AuthenticationService.loggedInUserRole() == "owner") {return <Navigate to = '/properties' />} 
    else {return <Navigate to = '/login' />}
}