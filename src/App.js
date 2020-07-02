import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import "./bootstrap.css"
import FirstComponent from './components/learning-examples/FirstComponent';
import Counter from './components/counter/Counter';
import ToDoApp from './components/ToDo/ToDoApp';


function App() {
  return (
   <div className="App">
      <ToDoApp></ToDoApp>
     
   </div>

  );
}

class LearningComponents extends Component{
  render(){
    return (
      <div className="LearningComponents">
       
      {/*<FirstComponent></FirstComponent>*/}
      </div>
      
   
     );
  }
}

export default App;
