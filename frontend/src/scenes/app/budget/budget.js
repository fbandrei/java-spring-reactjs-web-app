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
            toBeBudget: '',
            newCategoryCreated: false,
            newSubcategoryCreated: false
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

    setNewCategory() {
        this.setState({
            newCategoryCreated: true
        })
    }

    setNewSubcategory() {
        this.setState({
            newSubcategoryCreated: true
        })
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
                            <ActionsBudget setNewSubcategory={this.setNewSubcategory.bind(this)} setNewCategory={this.setNewCategory.bind(this)}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <CenterBudget newSubcategory={this.state.newSubcategoryCreated} newCategory={this.state.newCategoryCreated} setToBeBudget={this.setToBeBudget.bind(this)} toBeBudget={this.state.toBeBudget} currentTime={this.state.currentTime}/>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Budget;