import  { Navigate } from 'react-router-dom'
import AuthenticationService from "../components/AuthenticationService";

export default function Redirector() {
    if (AuthenticationService.isLoggedInRenter()) {return <Navigate to = '/rent' />}
    else if (AuthenticationService.isLoggedInOwner()) {return <Navigate to = '/properties' />} 
    else {return <Navigate to = '/login' />}
}