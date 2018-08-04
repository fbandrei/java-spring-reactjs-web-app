import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import './sidebar.css'
import {AccountList} from "./accountList";
import ModalAccount from "./modalAccount";


class Sidebar extends React.Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modalAccount: false,
            newAccountCreated: false
        };

        // this.reRender = this.reRender.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleModalAccount() {
        this.setState({
            modalAccount: !this.state.modalAccount
        })
    }

    triggerRerender(){
        console.log("rerender called");
        this.setState({
            newAccountCreated: true
        })
    }

    componentWillUnmount() {
        this.setState({
            newAccountCreated: false
        })
    }

    render() {
        console.log("sidebar rerendered");
        return (
            <div className={"container sidebar"}>
                <Button className={"sidebar-buttons"} href={"/"}><i className={"fas fa-home"}/> Home</Button>
                <Button className={"sidebar-buttons"} href={"/app/budget"}><i className={"fab fa-bitcoin"}/> Budget</Button>
                <span>
                    <Button className={"sidebar-buttons"} href={"/transactions/all"}><i className={"fas fa-money-check-alt"}/> Transactions</Button>
                    <Button className={"sidebar-buttons"} href={"/analytics"}><i className="fas fa-chart-area"/> Analytics</Button>
                    <Button className={"sidebar-buttons"} onClick={this.toggleModalAccount.bind(this)}>
                        <span><i className={"fa fa-plus"}/> Add account</span>
                    </Button>
                    <ModalAccount triggerRerender={this.triggerRerender.bind(this)} toggleModalAccount={this.toggleModalAccount.bind(this)} modal={this.state.modalAccount}/>
                </span>
                <hr/>
                    <h3 style={{color:"white", padding: "5px"}}>List of accounts</h3>
                    <AccountList newAccountCreated={this.state.newAccountCreated}/>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret className={"sidebar-buttons profile-button"}><i className={"fa fa-address-card"}/> Your
                        Profile</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.props.onLogout}>
                            Logout
                        </DropdownItem>
                        <DropdownItem href={"http://localhost:3000/editProfile"}>
                            Edit
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default Sidebar;