import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {getAccounts} from "./RequestAPI";

export class AccountList extends React.Component {
    constructor() {
        super();

        this.state = {
            accounts: []
        }
    }

    componentWillMount() {
        getAccounts()
            .then(res => {
                const accounts = res.data;
                console.log(accounts);
                this.setState({
                    accounts: accounts
                })
            })
    }

    render() {
        return (
            <ListGroup>
                {
                    this.state.accounts.map(accounts =>
                        <ListGroupItem tag={"a"} href={"http://localhost:8080/transactions/" + accounts.name}
                                       key={accounts.accountNumber}>{accounts.name}</ListGroupItem>)
                }
            </ListGroup>


        );
    }

}
