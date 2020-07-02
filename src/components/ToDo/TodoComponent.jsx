import React, {Component} from 'react';
import "./ToDoApp.css"
import moment from 'moment'
import {Formik,Form, Field,ErrorMessage} from 'formik'
import TodoDataService from "../../api/todo/TodoDataService.js"

import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id :this.props.match.params.id,
            description : "learn react",
            targetDate : moment(new Date()).format("YYYY-MM-DD")
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount(){
        if(this.state.id===-1 || this.state.id===0){
            return null;
        }
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveTodo(username,this.state.id)
        .then(
            response => {
                console.log("response : ")
                console.log(response)
                this.setState({
                    description:response.data.description,
                    targetDate:response.data.targetDate
                })
            }
        )
    }
    onSubmit(values){
        let username = AuthenticationService.getLoggedInUsername()
        let todo = {
                id : this.state.id,
                description : values.description,
                targetDate : values.targetDate
            };
        if(this.state.id===-1){
            TodoDataService.createTodo(username,todo)
            .then(
                () =>this.props.history.push('/todos')
            )
            .catch(
                
            )
        }
        else{
            TodoDataService.updateTodo(username,this.state.id,todo)
            .then(
                () =>this.props.history.push('/todos')
            )
            .catch(

            )

        }
       
    }
    validate(values){
        console.log(values);
        let errors = {};
        if(!values.description){
            errors.description = "Enter a description"
        }
        else if(values.description.length <5){
            errors.description = "Description should have atleast 5 characters"
        }
        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Target Date is invalid"
        }
        

        return errors;
    }
    render(){
        let description = this.state.description;
        let targetDate = this.state.targetDate;
        return (
            <div>
                <h1> Todo </h1>
                <div className="container">

                    <Formik 
                        initialValues = {{description, targetDate }} 
                        onSubmit={this.onSubmit} 
                        validate={this.validate} validateOnChange={false} validateOnBlur={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type ="text" name="description"/>
                                    </fieldset>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type ="date" name="targetDate"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success padding">Save</button>
                                </Form>
                            )
                        }

                    </Formik>
                </div>

            </div>
        );
    }
}

export default TodoComponent;