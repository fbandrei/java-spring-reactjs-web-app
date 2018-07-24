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
            },
            toBeBudget: ''
        }
    }

    setCurrentTime = (currentTime) => {
        this.setState({
            currentTime: currentTime
        });
    };

    setToBeBudget(toBeBudget) {
        this.setState({
            toBeBudget: toBeBudget
        });
        console.log("here");
    }

    render() {
            console.log("rendering");
        return(
                <div className={"col-10"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <HeaderBudget toBeBudget={this.state.toBeBudget} setToBeBudget={this.setToBeBudget.bind(this)} setCurrentTime={this.setCurrentTime}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <ActionsBudget/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <CenterBudget setToBeBudget={this.setToBeBudget.bind(this)} toBeBudget={this.state.toBeBudget} currentTime={this.state.currentTime}/>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Budget;