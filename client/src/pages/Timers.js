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
            date: new Date().toISOString().slice(0, 10),
            formRes: 0
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
        let date = this.state.date;
        await axios.get(process.env.REACT_APP_API_URL + "/timer/" + userEmail + "/" + date)
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
        let currentDate = new Date().toISOString().slice(0, 10);

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + "/timer", 
            {
                email: userEmail,
                project: formData["project"].value,
                date: currentDate,
                time: formData["time"].value
            }
        )
        .then((res) => {
            window.location.reload();
        });

    }

    render() {

        return (
            <>
                { this.isLoggedIn() ? "" : <Redirect to="/" /> }    
                <Navigation />
                <Container>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">My Timer Entries</h1>
                        <p className="lead">Here you may find your timer entries, and enter new ones.</p>

                        <hr/>

                        <h2 className="display-6">New Entry</h2>
                        <Form onSubmit={this.createTimer}>
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

                                <Form.Group as={Col} controlId="time">
                                    <Form.Label>Time (Sec.)</Form.Label>
                                    <Form.Control type="number" placeholder="1"></Form.Control>
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
                                    <th>Date</th>
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
                                                <td>{Object.values(this.state.timers)[i]["date"]}</td>
                                                <td>{Object.values(this.state.timers)[i]["timeInSeconds"]}</td>
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