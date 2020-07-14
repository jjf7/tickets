import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://tickets-app-test.herokuapp.com/api/';

class UserService {
	
	completeTicket(id){
		return axios.get(API_URL + 'tickets/complete/'+id, { headers: authHeader() });    
	}
	
	getTickets() {
    return axios.get(API_URL + 'tickets', { headers: authHeader() });
	}
  
	newTicket(user,ticket){
		return axios.post(API_URL + 'tickets', {
		  user,
		  ticket
		  
		}, { headers: authHeader() });  
	}
  
	getUsers() {
		return axios.get(API_URL + 'auth/users', { headers: authHeader() });
	}
  
	deleteTicket(id){
		return axios.delete(API_URL + 'tickets'+'/'+id, { headers: authHeader() });    
	}
  
	getTicket(id){
		return axios.get(API_URL + 'tickets'+'/'+id, { headers: authHeader() });    
	}
	
	updateTicket(id,user,ticket){
		return axios.put(API_URL + 'tickets'+'/'+id, {user,ticket}, { headers: authHeader() });    
	}
	
	

  
}

export default new UserService();