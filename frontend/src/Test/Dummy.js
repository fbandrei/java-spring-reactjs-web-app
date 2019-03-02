import React from "react";

export class Dummy extends React.Component {
  constructor(props) {
    super();
    this.state = {
      age: props.age,
      helloWorld: props.initialHelloWorld
    };
  }

  getCompanyAge() {
    this.setState({
      age: this.state.age + 3
    });
  }

  onChangeHello() {
    this.props.changeHelloWorld(this.state.helloWorld);
  }

  onHandleChange(event) {
    this.setState({
      helloWorld: event.target.value
    });
  }

  render() {
    return (
      <div>
        <footer className={"jumbotron text-center"}>
          <p>All right reserved by {this.props.companyName}</p>
          {this.props.children}
          <p>Company's age: {this.state.age}</p>
          <button className={"btn btn-primary"} onClick={this.props.greet}>
            Greet
          </button>
          <hr />
          <button
            onClick={() => this.getCompanyAge()}
            className={"btn btn-primary"}
          >
            Find out the company age!
          </button>
          <hr />
          <input
            type={"text"}
            value={this.state.helloWorld}
            onChange={event => this.onHandleChange(event)}
          />
          <button onClick={this.onChangeHello.bind(this)}>
            Change the world!
          </button>
        </footer>
      </div>
    );
  }
}
