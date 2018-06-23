import React, {Component} from 'react';
import {Layout} from "antd";
import NavigationHeader from "../../components/navbar/navbar";

const {Content} = Layout;

class Home extends Component {

    render() {
        console.log(this.props.isAuthenticated);
        return(
            <Layout className={"app-container"}>
                <NavigationHeader isAuthenticated={this.props.isAuthenticated}
                            currentUser={this.props.currentUser}
                            onLogout={this.props.onLogout}/>
                <Content className={"app-content"}>
                    <div className={"container"}>
                        Home
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Home;