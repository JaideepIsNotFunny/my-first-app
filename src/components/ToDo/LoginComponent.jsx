import React, {Component} from 'react';
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "jaideep",
            password : "",
            hasLoginFailed : false,
            showSuccessMessage : false
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleAnyChange = this.handleAnyChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        //this.showInvalidCredentials = this.showInvalidCredentials.bind(this)
    }
    handleAnyChange(event){
        console.log(this.state)
        this.setState({
            [event.target.name] : event.target.value // [] to access object related to event.target.name which is username in case of change in username and etc
        });
    }
    handleUsernameChange(event){
        console.log(event.target.value)
        this.setState({
            username : event.target.value
        });
    }
    handlePasswordChange(event){
        console.log(event.target.value)
        this.setState({
            password : event.target.value
        });
    }
    loginClicked(event){
        
        // if(this.state.username === "jaideep" && this.state.password==="pass"){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username)
        //     this.props.history.push(`/welcome/${this.state.username}`) // To route to /welcome url
        //     this.setState({showSuccessMessage:true})
        //     this.setState({hasLoginFailed:false})
        // }
        // else{
            
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }
        
        
        // AuthenticationService
        // .executeBasicAuthenticationService(this.state.username,this.state.password)
        // .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username)
        //         this.props.history.push(`/welcome/${this.state.username}`) // To route to /welcome url            
        //     } 
        // )
        // .catch(() => {
        //         this.setState({showSuccessMessage:false})
        //         this.setState({hasLoginFailed:true})
        //     }
        // )

        AuthenticationService
        .executeJwtAuthenticationService(this.state.username,this.state.password)   // in JWT we dont need  username and password anymore, after first req only token is needed
        .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`) // To route to /welcome url            
            } 
        )
        .catch(() => {
                this.setState({showSuccessMessage:false})
                this.setState({hasLoginFailed:true})
            }
        )
    }
    
    render() {
        return (
            <div className="container padding">
                <h2>Login</h2>
                <table >
                    <tbody>
                    <tr>
                        <td>User Name : </td><td><input type="text" name="username" value={this.state.username} onChange = {this.handleAnyChange}/></td>
                    </tr>
                    <tr>
                        <td>Password : </td><td> <input type="password" name="password" value={this.state.password} onChange = {this.handleAnyChange}/></td>
                    </tr>
                    <tr>
                        <td colSpan='2'><button className="btn btn-success " onClick = {this.loginClicked}>Log In</button></td>
                    </tr>
                    {/*<tr>
                        <td>
                            <ShowMessage hasLoginFailed={this.state.hasLoginFailed} showSuccessMessage={this.state.showSuccessMessage}/>
                        </td>
                    </tr>*/}
                    <tr>
                        <td colSpan='2'>
                            {this.state.hasLoginFailed && !this.state.showSuccessMessage&& <div className="alert alert-warning">Incorrect credentials!!</div>}
                            {this.state.showSuccessMessage &&  <div >2 Correct credentials!!</div>}
                        </td>
                    </tr>
                    </tbody>
                </table>

                
            </div>
        );
    }
}
function ShowMessage(props){
        if(props.hasLoginFailed){
            return <div >Incorrect credentials!!</div>
        }
        else if(props.showSuccessMessage){
            return <div>Correct credentials!!</div>
        }
        else 
            return null;
}

export default LoginComponent;