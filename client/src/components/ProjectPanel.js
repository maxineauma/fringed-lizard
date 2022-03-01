import React from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import {
  listUsers,
  listClients,
  listProjects,
  createProject,
  reassignProject,
} from "../api";

class UserPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      users: {},
      clients: {},
      projects: {},
      formRes: 0,
    };
  }

  async componentDidMount() {
    await this.handleListUsers();
    await this.handleListClients();
    await this.handleListProjects();
  }

  handleListUsers = async () =>
    await listUsers().then((res) => {
      this.setState({ users: res.data.allUsers });
    });
  handleListClients = async () =>
    await listClients().then((res) => {
      this.setState({ clients: res.data.allClients });
    });
  handleListProjects = async () =>
    await listProjects().then((res) => {
      this.setState({ projects: res.data.allProjects });
    });

  handleCreateProject = async (e) => {
    let formData = e.target;
    e.preventDefault();

    await createProject({
      email: formData["email"].value,
      project: formData["project"].value,
      client: formData["client"].value,
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ formRes: err.response.status });
      });
  };

  handleReassignProject = async (e) => {
    let formData = e.target;
    e.preventDefault();

    let id = formData["project"].value;
    await reassignProject(id, {
      email: formData["email"].value,
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        this.setState({ formRes: err.response.status });
      });

    console.log(id);
  };

  render() {
    return (
      <>
        <Form className="p-3" onSubmit={this.handleCreateProject}>
          <h4 className="display-8 mb-3">
            Assign a project to a client/consultant pair.
          </h4>
          {this.state.formRes === 409 ? (
            <Alert variant="danger">
              <b>Err:</b> User has already been assigned this project.
            </Alert>
          ) : (
            ""
          )}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Consultant</Form.Label>
              <Form.Select>
                {Object.values(this.state.users).map((u, i) => {
                  return (
                    <option value={Object.values(this.state.users)[i]["email"]}>
                      {Object.values(this.state.users)[i]["firstName"] +
                        " " +
                        Object.values(this.state.users)[i]["lastName"] +
                        " " +
                        "(" +
                        Object.values(this.state.users)[i]["email"] +
                        ")"}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="client">
              <Form.Label>Client</Form.Label>
              <Form.Select>
                {Object.values(this.state.clients).map((u, i) => {
                  return (
                    <option>
                      {Object.values(this.state.clients)[i]["companyName"] +
                        " (" +
                        Object.values(this.state.clients)[i]["email"] +
                        ")"}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group controlId="project" className="mb-3">
            <Form.Label>Project</Form.Label>
            <Form.Control placeholder="Provide a suitable name for the assigned project" />
          </Form.Group>

          <Button type="primary" className="mt-3" type="submit">
            Assign
          </Button>
        </Form>

        <hr />

        <Form className="p-3" onSubmit={this.handleReassignProject}>
          <h4 className="display-8 mb-3">Reassign a project.</h4>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Consultant</Form.Label>
              <Form.Select>
                {Object.values(this.state.users).map((u, i) => {
                  return (
                    <option value={Object.values(this.state.users)[i]["email"]}>
                      {Object.values(this.state.users)[i]["firstName"] +
                        " " +
                        Object.values(this.state.users)[i]["lastName"] +
                        " " +
                        "(" +
                        Object.values(this.state.users)[i]["email"] +
                        ")"}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="project">
              <Form.Label>Project</Form.Label>
              <Form.Select>
                {Object.values(this.state.projects).map((u, i) => {
                  return (
                    <option
                      value={Object.values(this.state.projects)[i]["_id"]}
                    >
                      {Object.values(this.state.projects)[i]["project"] +
                        " (Assigned to: " +
                        Object.values(this.state.projects)[i]["email"] +
                        ")"}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button type="primary" className="mt-3" type="submit">
            Reassign
          </Button>
        </Form>
      </>
    );
  }
}

export default UserPanel;