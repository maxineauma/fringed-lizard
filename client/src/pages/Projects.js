import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

import Navigation from "../components/Navigation";
import { listProjectsByUser, getUserEmail, getUserRole } from "../api/index";

class Projects extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      role: "",
      projects: {},
    };
  }

  async componentDidMount() {
    await this.handleGetUserEmail();
    await this.handleGetUserRole();
    await this.handleListProjectsByUser();

    if (this.state.role !== "Consultant") window.location.href = "/";
  }

  isLoggedIn = () => {
    return localStorage.getItem("user") || false;
  };

  handleGetUserEmail = async () => {
    let id = JSON.parse(localStorage.user)._id;
    await getUserEmail(id).then((res) =>
      this.setState({ email: res.data.email })
    );
  };

  handleGetUserRole = async () => {
    let id = JSON.parse(localStorage.user)._id;
    await getUserRole(id).then((res) => this.setState({ role: res.data.role }));
  };

  handleListProjectsByUser = async () =>
    await listProjectsByUser(this.state.email).then((res) => {
      this.setState({ projects: res.data.projects });
    });

  render() {
    return (
      <>
        {this.isLoggedIn() ? "" : <Redirect to="/" />}
        <Navigation />
        <Container>
          <div className="bg-light p-5 rounded-lg m-3">
            <h1 className="display-4">My Projects🛠️</h1>
            <p className="lead">
              Here you may find projects that you're assigned.
            </p>

            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Client</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(this.state.projects).map((p, i) => {
                  return (
                    <tr>
                      <td>{Object.values(this.state.projects)[i]["_id"]}</td>
                      <td>
                        {Object.values(this.state.projects)[i]["project"]}
                      </td>
                      <td>{Object.values(this.state.projects)[i]["client"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Container>
      </>
    );
  }
}

export default Projects;