import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <>
      <Navigation />
      <Container>
        <div className="bg-light p-5 rounded-lg m-3">
          <h1 className="display-4">Fringed Lizard🦎</h1>
          <p className="lead">Welcome to the Project Time Tracker!</p>

          <ul>
            <li>Create an account, and manage accounts.</li>
            <li>Manage projects, clients, and timer entries.</li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Home;
