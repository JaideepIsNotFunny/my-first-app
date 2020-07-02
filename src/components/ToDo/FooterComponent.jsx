import React, {Component} from 'react';
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'

import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx"
import ListToDoComponent from "./ListToDoComponent"

class FooterComponent extends Component{
    render(){
        return (
            <div className="footer">
                <span className="text-muted">All rights reserved to Jaideep Sagar &copy;</span>
            </div>
        );
    }
}



export default FooterComponent;