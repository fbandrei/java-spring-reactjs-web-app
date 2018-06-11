import React from "react";

import {Dummy} from './Dummy';

class Test extends React.Component {

    constructor() {
        super();
        this.state = {
            hello : "Hello World!",
            status: 0
        }
        setTimeout(() => {
            this.setState({
                status: 1
            })
        }, 5000)
    }

    onGreet() {
        alert("Hello to you!");
    }


    onChangeHelloWorld(newHelloWorld) {
        this.setState({
            hello : newHelloWorld
        })
    }

    render() {
        return(
            <div>
                <h1 className={"text-center"}>{this.state.hello}</h1>
                <p></p>
                <p className={"text-center"}>Status: {this.state.status}</p>
                <Dummy
                    companyName={"SYMW"}
                    age={10} greet={this.onGreet}
                    initialHelloWorld={"Hello"}
                    changeHelloWorld={this.onChangeHelloWorld.bind(this)}>
                    <p>Spend your money wisely</p>
                </Dummy>

            </div>
        );
    }

    // Right before the initial rendering
    componentWillMount() {
        console.log("Component will mount.");
    }

    // Right after initial rendering
    componentDidMount() {
        console.log("Component did mount.");
    }

    // When component receive new props.
    componentWillReceiveProps(nextProps) {
        console.log("Component will receive props.")
    }

    // Before rendering, after receiving new props or state
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.status === 1) {
           console.log("Component should update.");
           return true;
        }
        return false;
    }

    //
    componentWillUpdate(nextProps, nextState) {
        console.log("Component will update.")
    }

    componentDidUpdate(prepProps, prevState) {
        console.log("Component did update");
    }

    componentWillUnmount() {
        console.log("Component wil unmount");
    }
}

export default Test;