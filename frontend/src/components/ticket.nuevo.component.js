import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";

import UserService from "../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Requerido!
      </div>
    );
  }
};

export default class TicketNuevo extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeTicket = this.onChangeTicket.bind(this);

    this.state = {
      user: "",
	  info:"",
      ticket: "",
      loading: false,
      message: "",
	  users:[]
    };
  }


componentDidMount() {
	
    UserService.getUsers().then(
      response => {
		  
        this.setState({
          users: response.data
        });
		
		
		
      },
      error => {
        this.setState({
          message:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    )
	
}

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangeTicket(e) {
    this.setState({
      ticket: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
		
		
      UserService.newTicket(this.state.user, this.state.ticket).then(
        (response) => {
			
			this.setState({
				info:response.data
			})
		setTimeout( ()=>{this.props.history.push("/tickets");},2000)
          
          
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
	  
	  
	  const {users} = this.state
    return (
      <div className="col-md-4 mx-auto pt-5">
        <div className="card card-container p-2">
          <h4 className="text-center">Nuevo ticket</h4>

          <Form className="p-3"
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Asignar usuario</label>
              <Select value={this.state.user} onChange={this.onChangeUser} name="user" className="form-control" validations={[required]}>
			   <option value={""}>Seleccione ...</option>
			   
			   { users.map( u => (
			   
					<option key={u.id} value={u.id}>{u.nombre}</option>
			   
			   ))}
			   
				
			  </Select>
            </div>

            <div className="form-group">
              <label htmlFor="ticket">Ticket</label>
              <Textarea
                rows="5"
                className="form-control"
                name="ticket"
                value={this.state.ticket}
                onChange={this.onChangeTicket}
                validations={[required]}
              ></Textarea>
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Guardar ticket</span>
              </button>
            </div>
			{this.state.info && (
              <div className="form-group">
                <div className="alert alert-info" role="alert">
                  {this.state.info}
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}