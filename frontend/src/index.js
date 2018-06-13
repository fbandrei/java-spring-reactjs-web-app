import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './services/registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './scenes/home/home.js';

class Index extends React.Component {
    render() {
        return(
            <Home/>
        )
    }
}

ReactDOM.render(<Index/>, document.getElementById('index'));

registerServiceWorker();
