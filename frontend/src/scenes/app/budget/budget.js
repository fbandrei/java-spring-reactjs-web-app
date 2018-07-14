import React from 'react';
import HeaderBudget from "./headerBudget/headerBudget";
import CenterBudget from "./centerBudget/centerBudget";
import RightBarBudget from "./rightBarBudget/rightBarBudget";
import ActionsBudget from "./actionsBudget/actionsBudget";

class Budget extends React.Component {

    constructor() {
        super();
        const currentTime = new Date();
        this.state = {
            currentTime: {
                year: currentTime.getFullYear(),
                month: currentTime.getMonth()
            }
        }
    }

    setCurrentTime = (currentTime) => {
        this.setState({
            currentTime: currentTime
        });
    }

    render() {

        return(
                <div className={"col-10"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <HeaderBudget setCurrentTime={this.setCurrentTime}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <ActionsBudget/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-9"}>
                            <CenterBudget currentTime={this.state.currentTime}/>
                        </div>
                        <div className={"col-3"}>
                            <RightBarBudget/>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Budget;