import React, {Component} from 'react';
import "./ToDoApp.css"

import propTypes from "prop-types"
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from "./AuthenticatedRoute.jsx"
import TodoDataService from "../../api/todo/TodoDataService.js"
import TodoComponent from "./TodoComponent"
import moment from 'moment'


class ListToDoComponent extends Component{  // Initial API call should not be done in constructor, the state will not be initialized untill the API call is completed, which s nto a good state to be in
    constructor(props){
        super(props);
        this.state = {
            todos :
            [
                // {id:1,description :"Learn React", done:false, targetDate : new Date},
                // {id:2,description :"Make money", done:false, targetDate : new Date},
                // {id:3,description :"write story", done:false, targetDate : new Date}
            ],
            successMessage : null,
            failureMessage : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }
    componentDidMount(){ // when component is mounted, this method is called 
        
        let username = AuthenticationService.getLoggedInUsername();
        console.log("component did mount")
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                
                console.log(response)
                this.setState({todos:response.data})
            }
        )
    }
    refreshTodos(){
        let username = AuthenticationService.getLoggedInUsername();
        // this.state.successMessage = null;
        // this.state.failureMessage = null;
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                //console.log(response)
                this.setState({todos:response.data})
            }
        )
    }
    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername();
        TodoDataService.deleteTodo(username,id)
        .then(response =>{
                this.setState({successMessage: "Todo deleted succesfully"});             
                this.refreshTodos();
            }
        )
        .catch(
            error => {
                this.setState({failureMessage: "Some error occured"});
                
            }
        )

    }
    completeTodoClicked(todo){

        // let username = AuthenticationService.getLoggedInUsername()
        // TodoDataService.retrieveTodo(username,id)
        // .then(
        //     response => {
        //         let todo = {
        //             id : response.data.id,
        //             username : response.data.username,
        //             description : response.data.description,
        //             targetDate : response.data.targetDate,
        //             done: true
        //         };
            
        //         TodoDataService.updateTodo(username,id,todo)
        //         .then(
        //             () =>{
        //                 this.props.history.push('/todos')
        //                 this.setState({failureMessage: ""});
        //                 this.setState({successMessage: "Completed successfully"});
        //             }
        //         )
        //         .catch(
        //             error =>{
        //                 this.setState({successMessage: ""});
        //                 this.setState({failureMessage: "Some error occured, while updating the todo"});
        //             } 
        //         )
        //     }
        // )
        // .catch(
        //     error =>{
        //         this.setState({successMessage: ""});
        //         this.setState({failureMessage: "Some error occured, while finding the todo"});
        //     }
        // )
        todo.done = true;
        TodoDataService.updateTodo(todo.username,todo.id,todo)
        .then(
            () =>{
                this.props.history.push('/todos')
                this.setState({failureMessage: ""});
                this.setState({successMessage: "Completed successfully"});
                this.refreshTodos();
            }
        )
        .catch(
            error =>{
                this.setState({successMessage: ""});
                this.setState({failureMessage: "Some error occured, while updating the todo"});
            } 
        )
    
    }
    updateTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername();
        this.props.history.push(`/todos/${id}`)
        // TodoDataService.deleteTodo(username,id)
        // .then(response =>{
        //         this.setState({message: "Todo deleted succesfully"});
        //         this.setState({deleteMessageClass: "alert alert-success"})
        //         this.refreshTodos();
        //     }
        // )
        // .catch(
        //     error => {
        //         this.setState({message: "Some error occured"});
        //         this.setState({deleteMessageClass: "alert alert-success"})
        //     }
        // )

    }
    addTodoClicked(id){
        let username = AuthenticationService.getLoggedInUsername();
        this.props.history.push(`/todos/-1`)
       
    }   
    
    render(){
        return (
            <div className="container padding">
                {/*<h2>Welcome {this.props.match.params.name} </h2>*/}
                <h2>Welcome {sessionStorage.getItem('authenticatedUser')} </h2>
                <h3 className='header-todo'>List To Do</h3>
                <div className="container ">
                    <div> 
                        
                        <button className="btn btn-success action-button" onClick={this.addTodoClicked}>Add Task</button>  
                        
                    </div>
                    {this.state.successMessage && <div className="alert alert-success">
                        {this.state.successMessage}
                    </div>}
                    {this.state.failureMessage && <div className="alert alert-danger">
                        {this.state.failureMessage}
                    </div>}
                    <table className="table">
                        <thead >
                            <tr>
                                    <th>Action</th><th>Description</th> <th>Target Date</th> <th>Completed?</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.todos.map(
                                    todo =>
                                    <tr key={todo.id}>
                                        <td>
                                            <button className="btn btn-danger action-button" onClick={() => this.deleteTodoClicked(todo.id)}>Remove</button>
                                             
                                            <button className="btn btn-success action-button"  onClick={() => this.updateTodoClicked(todo.id)}>Update</button> 
                                        </td>
                                        <td>{todo.description}</td><td>{moment(todo.targetDate).format("YYYY-MM-DD").toString()}</td> 
                                        <td>
                                        {todo.done ?<div>done</div> : <button className="btn btn-success action-button" onClick={() => this.completeTodoClicked(todo)}>Complete</button>}
                                        
                                        </td>
                                        
                                    </tr>
                                ) 
                            }                      
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}


export default ListToDoComponent;