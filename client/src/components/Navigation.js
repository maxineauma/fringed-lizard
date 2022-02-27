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
                        <Navbar.Brand>Fringed Lizard</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse style={{ justifyContent: "end" }}>
                            <Nav>
                                {
                                    this.isLoggedIn() ? 
                                    <Nav><Navbar.Text>Hello, {localStorage.username}! <a href="/signout">Sign Out</a>?</Navbar.Text></Nav> 
                                    : <><Button variant="outline-success" href="/login">Log in</Button> | <Button variant="outline-danger" style={{ fontWeight: "bold" }} href="/signup">Sign up</Button></>
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