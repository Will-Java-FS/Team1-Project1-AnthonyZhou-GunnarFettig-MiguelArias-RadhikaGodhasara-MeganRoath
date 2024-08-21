import axios from "axios";

class AuthenticationService {
    loginRenter(username, id) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("role", "renter");
        console.log("Successful renter login");
    }

    loginOwner(username, id) {
        sessionStorage.setItem("authenticatedUser", username);
        sessionStorage.setItem("authenticatedUserId", id);
        sessionStorage.setItem("role", "owner");
        console.log("Successful owner login");
    }

    logout() {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.clear();
        sessionStorage.clear();
    }

	loggedInUsername() {
		return sessionStorage.getItem("authenticatedUser");
	}

    loggedInUserId() {
		return sessionStorage.getItem("authenticatedUserId");
	}

    isLoggedIn() {
        return sessionStorage.getItem("role") === ("renter" || "owner");
    }

    isLoggedInRenter() {
		return sessionStorage.getItem("role") === "renter";
    }

    isLoggedInOwner() {
        return sessionStorage.getItem("role") === "owner";
    }

    setUpToken(token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        sessionStorage.setItem("token", token);
    }

    axiosToken() {
        axios.defaults.headers.common["Authorization"] = "Bearer " +
                                    sessionStorage.getItem("token");
    }
}

export default new AuthenticationService();