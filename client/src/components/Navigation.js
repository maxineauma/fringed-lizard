import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";;

class Navigation extends React.Component {

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("loggedIn");
        return loggedIn || false;
    }

    render() {

        return( 
            <>
                <Navbar bg="dark" variant="dark" className="p-4">
                    <Container>
                        <Navbar.Brand>Fringed Lizard 🦎</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav>
                                <Nav.Link href="/">Home</Nav.Link>
                                { this.isLoggedIn() ? <Nav.Link href="/projects">My Projects</Nav.Link> : "" }
                                { this.isLoggedIn() ? <Nav.Link href="/timers">My Timers</Nav.Link> : "" }
                                { this.isLoggedIn() ? <Nav.Link href="/manage">Management</Nav.Link> : "" }
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse style={{ justifyContent: "end" }}>
                            <Nav>
                                {
                                    this.isLoggedIn() ? 
                                    <Nav><Navbar.Text>Hello, {JSON.parse(localStorage.user).result.firstName + " " + JSON.parse(localStorage.user).result.lastName}! <a href="/signout">Sign Out</a>?</Navbar.Text></Nav> 
                                    : <><Nav.Link href="/login">Log in</Nav.Link> | <Nav.Link style={{ fontWeight: "bold" }} href="/signup">Sign up</Nav.Link></>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )

    }

}

export default Navigation;