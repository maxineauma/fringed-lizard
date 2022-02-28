import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "../components/Navigation";
import ProjectPanel from "../components/ProjectPanel";
import ClientPanel from "../components/ClientPanel";

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
                        <h1 className="display-4">Management Panel 🧰</h1>
                        <p className="lead">Here you may edit users, clients, projects, and entries.</p>

                        <hr />

                        <Container className="p-2">
                            <h2 className="display-6">Project Management</h2>
                            <p className="lead">Assign a new project to a consultant.</p>
                            <ProjectPanel />
                        </Container>

                        <hr />

                        <Container className="p-2">
                            <h2 className="display-6">Client Management</h2>
                            <p className="lead">Assign a new client.</p>
                            <ClientPanel />
                        </Container>

                    </div>
                </Container>
            </>
        )

    }
}

export default Manage;