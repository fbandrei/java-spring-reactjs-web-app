import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

class NavigationHeader extends React.Component {
  render() {
    let navbar;
    console.log(this.props.isAuthenticated);
    if (!this.props.isAuthenticated) {
      navbar = (
        <Navbar color={"light"} light expand={"md"}>
          <NavbarBrand href="/">SYMW - Spend your money wisely</NavbarBrand>
          <Nav className={"ml-auto"} navbar>
            <NavItem>
              <NavLink href={"/login"}>Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/signup"}>Sign up</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      );
    } else {
      navbar = (
        <Navbar color={"light"} light expand={"md"}>
          <NavbarBrand href="/">SYMW - Spend your money wisely</NavbarBrand>
          <Nav className={"ml-auto"} navbar>
            <NavItem>
              <NavLink onClick={this.props.onLogout}>Logout</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      );
    }
    return <div>{navbar}</div>;
  }
}

export default NavigationHeader;
