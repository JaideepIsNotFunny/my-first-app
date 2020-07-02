import React, {Component} from 'react';
import "./Counter.css"
import propTypes from "prop-types"



class Counter extends Component {
    constructor(){
        super();
        this.state = {
            counter : 0,
            
        }

       this.increment  = this.increment.bind(this); // we are binding this with all functions, except an arrow method
       this.decrement  = this.decrement.bind(this);
       this.reset  = this.reset.bind(this);
    }
    render() {
        return (
        <div className="App">
            <CounterButton incrementMethod = {this.increment} decrementMethod = {this.decrement}></CounterButton>
            <CounterButton by={2} incrementMethod = {this.increment} decrementMethod = {this.decrement}></CounterButton>
            <CounterButton by={3} incrementMethod = {this.increment} decrementMethod = {this.decrement}></CounterButton>
            
            <button className="reset" onClick={this.reset}>Reset</button> <br></br>
            <span className = "result"> {this.state.counter}</span>
        </div>
    );
    }
    increment(by){
        //this.state.counter ++; //bad practise
        /*this.setState({ // setState merges the updated values
            counter : this.state.counter + by
        })*/
        this.setState(
            (prevState) => {
                return {counter : prevState.counter + by}
            }
        );
    }
    decrement(by){
        //this.state.counter ++; //bad practise
        /*this.setState({ // setState merges the updated values
            counter : this.state.counter + by
        })*/
        this.setState(
            (prevState) => {
                return {counter : prevState.counter - by}
            }
        );
    }
    reset(){
        this.setState(
            () => {
                return {counter : 0}
            }
        );
    }
}




class CounterButton extends Component{
    constructor(){
        super();
    //     this.state = {
    //         counter : 0,
    //         secondCounter : 100
    //     }

    //    this.increment  = this.increment.bind(this); // we are binding this with all functions, except an arrow method
    //    this.decrement  = this.decrement.bind(this);
    }
  
    render(){
        let inlineStyle = {color : "green"};
        // to learn inline CSS
        /*return (
        <div className="Counter">
            <h1>Counter</h1>
            <button className="number-button" onClick={this.increment}>+1</button>
            <span className="result">{this.state.counter}</span>
            <span className="result">{this.state.secondCounter}</span>
            <span style={{color : "blue"}}> Inline CSS in JSX </span>
            <span style={inlineStyle}> Inline CSS in JSX with variable</span>
        </div>
        );*/

        return (
        <div className="Counter">
            
            <button className="number-button" onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
            <button className="number-button" onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            
            
        </div>
        );
    }
    // increment(){
    //     //this.state.counter ++; //bad practise
    //     this.setState({ // setState merges the updated values
    //         counter : this.state.counter + this.props.by
    //     })
    //     this.props.incrementMethod(this.props.by);
    // }
    // decrement(){
    //     //this.state.counter ++; //bad practise
    //     this.setState({ // setState merges the updated values
    //         counter : this.state.counter - this.props.by
    //     })
    //     this.props.decrementMethod(this.props.by);
    // }
    
}

CounterButton.defaultProps = {
    by : 1
}
CounterButton.propTypes = {
    by : propTypes.number
}

export default Counter;
