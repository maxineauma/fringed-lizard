import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";

import Navigation from "../components/Navigation";
import {
  getUserEmail,
  getUserRole,
  listTimersByUser,
  listProjectsByUser,
  createTimer,
  deleteTimer,
} from "../api";

class Timers extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      role: "",
      timers: {},
      projects: {},

      timerActive: false,
      timerSeconds: 1,
      intervalId: 0,
    };
  }

  async componentDidMount() {
    await this.handleGetUserEmail();
    await this.handleGetUserRole();
    await this.handleListTimersByUser();
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

  handleListTimersByUser = async () =>
    await listTimersByUser(this.state.email).then((res) => {
      this.setState({ timers: res.data.timers });
    });
  handleListProjectsByUser = async () =>
    await listProjectsByUser(this.state.email).then((res) => {
      this.setState({ projects: res.data.projects });
    });

  handleCreateTimer = async (e) => {
    let formData = e.target;
    e.preventDefault();

    await createTimer({
      email: this.state.email,
      project: formData["project"].value,
      time: formData["time"].value,
    }).then((res) => {
      window.location.reload();
    });
  };

  handleDeleteTimer = async (id) => {
    await deleteTimer(id).then((res) => {
      window.location.reload();
    });
  };

  toggleTimer = async () =>
    this.setState({ timerActive: this.state.timerActive ? false : true });
  resetTimer = async () => this.setState({ timerSeconds: 1 });

  doTimer = async () => {
    if (!this.state.timerActive) {
      var interval = setInterval(() => {
        this.setState({ timerSeconds: this.state.timerSeconds + 1 });
      }, 1000);
      this.setState({ intervalId: interval });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: 0 });
    }

    return await this.toggleTimer();
  };

  render() {
    return (
      <>
        {this.isLoggedIn() ? "" : <Redirect to="/" />}
        <Navigation />
        <Container>
          <div className="bg-light p-5 rounded-lg m-3">
            <h1 className="display-4">My Timer Entries⌛</h1>
            <p className="lead">
              Here you may find your timer entries, and enter new ones.
            </p>

            <hr />

            <h2 className="display-6">
              New Entry&nbsp;
              <Button
                className="m-1"
                variant={this.state.timerActive ? "danger" : "success"}
                className="mr-3"
                onClick={this.doTimer}
              >
                {this.state.timerActive ? "Stop" : "Start"} Timer
              </Button>
              <Button
                className="m-1"
                variant="primary"
                onClick={this.resetTimer}
              >
                Reset Timer
              </Button>
            </h2>

            <Form onSubmit={this.handleCreateTimer} className="p-3">
              <Row>
                <Form.Group as={Col} controlId="project" className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Select>
                    {Object.values(this.state.projects).map((p, i) => {
                      return (
                        <option>
                          {Object.values(this.state.projects)[i]["project"]}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="time" className="mb-3">
                  <Form.Label>Time (Sec.)</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.timerSeconds}
                    disabled
                  ></Form.Control>
                </Form.Group>
              </Row>

              <Button variant="primary" className="mt-3" type="submit">
                Submit
              </Button>
            </Form>

            <hr />

            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Time (Min.)</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(this.state.timers).map((p, i) => {
                  return (
                    <tr>
                      <td>{Object.values(this.state.timers)[i]["_id"]}</td>
                      <td>{Object.values(this.state.timers)[i]["project"]}</td>
                      <td>
                        {parseFloat(
                          parseInt(
                            Object.values(this.state.timers)[i]["timeInSeconds"]
                          ) / 60
                        ).toFixed(2)}
                      </td>
                      <td>
                        <a
                          href="#"
                          onClick={() =>
                            this.handleDeleteTimer(
                              Object.values(this.state.timers)[i]["_id"]
                            )
                          }
                        >
                          Delete
                        </a>
                      </td>
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

export default Timers;