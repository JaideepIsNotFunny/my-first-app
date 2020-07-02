import axios from 'axios'
import { API_URL } from '../../Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
class AuthenticationService{

    executeBasicAuthenticationService(username,password){
        return axios.get(`${API_URL}/basicauth`,
            {
                headers : {
                        authorization : this.createBasicAuthToken(username,password)
                }
            }
        
        )
    }
    executeJwtAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`,{
            username,
            password        
        })
    }

    createBasicAuthToken(username,password){
        return 'Basic ' + window.btoa(username + ':' + password) // to encode username and password, in case of basic authentication (no form) we needto encode the credentials
    }
    createJwtToken(token){
        return 'Bearer ' + token
    }

    /*registerSuccessfulLogin(username,password){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        this.setupAxiosInterceptors()
    }*/
    registerSuccessfulLogin(username, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    registerSuccessfulLoginForJwt(username,token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        this.setupAxiosInterceptors(this.createJwtToken(token));
        console.log('registering done')
    }
    

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        console.log("removed from session")
    }
    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null)
            return false 
          
        return true
    }
    getLoggedInUsername(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user===null)
            return null 
          
        return user
    }
    /*setupAxiosInterceptors(){
        let username = 'jaideep';
        let password = 'password';
        let basicAuthHeader = this.createBasicAuthToken(username,password) 

        axios.interceptors.request.use( // we can also intercept response
            (config) =>{
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }*/
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    console.log('interceptor is called')
                    config.headers.authorization = token
                }
                return config
            }
        )
        console.log('interceptor is set')
        console.log(token)
    }
    setupAxiosInterceptorsForJwt(token){
       
       

        axios.interceptors.request.use( // we can also intercept response
            (config) =>{
                if(this.isUserLoggedIn()){

                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()