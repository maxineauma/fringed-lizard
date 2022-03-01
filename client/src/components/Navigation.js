import React from "react";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";

import { getUserName, getUserRole } from "../api";

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      role: "",
    };
  }

  async componentDidMount() {
    await this.handleGetUserName();
    await this.handleGetUserRole();
  }

  isLoggedIn = () => {
    return localStorage.getItem("user") || false;
  };

  handleGetUserName = async () => {
    let id = JSON.parse(localStorage.user)._id;
    await getUserName(id).then((res) =>
      this.setState({ username: res.data.name })
    );
  };

  handleGetUserRole = async () => {
    let id = JSON.parse(localStorage.user)._id;
    await getUserRole(id).then((res) => this.setState({ role: res.data.role }));
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="p-4">
          <Container>
            <Navbar.Brand>Fringed Lizard 🦎</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                {this.isLoggedIn() && this.state.role === "Consultant" ? (
                  <>
                    <Nav.Link href="/projects">My Projects</Nav.Link>
                    <Nav.Link href="/timers">My Timers</Nav.Link>
                  </>
                ) : (
                  ""
                )}
                {this.isLoggedIn() && this.state.role === "Administrator" ? (
                  <Nav.Link href="/manage">Management</Nav.Link>
                ) : (
                  ""
                )}
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse style={{ justifyContent: "end" }}>
              <Nav>
                {this.isLoggedIn() ? (
                  <Nav>
                    <Navbar.Text>
                      {this.state.username}{" "}
                      <Badge
                        bg={
                          this.state.role === "Administrator"
                            ? "danger"
                            : "primary"
                        }
                      >
                        {this.state.role}
                      </Badge>{" "}
                      <a href="/signout">Sign Out</a>?
                    </Navbar.Text>
                  </Nav>
                ) : (
                  <>
                    <Nav.Link href="/login">Log in</Nav.Link> |{" "}
                    <Nav.Link style={{ fontWeight: "bold" }} href="/signup">
                      Sign up
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Navigation;