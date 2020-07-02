import axios from 'axios'
import { API_URL, JPA_API_URL, MYSQL_API_URL } from '../../Constants.js'
class TodoDataService{
    retrieveAllTodos(name){
        console.log( axios.interceptors.request);
        return axios.get(`${MYSQL_API_URL}/users/${name}/todos`); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    retrieveTodo(name,id){
        return axios.get(`${MYSQL_API_URL}/users/${name}/todos/${id}`); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    deleteTodo(name,id){
        return axios.delete(`${MYSQL_API_URL}/users/${name}/todos/${id}`); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    
    updateTodo(name,id,todo){
        return axios.put(`${MYSQL_API_URL}/users/${name}/todos/${id}`,todo); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    createTodo(name,todo){
        return axios.post(`${MYSQL_API_URL}/users/${name}/todos`,todo); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
   
}

export default new TodoDataService();