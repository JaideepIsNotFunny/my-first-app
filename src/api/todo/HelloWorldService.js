import axios from 'axios'


class HelloWorldService{
    executeHelloWorldService(){
        return axios.get("http://localhost:8080/restful-web-services/hello-world"); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    executeHelloWorldBeanService(){
        return axios.get("http://localhost:8080/restful-web-services/hello-world-bean"); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    executeHelloWorldPathVariableService(name){
        // let username = 'jaideep';
        // let password = 'password';
       
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password) // to encode username and password
        return axios.get(`http://localhost:8080/restful-web-services/hello-world/path-variable/${name}`
        // ,
        //     {
        //         headers : {
        //             authorization : basicAuthHeader
        //         }
        //     }
    
        ); // we are returning the Promise back, and WelcomeComponent will decide what to do if it is successfull / unsuccessfull
       // console.log("Executed")
    }
    
}

export default new HelloWorldService();