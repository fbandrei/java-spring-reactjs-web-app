import React, { Component } from "react";
import { Button, Form, Icon, Input, notification } from "antd";
import { login } from "../../services/RequestAPI";
import {
  ACCESS_TOKEN,
  JOINING_DATE,
  JOINING_DAY,
  JOINING_MONTH,
  JOINING_YEAR
} from "../../constants/constant";
import "./login.css";
import { Link } from "react-router-dom";

const FormItem = Form.Item;

class Login extends Component {
  render() {
    const WrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className="login-container">
        <h1 className="page-title">Login or <Link to="/">Go Home</Link> </h1>
        <div className="login-content">
          <WrappedLoginForm onLogin={this.props.onLogin} />
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const request = Object.assign({}, values);
        login(request)
          .then(response => {
            if (response.success === false) {
              notification.error({
                message: "SYMW",
                description: response.message
              });
            } else {
              const joiningDate = {
                year: response.year,
                month: response.month,
                day: response.day
              };
              localStorage.setItem(ACCESS_TOKEN, response.accessToken);
              localStorage.setItem(JOINING_YEAR, response.year);
              localStorage.setItem(JOINING_MONTH, response.month);
              localStorage.setItem(JOINING_DAY, response.day);
              this.props.onLogin();
            }
          })
          .catch(err => {
            if (err.status === 401) {
              notification.error({
                message: "SYMW",
                description:
                  "Your username or password is incorrect. Try again!"
              });
            } else {
              localStorage.removeItem(ACCESS_TOKEN);
              notification.error({
                message: "SYMW",
                description: err.message
              });
            }
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email" }]
          })(
            <Input
              prefix={<Icon type={"user"} />}
              size={"large"}
              name={"email"}
              type={"email"}
              placeholder={"Email"}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your password" }]
          })(
            <Input
              prefix={<Icon type={"lock"} />}
              size={"large"}
              name={"password"}
              type={"password"}
              placeholder={"Password"}
            />
          )}
        </FormItem>
        <FormItem>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
          >
            Login
          </Button>
          Don't you have an account yet? <Link to="/signup">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Login;
