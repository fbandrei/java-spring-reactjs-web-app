import React from 'react';
import HeaderBudget from "./headerBudget/headerBudget";
import CenterBudget from "./centerBudget/centerBudget";
import RightBarBudget from "./rightBarBudget/rightBarBudget";
import ActionsBudget from "./actionsBudget/actionsBudget";

class Budget extends React.Component {

    render() {

        return(
                <div className={"col-10"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <HeaderBudget/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <ActionsBudget/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-9"}>
                            <CenterBudget/>
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