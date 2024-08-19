import axios from "axios";

class AuthenticationService {
    loginRenter(username, id) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("role", "Renter");
        console.log("Successful login");
    }
  
    loginOwner(username, id) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("role", "Owner");
        console.log("Successful login");
    }
  
    logout() {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    }
  
	loggedInUsername() {
		return sessionStorage.getItem("authenticatedUser");
	}

    loggedInUserId() {
		return sessionStorage.getItem("authenticatedUserId");
	}

    isLoggedIn() {
        return sessionStorage.getItem("role") === "Renter" | "Owner";
    }

    isLoggedInRenter() {
		return sessionStorage.getItem("role") === "Renter";
    }

    isLoggedInOwner() {
        return sessionStorage.getItem("role") === "Owner";
    }

    setUpToken(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        sessionStorage.setItem("token", token);
    }
}

export default new AuthenticationService();