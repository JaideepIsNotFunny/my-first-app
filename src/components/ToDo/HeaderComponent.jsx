import React, {Component} from 'react';
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import { withRouter } from "react-router";

import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx"
import ListToDoComponent from "./ListToDoComponent"


class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return (
                
                <header >
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        
                            <a className="navbar-header navbar-brand">
                                My ToDo Application
                            </a>
                           
                            <ul className="navbar-nav">
                                {isUserLoggedIn && <li> <Link to="/welcome/"  className="nav-link">Home</Link></li>}
                                {isUserLoggedIn && <li> <Link to="/todos"  className="nav-link" >ToDo's</Link></li>}
                            </ul>
                            
                            <ul className="navbar-nav navbar-collapse justify-content-end">
                                {(!isUserLoggedIn) && <li><Link to="/login"  className="nav-link" >Log In</Link></li>}
                                {isUserLoggedIn && <li><Link to="/logout"  className="nav-link" onClick={AuthenticationService.logout   }>Log Out</Link></li>}
                            </ul>
                         
                    </nav>
                    
                </header>
                
                
            
        );
    }
}


export default withRouter(HeaderComponent);