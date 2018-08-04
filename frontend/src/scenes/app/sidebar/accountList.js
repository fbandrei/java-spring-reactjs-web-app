import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {getAccounts} from "../../../services/RequestAPI";
import LoadingIndicator from "../../../components/LoadingIndicator";
import InfiniteScroll from 'react-infinite-scroller';
import './accountList.css'

export class AccountList extends React.Component {
    constructor() {
        super();

        this.state = {
            accounts: [],
            isLoading: true,
        }
    }

    componentWillMount() {
        getAccounts()
            .then(res => {
                this.setState({
                    accounts: res,
                    isLoading: false
                });
            })
    }

    componentWillReceiveProps(props) {
        if (props.newAccountCreated === true) {
            getAccounts()
                .then(res => {
                    this.setState({
                        accounts: res,
                        isLoading: false
                    });
                });
        }
    }

    doSomething() {}

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <div className={"infinite-container"}>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={this.doSomething}
                >
                    <ListGroup>
                        {
                            this.state.accounts.map(accounts =>
                                <ListGroupItem tag={"a"} href={"/transactions/" + accounts.name}
                                               key={accounts.accountNumber} className={"div-account-list"}>
                                    <div style={{color: "rgba(0, 0, 0, 0.65)"}}><b>{accounts.name}</b></div>
                                    <div style={{color: "rgba(0, 0, 0, 0.65)"}} className={"sum-div-account-list"}>{accounts.sum}</div>
                                </ListGroupItem>)
                        }
                    </ListGroup>
                </InfiniteScroll>
            </div>
        );
    }

}
