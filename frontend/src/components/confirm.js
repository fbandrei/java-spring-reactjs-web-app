import React, { Component } from "react";
import * as qs from "query-string";
import { confirmRegistration } from "../services/RequestAPI";
import { notification } from "antd";

class Confirm extends Component {
  componentWillMount() {
    const parsed = qs.parse(this.props.location.search);
    console.log(parsed);
    confirmRegistration(parsed.token)
      .then(response => {
        notification.success({
          message: "SYMW",
          description: response.message
        });
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.message);
        notification.error({
          message: "SYMW",
          description: err.message
        });
        this.props.history.push("/");
      });
  }

  render() {
    return <div />;
  }
}

export default Confirm;
