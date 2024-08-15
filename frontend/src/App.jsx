import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/App.css';
import Layout from "./pages/Layout";
import Redirector from "./pages/Redirector";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import Rentals from "./pages/Rentals";
import Rent from "./pages/Rent";
import Properties from "./pages/Properties";
import PropertiesEdit from "./pages/PropertiesEdit";
import NoPage from "./pages/NoPage";

export default function App() {
  	return (
    	<BrowserRouter>
      		<Routes>
        		<Route path="/redirect" element={<Redirector />} />
        		<Route path="/*" element={<NoPage />} />
        		<Route path="/" element={<Layout />}>
          			<Route path="/login" element={<Login />} />
          			<Route path="/register" element={<Register />} />
          			<Route path="/bookings" element={<Bookings />} />
          			<Route path="/rent" element={<Rentals />}>
            			<Route path="/rent/:id" element={<Rent />} />
          			</Route>
          			<Route path="/properties" element={<Properties />}>
            			<Route path="/properties/:id" element={<PropertiesEdit />} />
          			</Route>
        		</Route>
      		</Routes>
    	</BrowserRouter>
  )
}