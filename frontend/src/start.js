import React from "react";
import './start.css'
import {notification} from 'antd';
import {getCurrentUser} from "./services/RequestAPI";
import {ACCESS_TOKEN} from "./constants/constant";
import LoadingIndicator from "./components/LoadingIndicator";
import {Route, Switch, withRouter} from "react-router-dom";
import {SignupForm} from "./scenes/signup/signup";
import Login from "./scenes/login/login";
import Home from "./scenes/home/home";
import App from "./scenes/app/App";
import 'antd/dist/antd.css';
import Confirm from "./components/confirm";

class Start extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);

        notification.config({
            placement: 'topRight',
            duration: 5
        })
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    isAuthenticated: true,
                    currentUser: response,
                    isLoading: false
                })
            }).catch(err => {
                this.setState({
                    isLoading:false
                })
        });
    }

    componentWillMount() {
        this.loadCurrentUser();
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });
        this.props.history.push("/");
    }

    handleLogin() {
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return(
                <Switch>
                    <Route exact path="/"
                           render={(props) => <Home isAuthenticated={this.state.isAuthenticated}
                                                    currentUser={this.state.currentUser}
                                                    onLogout={this.handleLogout} {...props} />}/>
                    <Route exact path="/login"
                           render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                    <Route exact path={"/signup"} component={SignupForm}/>
                    <Route exact path={"/app"} component={App}/>
                    <Route path="/confirm"
                           render={(props) => <Confirm {...props} />}/>
                </Switch>
        );
    }
}

export default withRouter(Start);