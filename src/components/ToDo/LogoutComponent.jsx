import React, {Component} from 'react';
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'

import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx"
import ListToDoComponent from "./ListToDoComponent"



class LogoutComponent extends Component{
    render(){
        return (
            <div className="container padding">
                <h2>You are logged out</h2>
                <div className="container">
                    Thank you for using our app. 
                </div>
            </div>
        );
    }
}

export default LogoutComponent;