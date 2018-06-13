import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
        } from 'reactstrap';

class NavigationHeader extends React.Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        let navbar;
        if (!this.props.isAuthenticated) {
            navbar = [
                <Navbar color={"light"} light expand={"md"}>
                    <NavbarBrand href="/">SYMW</NavbarBrand>
                    <Nav className={"ml-auto"} navbar>
                        <NavItem>
                            <NavLink href={"/login"}>Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/signup"}>Sign up</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            ]
        } else {
            navbar = [
                <Navbar color={"light"} light expand={"md"}>
                    <NavbarBrand href="/">SYMW</NavbarBrand>
                    <Nav className={"ml-auto"} navbar>
                        <NavItem>
                            <NavLink onClick={this.props.onLogout()}>Login</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            ]
        }
        return (
            <div>
                {navbar}
            </div>
        );
    }
}

export default NavigationHeader;

