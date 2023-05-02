import React, { useState, useEffect } from "react";
import SetGradesButton from "./SetGradesButton";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import SetAssignments from "./SetAssigments";

const AssignmentTable = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Assignment ID</th>
          <th>Name</th>
          <th>Details</th>
          <th>Total Grade </th>
          <th>Edit Assignment</th>
        </tr>
      </thead>
      <tbody>
        {props.assignments.map((assignment) => (
          <tr key={assignment.id}>
            <td>{assignment.id}</td>
            <td>{assignment.name}</td>
            <td>{assignment.details}</td>
            <td>{assignment.total_grade}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AssignmentTable;
