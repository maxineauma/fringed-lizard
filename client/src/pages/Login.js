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
            user: {}
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
        .then((res) => { 
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("loggedIn", 1);
            window.location.href = "/";
        })
        .catch((err) => { this.setState({ formRes: err.response.status }) });

    }

    render() { 

        return (
            <>
                { this.isLoggedIn() ? <Redirect to="/" /> : "" }
                <Navigation />
                <Container>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">Log In</h1>
                        <p className="lead">By logging in, you will be able to manage your timer entries.</p>
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