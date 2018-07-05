import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
        } from 'reactstrap';

class NavigationHeader extends React.Component {

    render() {
        let navbar;
        console.log(this.props.isAuthenticated);
        if (!this.props.isAuthenticated) {
            navbar =
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

        } else {
            navbar =
                <Navbar color={"light"} light expand={"md"}>
                    <NavbarBrand href="/">SYMW</NavbarBrand>
                    <Nav className={"ml-auto"} navbar>
                        <NavItem>
                            <NavLink href={"/app/budget"}>App</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.props.onLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
        }
        return (
            <div>
                {navbar}
            </div>
        );
    }
}

export default NavigationHeader;

