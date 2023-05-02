import React from "react";
import SetGradesButton from "./SetGradesButton";
import Table from "react-bootstrap/Table";

const TableGrades = (props, course_id) => {
  console.log(props);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Full Name</th>
          <th>Grades </th>
          <th>SetGrades</th>
        </tr>
      </thead>
      <tbody>
        {props.students.map((student) => (
          <tr key={student.id}>
            <td>{student.user_id}</td>
            <td>{student.name}</td>
            <td>{student.total_grade}</td>
            <td>
              <SetGradesButton user_id={student.user_id} courseid={course_id}/>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableGrades;
