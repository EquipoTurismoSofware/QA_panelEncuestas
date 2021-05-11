import React, { Component } from "react";
//import logo from './logo.svg';
import './App.css';
import Login from "Login";
import Admin from "./views/Dashboard/Dashboard";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: false
		};
		this.handleOkauth = this.handleOkauth.bind(this);
		this.handleLogAuth = this.handleLogAuth.bind(this);
	}

	componentDidMount() {
		if("CeProATurToken" in localStorage) {
			if(localStorage.getItem("CeProATurToken").length > 0) {
				this.setState({auth: true});
			}
		}
	}
  
	componentWillUnmount() {
		//localStorage.clear();
  	}

	handleOkauth = () => {
		//localStorage.setItem("WebTurToken", "Asdad");
		this.setState({auth: true});
	}

	handleLogAuth = () => {
		this.setState({auth: false});
	}

	render() {
		const auth = this.state.auth;
		return (
			<div className="App">
				{
					auth ?
					<Admin logout={this.handleLogAuth} />
					:
					<Login ok={this.handleOkauth} />
				}
			</div>
		);
	}
}

export default App;
