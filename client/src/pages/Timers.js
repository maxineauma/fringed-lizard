import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

import Navigation from "../components/Navigation";

class Timers extends React.Component {

    constructor() {

        super();

        this.state = {
            timers: {},
            projects: {},

            timerActive: false,
            timerSeconds: 1,
            intervalId: 0,
        }

    }

    async componentDidMount() {
        await this.listTimers();
        await this.listProjects();
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("loggedIn");
        return loggedIn || false;
    }

    listTimers = async () => {

        let userEmail = JSON.parse(localStorage.user).result.email;
        await axios.get(process.env.REACT_APP_API_URL + "/timer/" + userEmail)
        .then((res) => { this.setState({ timers: res.data.timers }); })
        .catch((err) => { this.setState({ timers: {} }); });

    }

    listProjects = async () => {

        let userEmail = JSON.parse(localStorage.user).result.email;
        await axios.get(process.env.REACT_APP_API_URL + "/project/" + userEmail)
        .then((res) => { this.setState({ projects: res.data.projects }); })
        .catch((err) => { this.setState({ projects: {} }); });

    }

    createTimer = async (e) => {

        let userEmail = JSON.parse(localStorage.user).result.email;

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + "/timer", 
            {
                email: userEmail,
                project: formData["project"].value,
                time: formData["time"].value
            }
        )
        .then((res) => {
            window.location.reload();
        });

    }

    deleteTimer = async(id) => {

        await axios.delete(process.env.REACT_APP_API_URL + "/timer/" + id)
        .then((res) => {
            window.location.reload();
        });

    }

    toggleTimer = async () => {

        this.setState({ timerActive: this.state.timerActive ? false : true });

    }

    doTimer = async () => {

        if(!this.state.timerActive) {
            var interval = setInterval(() => {
                this.setState({ timerSeconds: this.state.timerSeconds + 1 });
            }, 1000);
            this.setState({ intervalId: interval });
        }
        else {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: 0 });   
        }

        return await this.toggleTimer();
        
    }

    render() {

        return (
            <>
                { this.isLoggedIn() ? "" : <Redirect to="/" /> }    
                <Navigation />
                <Container>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">My Timer Entries⌛</h1>
                        <p className="lead">Here you may find your timer entries, and enter new ones.</p>

                        <hr/>

                        <h2 className="display-6">
                            New Entry | <Button variant={this.state.timerActive ? "danger" : "success"} className="mr-3" onClick={this.doTimer}>{this.state.timerActive ? "Stop" : "Start"} Timer</Button>
                        </h2>

                        <Form onSubmit={this.createTimer} className="p-3">
                            <Row>
                                <Form.Group as={Col} controlId="project" className="mb-3">
                                    <Form.Label>Project</Form.Label>
                                    <Form.Select>
                                        {
                                            Object.values(this.state.projects).map((p, i) => {
                                                return(
                                                    <option>{Object.values(this.state.projects)[i]["project"]}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="time" className="mb-3">
                                    <Form.Label>Time (Sec.)</Form.Label>
                                    <Form.Control type="number" value={this.state.timerSeconds} disabled></Form.Control>
                                </Form.Group>
                            </Row>

                            <Button variant="primary" className="mt-3" type="submit">
                                Submit
                            </Button>
                        </Form>

                        <hr/>

                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Time (Sec.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.values(this.state.timers).map((p, i) => {
                                        return(
                                            <tr>
                                                <td>{Object.values(this.state.timers)[i]["_id"]}</td>
                                                <td>{Object.values(this.state.timers)[i]["project"]}</td>
                                                <td>{Object.values(this.state.timers)[i]["timeInSeconds"]}</td>
                                                <td>
                                                    <Button onClick={() => this.deleteTimer(Object.values(this.state.timers)[i]["_id"])}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </>
        )

    }
}

export default Timers;