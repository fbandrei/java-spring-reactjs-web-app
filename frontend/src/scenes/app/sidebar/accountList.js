import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {getAccounts} from "../../../services/RequestAPI";
import LoadingIndicator from "../../../components/LoadingIndicator";
import InfiniteScroll from 'react-infinite-scroller';
import {List} from 'antd';

export class AccountList extends React.Component {
    constructor() {
        super();

        this.state = {
            accounts: [],
            isLoading: true
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

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <div className={"infinite-container"}>
                <InfiniteScroll
                    initialLoad={false}
                    loadMore={false}
                >
                    <ListGroup>
                        {
                            this.state.accounts.map(accounts =>
                                <ListGroupItem tag={"a"} href={"/transactions/" + accounts.name}
                                               key={accounts.accountNumber}>
                                    <div><b>{accounts.name}</b></div>
                                    <div className={"div-account-list"}><b>{accounts.sum}</b></div>
                                </ListGroupItem>)
                        }
                    </ListGroup>
                </InfiniteScroll>
            </div>



        );
    }

}
