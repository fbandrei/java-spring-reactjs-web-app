import React from 'react';
import './transactions.css'
import HeaderTransactions from "./headerTransactions/headerTransactions";
import ActionsTransactions from "./actionsTransactions/actionsTransactions";
import CenterTransactions from "./centerTransactions/centerTransactions";


class Transactions extends React.Component {

    constructor() {
        super();
        const dateTo = new Date();
        const dateFrom = dateTo.getDate() - 30;
        this.state = {
            dateTo: dateTo,
            dateFrom: dateFrom,
            newTransactionAdded: false,
            newTemplateDefined: false
        }
    }

    setDates = (dateFrom, dateTo) => {
        this.setState({
            dateTo: dateTo,
            dateFrom: dateFrom
        })
    };

    setNewTransaction() {
        this.setState({
            newTransactionAdded: true
        })
    }

    setNewTemplate() {
        this.setState({
            newTemplateDefined: true
        })
    }

    render() {
        return(
            <div className={"col-10"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <HeaderTransactions/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <ActionsTransactions
                            setNewTransaction={this.setNewTransaction.bind(this)} setNewTemplate={this.setNewTemplate.bind(this)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <CenterTransactions/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactions;