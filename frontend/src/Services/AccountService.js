import React from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export class AccountList extends React.Component {
    constructor() {
        super();

        this.state = {
            accounts: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/getAccounts')
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

function getAllAccounts() {
    axios.get('http://localhost:8080/getAccounts')
        .then(res => {
            const accounts = res.data;
            this.setState({
                accounts: accounts
            })
        })
}
