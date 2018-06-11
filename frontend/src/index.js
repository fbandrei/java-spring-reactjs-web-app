import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter} from "react-router-dom";

import registerServiceWorker from './Services/registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home  from './Scenes/Home/Home.js';
import App from './Scenes/App/App.js'

class Index extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path={"/Home"} component={Home}/>
                    <Route exact path={"/app"} component={App}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('index'));

registerServiceWorker();
