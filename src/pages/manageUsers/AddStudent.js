import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/ManageUsers.css";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";

const Addstudent = () => {
  const auth = getAuthUser();
  const [student, setStudent] = useState({
    email: "",
    loading: false,
    err: "",
    success: null,
  });
  const studentFun = (e) => {
    console.log(student);

    e.preventDefault();
    setStudent({ ...student, loading: true, err: [] });
    console.log("student fun 1");
    axios
      .post(
        "http://localhost:4000/admin/students/add-student",
        {
          email: student.email,
        },
        {
          headers: { token: auth.token },
        }
      )
      .then((response) => {
        console.log(response);
        setStudent({
          ...student,
          loading: false,
          err: "",
          success: response.data.message,
        });
      })
      .catch((errors) => {
        setStudent({
          ...student,
          loading: false,
          err: errors.response.data.message,
          success: null,
        });
      });
  };
  return (
    <div className="add-container">
      <h1>Add New Student</h1>
      {student.err&&(<Alert variant="danger" className="p-2">
        {student.err}
      </Alert>)}
      {student.success&&(<Alert variant="success" className="p-2">
        {student.success}
      </Alert>)}
      <Form onSubmit={studentFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
          />
        </Form.Group>

        <Button className="btn btn-dark w-90" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default Addstudent;
