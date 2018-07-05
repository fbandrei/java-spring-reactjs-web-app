import React from 'react';
import Sidebar from './sidebar/sidebar.js'
import './App.css'
import {Route, Switch} from "react-router-dom";
import Budget from "./budget/budget";

class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div className={"row"}>
                        <div className={"col-2"}>
                            <Sidebar/>
                        </div>
                        <Switch>
                            <Route exact path={"/app/budget"} render={(props) => <Budget {...props}/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;