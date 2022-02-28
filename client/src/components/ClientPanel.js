import React from "react";
import axios from "axios";
import { Form, Row, Col, Button } from "react-bootstrap";

class ClientPanel extends React.Component {

    createClient = async (e) => {

        let formData = e.target;
        e.preventDefault();

        await axios.post(process.env.REACT_APP_API_URL + "/client", 
            {
                companyName: formData["companyName"].value,
                email: formData["email"].value
            }
        )
        .then((res) => {
            window.location.reload();
        });

    }

    render() {

        return(

            <>
               <Form className="p-3" onSubmit={this.createClient}>
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