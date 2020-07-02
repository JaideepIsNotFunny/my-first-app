import React, {Component} from 'react';
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'

import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import LoginComponent from "./LoginComponent.jsx"
import ListToDoComponent from "./ListToDoComponent"
import LogoutComponent from "./LogoutComponent"
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent"
import WelcomeComponent from "./WelcomeComponent"
import TodoComponent from "./TodoComponent"

class ToDoApp extends Component {
    constructor(){
        super();
    
    }
    render() {
        return (
            <div className="ToDoApp">
                
                 
                 
                <Router className >
                    <HeaderComponent/>
                    <Switch> {/* To select only one route at a time */}
                        <Route path="/login" exact  component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:name" exact  component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/welcome" exact  component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todos/:id"   component={TodoComponent}/>
                        {/*<AuthenticatedRoute path="/todos/:name"  component={ListToDoComponent}/>*/}
                        <AuthenticatedRoute path="/todos"   component={ListToDoComponent}/>
                        <AuthenticatedRoute path="/logout" exact  component={LogoutComponent}/>
                        
                        <Route path="/" exact component={LoginComponent}/>
                        <Route  exact component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
               
                 {/*<LoginComponent/>
                 <WelcomeComponent/>*/}
            </div>
        );
    }
    
}






function ErrorComponent(){
    return (
        <div className="container padding">
            Error Occured.
        </div>
    )
}
export default ToDoApp;