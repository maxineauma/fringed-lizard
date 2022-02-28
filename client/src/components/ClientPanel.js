import React from "react";
import axios from "axios";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

class ClientPanel extends React.Component {

    constructor() { 

        super();

        this.state = {
            formRes: 0
        };

    }

    createClient = async (e) => {

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + "/client", 
            {
                companyName: formData["companyName"].value,
                email: formData["email"].value
            }
        )
        .then((res) => { window.location.reload(); })
        .catch((err) => { this.setState({ formRes: err.response.status }) });

    }

    render() {

        return(

            <>
               <Form className="p-3" onSubmit={this.createClient}>
                    <h4 className="display-8 mb-3">Assign a new client.</h4>
                    {
                        this.state.formRes === 409 ? <Alert variant="danger"><b>Err:</b> Client already exists.</Alert> :
                        ""
                    }
                    <Row>
                        <Form.Group as={Col} controlId="companyName" className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control placeholder="Enter client's name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="email" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                        <Form.Control placeholder="Enter client's email address" />

                    </Form.Group>
                    </Row>
                    
                    <Button variant="primary" className="mt-3" type="submit">
                        Assign
                    </Button>
            </Form>
            </>

        )

    }

}

export default ClientPanel;