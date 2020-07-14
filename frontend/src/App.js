import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Tickets from "./components/tickets.component";
import TicketNuevo from "./components/ticket.nuevo.component";
import TicketEdit from "./components/ticket.edit.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
     currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser} = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Tickets App
            </Link>
            <div className="navbar-nav mr-auto">
              
              {currentUser && (
			   
                <li className="nav-item">
                  <Link to={"/tickets"} className="nav-link btn-outline-info bg-warning text-success font-weight-bold">
                    Tickets
                  </Link>
                </li>
				 
              )}
			  
			  {currentUser && currentUser.role ==="Administrador" ?
				(<li className="nav-item">
                  <Link to={"/registro"} className="nav-link bg-info text-white">
                    Nuevo usuario
                  </Link>
                </li>)
				: (<></>)
				} 
			  
			  
			  
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                
				
				<li className="nav-item">
                  <Link to={"/perfil"} className="nav-link text-white">
                   <small>Bienvenid@</small> {currentUser.nombre}
                  </Link>
                </li>
				
				
				
                <li className="nav-item">
                  <a href="/login" className="nav-link text-white" onClick={this.logOut}>
                   |  Salir
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link text-white">
                    Login
                  </Link>
                </li>

               
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registro" component={Register} />
              <Route exact path="/perfil" component={Profile} />
              <Route exact path="/tickets" component={Tickets} />
			  <Route exact path="/ticket/nuevo" component={TicketNuevo} />
			  <Route exact path="/ticket/editar/:id" component={TicketEdit} />
             
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;