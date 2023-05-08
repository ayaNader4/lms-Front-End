import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../css/SetGrades.css";
import { getAuthUser } from "../../core/helper/Storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import SetAssigments from "./SetAssigments";
import { useParams } from "react-router-dom";

const SetAssigmentsButton = (modalMode, title) => {
  console.log(title);
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = getAuthUser();

  let token = null;
  if (auth) token = auth.token;

  let url = "http://127.0.0.1:4000/instructor/manage/courses/";
  let method = "get";

  // assignments data
  const [assignments, setAssignments] = useState({
    loading: true,
    course_result: [],
    assignments_result: [],
    err: null,
    reload: 0,
  });

  // get the assignments while refreshing the page
  useEffect(() => {
    setAssignments({ ...assignments, loading: true });
    axios({
      method: method,
      url: url + id,
      headers: { token: token },
    })
      .then((response) => {
        // console.log(response);

        setAssignments({
          ...assignments,
          course_result: response.data.course,
          assignments_result: response.data.assignments,
          loading: false,
        });
      })
      .catch((errors) => {
        setAssignments({
          ...assignments,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  }, [assignments.reload]);

  // form data for the assignment to be entered
  const [assignment, setAssignment] = useState({
    name: "",
    details: "",
    total_grade: "",
    err: "",
    loading: false,
    success: null,
  });

  
  // create assignment
  const createAssignment = (e) => {
    e.preventDefault();

    setAssignment({ ...assignment, loading: true });

    const rawData = {
      name: assignment.name,
      details: assignment.details,
      total_grade: assignment.total_grade,
    };
    axios
      .post(
        "http://127.0.0.1:4000/instructor/manage/add-assignments/" + id,
        rawData,
        {
          headers: {
            token: auth.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setAssignments({ ...assignments, reload: assignments.reload + 1 });
        setAssignment({
          name: "",
          details: "",
          total_grade: "",
          err: null,
          loading: false,
          success: "Assignment added successfully!",
        });
      })
      .catch((errors) => {
        setAssignment({
          ...assignment,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };


  // update assignment
  const updateAssignment = (assignment_id) => {
    setAssignment({ ...assignment, loading: true });

    const rawData = {
      name: assignment.name,
      details: assignment.details,
      total_grade: assignment.total_grade,
    };
    axios
      .put("http://127.0.0.1:4000/instructor/manage/update/" + id, rawData, {
        headers: {
          token: auth.token,
          "Content-Type": "application/json",
        },
        params: { assignment_id: assignment_id },
      })
      .then((response) => {
        console.log(response);
        setAssignments({ ...assignments, reload: assignments.reload + 1 });
        setAssignment({
          name: response.assignment.name,
          details: response.assignment.details,
          total_grade: response.assignment.total_grade,
          err: null,
          loading: false,
          success: "Movie updated successfully!",
        });
      })
      .catch((errors) => {
        setAssignment({
          ...assignment,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  console.log(modalMode);

  return (
    <>
      <Modal className="walaa" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode} Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={title}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                required
                value={assignment.name}
                onChange={(e) =>
                  setAssignment({ ...assignment, name: e.target.value })
                }
              />
              {/*  /* autoFocus */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Details"
                required
                value={assignment.details}
                onChange={(e) =>
                  setAssignment({ ...assignment, details: e.target.value })
                }

                /* autoFocus */
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                step="1"
                placeholder="Grade"
                required
                value={assignment.total_grade}
                onChange={(e) =>
                  setAssignment({ ...assignment, total_grade: e.target.value })
                }
                /* autoFocus */
              />
            </Form.Group>
            
            <Modal.Footer>
              <Button type="submit" variant="dark">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {assignment.err && (
        <Alert variant="danger" className="p-2">
          {assignment.err}
        </Alert>
      )}

      {assignment.success && (
        <Alert variant="success" className="p-2">
          {assignment.success}
        </Alert>
      )}
    </>
  );
};
export default SetAssigmentsButton;
