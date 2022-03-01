import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Alert, Form, Button } from "react-bootstrap";

import Navigation from "../components/Navigation";
import { handleLogin } from "../api";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      formRes: 0,
    };
  }

  isLoggedIn = () => {
    return localStorage.getItem("user") || false;
  };

  handleSubmitLogin = async (e) => {
    let formData = e.target;
    e.preventDefault();

    await handleLogin({
      email: formData["email"].value,
      password: formData["password"].value,
    })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/";
      })
      .catch((err) => {
        this.setState({
          formRes: err.response.status,
        });
      });
  };

  render() {
    return (
      <>
        {" "}
        {this.isLoggedIn() ? <Redirect to="/" /> : ""} <Navigation />
        <Container>
          <div className="bg-light p-5 rounded-lg m-3">
            <h1 className="display-4"> Log In </h1>{" "}
            <p className="lead">
              {" "}
              By logging in , you will be able to manage your timer entries.{" "}
            </p>{" "}
            {this.state.formRes === 200 ? (
              <Redirect to="/" />
            ) : this.state.formRes === 400 ? (
              <Alert variant="danger">
                {" "}
                <b> Err : </b> Incorrect password. Please try again.
              </Alert>
            ) : this.state.formRes === 409 ? (
              <Alert variant="danger">
                {" "}
                <b> Err : </b> User with specified email doesn't exist. Please
                use another.
              </Alert>
            ) : (
              ""
            )}{" "}
            <Container className="p-2">
              <Form className="p-3" onSubmit={this.handleSubmitLogin}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label> Email address </Form.Label>{" "}
                  <Form.Control placeholder="Enter your email address" />
                  <Form.Text className="text-muted">
                    {" "}
                    We will never share your email address with anyone else.{" "}
                  </Form.Text>{" "}
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label> Password </Form.Label>{" "}
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" className="mt-3" type="submit">
                  Log In{" "}
                </Button>{" "}
              </Form>{" "}
            </Container>{" "}
          </div>{" "}
        </Container>{" "}
      </>
    );
  }
}

export default Login;