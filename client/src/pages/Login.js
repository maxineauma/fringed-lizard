import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Alert, Form, Button } from "react-bootstrap";
import axios from "axios";

import Navigation from "../components/Navigation";

class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            formRes: 0,
            userName: ""
        }
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("loggedIn");
        return loggedIn || false;
    }

    handleLogin = async (e) => {

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + '/user/login',
            {
                "email": formData["email"].value,
                "password": formData["password"].value
            }
        )
        .then((res) => { this.setState(
                { 
                    formRes: res.status, 
                    userName: JSON.parse(JSON.stringify(res)).data.name
                }
            ) 
        })
        .catch((err) => { this.setState({ formRes: err.response.status }) });

        localStorage.loggedIn = true;
        localStorage.username = this.state.userName;

    }

    render() { 

        return (
            <>
                { this.isLoggedIn() ? <Redirect to="/" /> : "" }
                <Navigation />
                <Container style={{ margin: "3rem" }}>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">Log In</h1>
                        <p className="lead">By logging in, you will be able to manage projects and timer entries.</p>
                        {
                            this.state.formRes === 200 ? <Redirect to="/" /> :
                            this.state.formRes === 400 ? <Alert variant="danger">Incorrect password. Please try again.</Alert> :
                            this.state.formRes === 409 ? <Alert variant="danger">User with specified email doesn't exist. Please use another.</Alert> :
                            this.state.formRes === 500 ? <Alert variant="warning">Something went wrong.</Alert> :
                            ""
                        }
                        <Container className="p-2">
                            <Form className="p-3" onSubmit={this.handleLogin}>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control placeholder="Enter your email address" />
                                    <Form.Text className="text-muted">We will never share your email address with anyone else.</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                
                                <Button variant="primary" className="mt-3" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </Container>
            </>
        )

    }
}

export default Login;