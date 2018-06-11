import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar.js'
import HeaderApp from './Components/Main/HeaderApp/HeaderApp.js'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <div>
                <div className={"container container-adjustment"}>
                    <div className={"row"}>
                        <div className={"col-3"}>
                            <Sidebar/>
                        </div>
                        <div className={"col-9"}>
                            <HeaderApp/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;