import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Alert, Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

import Navigation from "../components/Navigation";

class Signup extends React.Component {

    constructor() {
        super();

        this.state = {
            formRes: 0
        }
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("loggedIn");
        return loggedIn || false;
    }

    handleSignup = async (e) => {

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + '/user/signup', 
            {
                "firstName": formData["firstName"].value,
                "lastName": formData["lastName"].value,
                "email": formData["email"].value,
                "password": formData["password"].value,
                "password_confirm": formData["confirmPassword"].value
            }
        )
        .then((res) => { this.setState({ formRes: res.status }) })
        .catch((err) => { this.setState({ formRes: err.response.status }) });
    
    }

    render() {

        return (
            <>
                { this.isLoggedIn() ? <Redirect to="/" /> : "" }
                <Navigation />
                <Container style={{ margin: "3rem" }}>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">Sign Up</h1>
                        <p className="lead">By signing up, you will be able to manage projects and timer entries.</p>
                        {
                            this.state.formRes === 200 ? <Alert variant="success">Sign up successful! You may now <Alert.Link href="/login">log in</Alert.Link>.</Alert> :
                            this.state.formRes === 400 ? <Alert variant="danger">Your passwords do not match. Please try again.</Alert> :
                            this.state.formRes === 406 ? <Alert variant="danger">Your password is not secure enough, please see requirements below.</Alert> : 
                            this.state.formRes === 409 ? <Alert variant="danger">User with specified email already exists. Please use another.</Alert> :
                            this.state.formRes === 500 ? <Alert variant="warning">Something went wrong.</Alert> :
                            ""
                        }
                        {
                        this.state.formRes === 200 ? "" :
                        <Container className="p-2">
                            <Form className="p-3" onSubmit={this.handleSignup}>
                                <Row>
                                    <Form.Group as={Col} controlId="firstName" className="mb-3">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control placeholder="Enter your first name" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="lastName" className="mb-3">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control placeholder="Enter your last name" />
                                    </Form.Group>
                                </Row>

                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control placeholder="Enter your email address" />
                                    <Form.Text className="text-muted">We will never share your email address with anyone else.</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter a secure password" />
                                    <Form.Text className="text-muted">
                                        {
                                            "Must be at least 8 characters, with at least one number and one special character from the following list: ( ) ! @ $ & ^ ? /"
                                        }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Type your chosen password again" />
                                </Form.Group>
                                
                                <Button variant="primary" className="mt-3" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Container>
                        }
                    </div>
                </Container>
            </>
        )

    }
}

export default Signup;