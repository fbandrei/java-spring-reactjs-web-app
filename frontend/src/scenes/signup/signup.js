import React from "react";
import { Button, Form, Input, notification } from "antd";
import { checkEmailAvailability, signUp } from "../../services/RequestAPI";
import "./signup.css";
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from "../../constants/constant";
import { Link } from "react-router-dom";

const FormItem = Form.Item;

export class SignupForm extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: {
        value: ""
      },
      lastName: {
        value: ""
      },
      email: {
        value: ""
      },
      password: {
        value: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
  }

  handleInputChange(event, validation) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validation(inputValue)
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const request = {
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      email: this.state.email.value,
      password: this.state.password.value,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getUTCDate()
    };
    signUp(request)
      .then(response => {
        notification.success({
          message: "SYMW",
          description:
            "A confirmation link has been sent to your email address, please access it in order" +
            " to complete your registration."
        });
        this.props.history.push("/login");
      })
      .catch(err => {
        notification.error({
          message: "SYMW",
          description: err.message
        });
      });
  }

  isFormInvalid() {
    return !(
      this.state.firstName.validateStatus === "success" &&
      this.state.lastName.validateStatus === "success" &&
      this.state.email.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  validateEmailAvailability() {
    const emailValue = this.state.email.value;
    const validateEmail = this.validateEmail(emailValue);

    if (validateEmail.validateStatus === "error") {
      this.setState({
        email: {
          value: emailValue,
          ...validateEmail
        }
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: "validating",
        errorMsg: null
      }
    });

    checkEmailAvailability(emailValue)
      .then(response => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "success",
              errorMsg: null
            }
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: "error",
              errorMsg: "This email address is already registered."
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          email: {
            value: emailValue,
            validateStatus: "success",
            errorMsg: null
          }
        });
      });
  }

  validateEmail = email => {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Email may not be empty"
      };
    }

    const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Email not valid"
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
      };
    }

    return {
      validateStatus: null,
      errorMsg: null
    };
  };

  validateName = name => {
    if (name !== undefined && name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  validatePassword = password => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: "error",
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null
      };
    }
  };

  render() {
    return (
      <div className="signup-container">
        <h1 className="page-title">Sign Up</h1>
        <div className="signup-content">
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              label="First Name"
              validateStatus={this.state.firstName.validateStatus}
              help={this.state.firstName.errorMsg}
            >
              <Input
                size="large"
                name="firstName"
                autoComplete="off"
                placeholder="Your first name"
                value={this.state.firstName.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateName)
                }
              />
            </FormItem>
            <FormItem
              label="Last Name"
              validateStatus={this.state.lastName.validateStatus}
              help={this.state.lastName.errorMsg}
            >
              <Input
                size="large"
                name="lastName"
                autoComplete="off"
                placeholder="Your last name"
                value={this.state.lastName.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateName)
                }
              />
            </FormItem>
            <FormItem
              label="Email"
              hasFeedback
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}
            >
              <Input
                size="large"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Your email"
                value={this.state.email.value}
                onBlur={this.validateEmailAvailability}
                onChange={event =>
                  this.handleInputChange(event, this.validateEmail)
                }
              />
            </FormItem>
            <FormItem
              label="Password"
              validateStatus={this.state.password.validateStatus}
              help={this.state.password.errorMsg}
            >
              <Input
                size="large"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="A password between 6 to 20 characters"
                value={this.state.password.value}
                onChange={event =>
                  this.handleInputChange(event, this.validatePassword)
                }
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="signup-form-button"
                disabled={this.isFormInvalid()}
              >
                Sign up
              </Button>
              Already registered? <Link to="/login">Login here!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
