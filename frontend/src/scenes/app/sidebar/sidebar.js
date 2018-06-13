import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import './sidebar.css'
import {AccountList} from "../../../services/accountService";
import ModalAccount from "./modalAccount";


class Sidebar extends React.Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modalAccount: false
        };
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

    reRender() {
        this.forceUpdate();
    }

    render() {
        return (
            <div className={"container sidebar"}>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret className={"sidebar-buttons"}><i className={"fa fa-address-card"}></i> Your
                        Profile</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem href={"http://localhost:8080/logout"}>
                            Logout
                        </DropdownItem>
                        <DropdownItem href={"http://localhost:3000/editAccount"}>
                            Edit
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button className={"sidebar-buttons"} href={"/app"}><i className={"fa fa-bitcoin"}></i> Budget</Button>
                <span>
                    <Button className={"sidebar-buttons"} href={"/transactions/all"}><i className={"fa fa-university"}></i> All accounts</Button>
                    <Button className={"sidebar-buttons"} onClick={this.toggleModalAccount.bind(this)}>
                            <i className={"fa fa-plus"}></i> Add account</Button>
                    <ModalAccount reRender={this.reRender.bind(this)} toggleModalAccount={this.toggleModalAccount.bind(this)} modal={this.state.modalAccount}/>
                </span>
                <hr/>
                    <AccountList/>
                <hr/>
            </div>
        );
    }
}

export default Sidebar;