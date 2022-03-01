import React from "react";
import { Table } from "react-bootstrap";

import { listUsers, getUserReport } from "../api";

class ClientPanel extends React.Component {
  constructor() {
    super();

    this.state = {
      users: {},
      formRes: 0,
    };
  }

  async componentDidMount() {
    await this.handleListUsers();
  }

  handleListUsers = async () =>
    await listUsers().then((res) => {
      this.setState({ users: res.data.allUsers });
    });

  handleGetUserReport = async (id) =>
    await getUserReport(id).then(async (res) => {
      const elem = document.createElement("a");
      const data = res.data;
      elem.href = URL.createObjectURL(data);
      elem.download = "report.pdf";
      elem.click();
    });

  render() {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Consultant Name</th>
              <th>Consultant Email</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.state.users).map((p, i) => {
              return (
                <tr>
                  <td>{Object.values(this.state.users)[i]["_id"]}</td>
                  <td>
                    {Object.values(this.state.users)[i]["firstName"] +
                      " " +
                      Object.values(this.state.users)[i]["lastName"]}
                  </td>
                  <td>{Object.values(this.state.users)[i]["email"]}</td>
                  <td>
                    <a
                      href="#"
                      onClick={() =>
                        this.handleGetUserReport(
                          Object.values(this.state.users)[i]["_id"]
                        )
                      }
                    >
                      Generate Report
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ClientPanel;