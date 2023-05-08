import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/ManageCourses.css";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";
import { useParams } from "react-router-dom";

const AddAssignment = () => {
  let { id } = useParams();
  console.log(id);
  const auth = getAuthUser();
  let token = null;
  if (auth) token = auth.token;
  const [Assignment, setAssignment] = useState({
    loading: true,
    name:"",
    details:"",
    grade:"",
    loading: false,
    err: "",
    success: null,
  });

  const AssignmentFun = (e) => {
    e.preventDefault();
    setAssignment({ ...Assignment, loading: true, err: [] });
    axios
      .post(
        "http://127.0.0.1:4000/instructor/manage/add-assignments/"+id,
        {
          name: Assignment.name,
          details:Assignment.details,
          total_grade:Assignment.grade,
        },
        {
          headers: { token: auth.token },
        }
      )
      .then((response) => {
        console.log(response);
        setAssignment({
          ...Assignment,
          loading: false,
          err: "",
          success: response.data.message,
        });
      })
      .catch((errors) => {
        setAssignment({
          ...Assignment,
          loading: false,
          err: errors.response.data.message,
          success: null,
        });
      });
  };
  return (
    <div className="add-container">
      <h1>Add New Assignment</h1>
      {Assignment.err && (
        <Alert variant="danger" className="p-2">
          {Assignment.err}
        </Alert>
      )}
      {Assignment.success && (
        <Alert variant="success" className="p-2">
          {Assignment.success}
        </Alert>
      )}
      <Form onSubmit={AssignmentFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Assignment Name"
            required
            value={Assignment.name}
            onChange={(e) => setAssignment({ ...Assignment, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control
            type="text"
            placeholder="Details"
            required
            value={Assignment.details}
            onChange={(e) => setAssignment({ ...Assignment, details: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="grade"
            required
            value={Assignment.grade}
            onChange={(e) => setAssignment({ ...Assignment, grade: e.target.value })}
          />
        </Form.Group>

        <Button className="btn btn-dark w-90" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddAssignment;
