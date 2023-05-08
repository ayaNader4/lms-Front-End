import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/ManageUsers.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";

const UpdateUsers = () => {
  let { id } = useParams();
  let url = "http://localhost:4000/admin/manage/update-instructor/";
  const auth = getAuthUser();
  const [instructor, setInstructor] = useState({
    name: "",
    password: "",
    phone: "",
    old_course: "",
    new_course: "",
    loading: false,
    err: "",
    success: null,
  });
  const instructorFun = (e) => {
    e.preventDefault();
    setInstructor({ ...instructor, loading: true, err: [] });
    axios
      .put(
        url + id,
        {
          name: instructor.name,
          password: instructor.password,
          phone: instructor.phone,
          old_course: instructor.old_course,
          new_course: instructor.new_course,
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
    <div className="add-container ">
      <h1>Update Instructor</h1>
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
            onChange={(e) =>
              setInstructor({ ...instructor, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Phone Number"
            required
            value={instructor.phone}
            onChange={(e) =>
              setInstructor({ ...instructor, phone: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={instructor.password}
            onChange={(e) =>
              setInstructor({ ...instructor, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Old Course Name"
            required
            value={instructor.old_course}
            onChange={(e) =>
              setInstructor({ ...instructor, old_course: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="New Course Name"
            required
            value={instructor.new_course}
            onChange={(e) =>
              setInstructor({ ...instructor, new_course: e.target.value })
            }
          />
        </Form.Group>
        <Button className="btn btn-dark w-90" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUsers;
