import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './services/registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from "./start";
import {BrowserRouter} from "react-router-dom";

class Index extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <Start/>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('index'));

registerServiceWorker();
