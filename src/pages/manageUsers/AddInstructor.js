import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/ManageUsers.css";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";

const AddInstructor = () => {
  const auth = getAuthUser();
  const [instructor, setInstructor] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    courses: "",
    loading: false,
    err: "",
    success: null,
  });
  const instructorFun = (e) => {
    e.preventDefault();
    setInstructor({ ...instructor, loading: true, err: [] });
    axios
      .post(
        "http://localhost:4000/admin/manage/add-instructor",
        {
          name: instructor.name,
          email: instructor.email,
          password: instructor.password,
          phone: instructor.phone,
          courses: instructor.courses,
        },
        {
          headers: { token: auth.token },
        }
      )
      .then((response) => {
        console.log(response);
        setInstructor({
          ...instructor,
          loading: false,
          err: "",
          success: response.data.message,
        });
      })
      .catch((errors) => {
        setInstructor({
          ...instructor,
          loading: false,
          err: errors.response.data.message,
          success: null,
        });
      });
  };
  return (
    <div className="add-container">
      <h1>Add New Instructor</h1>
      {instructor.err && (
        <Alert variant="danger" className="p-2">
          {instructor.err}
        </Alert>
      )}
      {instructor.success && (
        <Alert variant="success" className="p-2">
          {instructor.success}
        </Alert>
      )}
      <Form onSubmit={instructorFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Instructor Name"
            required
            value={instructor.name}
            onChange={(e) => setInstructor({ ...instructor, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Phone Number"
            required
            value={instructor.phone}
            onChange={(e) => setInstructor({ ...instructor, phone: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={instructor.email}
            onChange={(e) => setInstructor({ ...instructor, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={instructor.password}
            onChange={(e) => setInstructor({ ...instructor, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Course Name"
            required
            value={instructor.courses}
            onChange={(e) => setInstructor({ ...instructor, courses: e.target.value })}
          />
        </Form.Group>
        <Button className="btn btn-dark w-90" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddInstructor;
