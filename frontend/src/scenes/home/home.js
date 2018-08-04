import React, {Component} from 'react';
import {Layout} from "antd";
import NavigationHeader from "../../components/navbar/navbar";
import homeBackground from '../../images/homeBackground.jpg';
import mountainsTrees from '../../images/mountains_trees.jpg'
import Button from '@material-ui/core/Button';
import './home.css'

const {Content} = Layout;

class Home extends Component {

    render() {
        let home;
        if (!this.props.isAuthenticated) {
            home = <Layout className={"app-container"}>
                <NavigationHeader isAuthenticated={this.props.isAuthenticated}
                                  currentUser={this.props.currentUser}
                                  onLogout={this.props.onLogout}/>
                <Content className={"app-content"}>
                    <div className={"container"}>
                        <div className={"container"}>
                            <img src={mountainsTrees} width="1366px" className={"img-home"}/>
                            <Button variant="extendedFab" className={"button-home"} size={"large"} href={'/login'}>
                                LOGIN
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        } else {
            home = <Layout className={"app-container"}>
                <NavigationHeader isAuthenticated={this.props.isAuthenticated}
                                  currentUser={this.props.currentUser}
                                  onLogout={this.props.onLogout}/>
                <div className={"container"}>
                        <img src={mountainsTrees} width="1366px" className={"img-home"}/>
                    <Button variant="extendedFab" className={"button-home"} size={"large"} href={'/app/budget'}>
                        START
                    </Button>
                </div>
            </Layout>
        }
        return(
            <div>
                {home}
            </div>
        );
    }
}

export default Home;