import React, { Component } from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

import Navigation from "../components/Navigation";
import UserPanel from "../components/UserPanel";

class Manage extends React.Component {

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("loggedIn");
        return loggedIn || false;
    }

    render() { 

        return (
            <>
                { this.isLoggedIn() ? "" : <Redirect to="/" /> }
                <Navigation />
                <Container>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">Management Panel</h1>
                        <p className="lead">Here you may edit users, clients, projects, and entries.</p>

                        <hr />

                        <Container className="p-2">
                            <h2 className="display-6">User Panel</h2>
                            <UserPanel />
                        </Container>

                        <hr />

                        <Container className="p-2">
                            <h2 className="display-6">Client Panel</h2>
                        </Container>
                    </div>
                </Container>
            </>
        )

    }
}

export default Manage;