import React from "react";
import axios from "axios";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

class UserPanel extends React.Component {

    constructor() { 

        super();

        this.state = {
            users: {},
            clients: {},
            formRes: 0
        };

    }

    async componentDidMount() {
        await this.listUsers();
        await this.listClients();
    }

    listUsers = async () => {
        await axios.get(process.env.REACT_APP_API_URL + "/user")
        .then((res) => { this.setState({ users: res.data.allUsers }); })
        .catch((err) => { this.setState({ users: {} }); });
    }

    listClients = async () => {
        await axios.get(process.env.REACT_APP_API_URL + "/client")
        .then((res) => { this.setState({ clients: res.data.allClients }); })
        .catch((err) => { this.setState({ clients: {} }); });
    }

    createProject = async (e) => {

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + "/project", 
            {
                email: formData["email"].value,
                project: formData["project"].value,
                client: formData["client"].value
            }
        )
        .then((res) => { window.location.reload(); })
        .catch((err) => { this.setState({ formRes: err.response.status }) });

    }

    render() {

        return(

            <>
                <Form className="p-3" onSubmit={this.createProject}>
                    <h4 className="display-8 mb-3">Assign a project to a client/consultant pair.</h4>
                    {
                        this.state.formRes === 409 ? <Alert variant="danger"><b>Err:</b> User has already been assigned this project.</Alert> :
                        ""
                    }
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Assigned Consultant</Form.Label>
                            <Form.Select>
                                {
                                    Object.values(this.state.users).map((u, i) => {
                                        return(
                                            <option value={Object.values(this.state.users)[i]["email"]}>{Object.values(this.state.users)[i]["firstName"] + " " + Object.values(this.state.users)[i]["lastName"]  + " " + "(" + Object.values(this.state.users)[i]["email"] + ")"}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="client">
                            <Form.Label>Client</Form.Label>
                            <Form.Select>
                                {
                                    Object.values(this.state.clients).map((u, i) => {
                                        return(
                                            <option>{Object.values(this.state.clients)[i]["companyName"]}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group controlId="project" className="mb-3">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control placeholder="Provide the project's name" />
                    </Form.Group>

                    <Button type="primary" className="mt-3" type="submit">
                        Assign
                    </Button>
                </Form>

            </>

        )

    }

}

export default UserPanel;