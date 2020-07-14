import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class Tickets extends Component {
  constructor(props) {
    super(props);
 
    this.onDeleteTicket = this.onDeleteTicket.bind(this);
	this.onCompleteTicket = this.onCompleteTicket.bind(this);
    this.state = {
      tickets: [],
	  msg:"",
	  currentUser: undefined
    };
  }


 componentDidMount() {
    UserService.getTickets().then(
      response => {
        this.setState({
          tickets: response.data
        });
      },
      error => {
        this.setState({
          msg:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
	
const user = AuthService.getCurrentUser();
	this.setState({
			currentUser: user
	});
  }

onCompleteTicket(id){
	
	  UserService.completeTicket(id).then(
      response => {
        this.setState({
          msg: response.data
        });
		
		setTimeout( ()=>{ window.location.reload()},2000)
      },
      error => {
        this.setState({
          msg:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
}


onDeleteTicket(id){
	
	  UserService.deleteTicket(id).then(
      response => {
        this.setState({
          msg: response.data
        });
		
		setTimeout( ()=>{ window.location.reload()},2000)
      },
      error => {
        this.setState({
          msg:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
}

 

  render() {
	  
	const {tickets,currentUser,msg} = this.state
	
	const title = currentUser && currentUser.role==="Administrador" ? 'TICKETS' : 'MIS TICKETS'
	
    return (
      <div className="container">
        <header className="jumbotron">
          <h3 className="pb-5"> {title}
		  
		  {currentUser && currentUser.role ==="Administrador" ?
				(<Link to={"/ticket/nuevo"} className="btn btn-primary float-right">Nuevo Ticket +</Link>)
				: (<></>)
		  }
		  
		  </h3>
		  
		  
		  {msg!=="" ? (
		  
			<div className="alert alert-info">{msg}</div>
		  
		  ) : (<></>)}
		  
		  
		  <table className="table table-bordered bg-white text-dark">
		  <tr>
			<td>Asignado a</td>
			<td>Tickets</td>
			<td>Acciones</td>
		  </tr>
		  
		   
		  
			{ tickets.length>0 ? tickets.map( t => (    <tr><td>{t.nombre}</td><td>{t.ticket_pedido}</td><td>
			
			{currentUser && currentUser.role ==="Administrador" ? (
			<>
			<Link to={"/ticket/editar/"+t.id} className="btn btn-sm btn-outline-info" >Editar</Link>  &nbsp;&nbsp;
			
			<a className="btn btn-sm btn-outline-danger" onClick={() => this.onDeleteTicket(t.id)}>Eliminar</a>
			</>
			) : (
			<a className="btn btn-sm btn-outline-primary" onClick={ ()=> this.onCompleteTicket(t.id)}>Marcar como realizado</a>
			)
			
			}
			
			
			</td></tr> ) ) : (<tr><td colspan="3"><b>Sin tickets pendientes</b></td></tr> ) }
			
			
		  </table>
        </header>
      </div>
    );
  }
}