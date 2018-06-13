import React from "react";
import Navigation from "../../components/navbar/navbar";
import './home.css'
import {Layout, notification} from 'antd';
import {getCurrentUser} from "../../services/RequestAPI";
import {ACCESS_TOKEN} from "../../constants/constant";
import LoadingIndicator from "../../components/LoadingIndicator";
import {Route, Switch} from "react-router-dom";

const {Content} = Layout;

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.loadCurentUser = this.loadCurentUser.bind(this);

        notification.config({
            placement: 'bottomRight',
            duration: 3
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
        this.loadCurentUser();
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
        this.loadCurentUser();
        this.props.history.push("/");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return(
            <Layout className={"app-container"}>
                <Navigation isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    onLogout={this.handleLogout}/>
                <Content className={"app-content"}>
                    <div className={"container"}>
                        <Switch>
                            {/*<Route path={"/login"} render={(props) => <Login login={this.handleLogin()} {...props}/>}/>*/}
                            {/*<Route path={"/signup"} component={Signup}/>*/}
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Home;