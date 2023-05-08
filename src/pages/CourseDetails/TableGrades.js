import React from "react";
import SetGradesButton from "./SetGradesButton";
import Table from "react-bootstrap/Table";

const TableGrades = (props) => {
  console.log(props);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Full Name</th>
          <th>Grades </th>
          <th>Modify Grades</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map((student) => (
          <tr key={student.user_id}>
            <td>{student.user_id}</td>
            <td>{student.name}</td>
            <td>{student.total_grade}</td>
            <td>
              <SetGradesButton user_id={student.user_id} assignments={props.assignments} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableGrades;
