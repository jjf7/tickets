import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

 

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Bienvenidos al sistema de Tickets. </h3>
		  <div>
			<small>Elaborador por <b>José Fuentes.</b>&nbsp; &nbsp; &nbsp; <a href="https://tupaginaonline.net">https://tupaginaonline.net</a> </small>
		  </div>
        </header>
      </div>
    );
  } 
}