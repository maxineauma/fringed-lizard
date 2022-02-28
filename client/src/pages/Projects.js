import React from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

import Navigation from "../components/Navigation";

class Projects extends React.Component {

    constructor() {

        super();

        this.state = {
            projects: {},
            formRes: 0
        }

    }

    async componentDidMount() {
        await this.listProjects();
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("loggedIn");
        return loggedIn || false;
    }

    listProjects = async () => {

        let userEmail = JSON.parse(localStorage.user).result.email;
        await axios.get(process.env.REACT_APP_API_URL + "/project/" + userEmail)
        .then((res) => { this.setState({ projects: res.data.projects }); })
        .catch((err) => { this.setState({ projects: {} }); });

    }

    /*createProject = async () => {

        let userEmail = JSON.parse(localStorage.user).result.email;
        let userToken = JSON.parse(localStorage.user).token;
        await axios.post(process.env.REACT_APP_API_URL + "/project", 
            {
                email: userEmail,
                project: "Test Project",
                client: "Test Client"
            },
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`
                },
            }
        )
        .then((res) => {
            console.log(res.data.newProject);
        });

    }*/

    render() {

        return (
            <>
                { this.isLoggedIn() ? "" : <Redirect to="/" /> }    
                <Navigation />
                <Container>
                    <div className="bg-light p-5 rounded-lg m-3">
                        <h1 className="display-4">My Projects</h1>
                        <p className="lead">Here you may find projects that you're assigned.</p>

                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Client</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.values(this.state.projects).map((p, i) => {
                                        return(
                                            <tr>
                                                <td>{Object.values(this.state.projects)[i]["_id"]}</td>
                                                <td>{Object.values(this.state.projects)[i]["project"]}</td>
                                                <td>{Object.values(this.state.projects)[i]["client"]}</td>
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

export default Projects;