import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Tabs, Tab } from "react-bootstrap";

import Navigation from "../components/Navigation";
import ProjectPanel from "../components/ProjectPanel";
import ClientPanel from "../components/ClientPanel";
import { getUserRole } from "../api";

class Manage extends React.Component {
  constructor() {
    super();

    this.state = {
      role: "",
    };
  }

  async componentDidMount() {
    await this.handleGetUserRole();

    if (this.state.role !== "Administrator") window.location.href = "/";
  }

  isLoggedIn = () => {
    return localStorage.getItem("user") || false;
  };

  handleGetUserRole = async () => {
    let id = JSON.parse(localStorage.user)._id;
    await getUserRole(id).then((res) => this.setState({ role: res.data.role }));
  };

  render() {
    return (
      <>
        {this.isLoggedIn() ? "" : <Redirect to="/" />}
        <Navigation />
        <Container>
          <div className="bg-light p-5 rounded-lg m-3">
            <h1 className="display-4">Management Panel 🤖</h1>
            <p className="lead">
              Here you may manage projects and clients, and generate reports per
              consultant.
            </p>

            <hr />

            <Tabs defaultActiveKey={1}>
              <Tab eventKey={1} title="Projects">
                <Container className="mt-4">
                  <h2 className="display-6">Project Management</h2>
                  <ProjectPanel />
                </Container>
              </Tab>

              <Tab eventKey={2} title="Clients">
                <Container className="mt-4">
                  <h2 className="display-6">Client Management</h2>
                  <ClientPanel />
                </Container>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </>
    );
  }
}

export default Manage;