import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://tickets-app-test.herokuapp.com/api/auth/";

class AuthService {
	
	
  login(username, pass) {
	  
	  let data = JSON.stringify({
        username,
        pass
    })
	  
    return axios
      .post(API_URL + "signin", data,{ headers:{
            'Content-Type': 'application/json',
	  }})
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username,tipo, email, password) {
    return axios.post(API_URL + "signup", {
      username,
	  tipo,
      email,
      password
    },{ headers: authHeader() });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  
}

export default new AuthService();