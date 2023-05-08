import React, { useState, useEffect } from "react";
import SetGradesButton from "./SetGradesButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../css/SetGrades.css";
import Table from "react-bootstrap/Table";
import SetAssigmentsButton from "./SetAssigmentButton";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../core/helper/Storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
// import { ModalN, ModalOpenButton, ModalContents } from "../../core/helper/modal";

const SetAssigments = () => {
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

  // delete assignment
  const deleteAssignment = (assignment_id) => {
    axios
      .delete("http://127.0.0.1:4000/instructor/manage/delete/" + id, {
        headers: {
          token: auth.token,
        },
        params: { assignment_id: assignment_id },
      })
      .then((resp) => {
        setAssignments({ ...assignments, reload: assignments.reload + 1 });
      })
      .catch((err) => {});
  };

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
  const updateAssignment = (e) => {
    setAssignment({ ...assignment, loading: true });
    console.log(assignment);
    e.preventDefault();
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
        params: { assignment_id: assignment.id },
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
        });
      });
  };

  console.log(assignments);
  return (
    <>
      <div className="course-details-container p-5  bg-white text-black">
        {/* Loader */}
        {assignments.loading === true && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* display course info  */}
        <div className="row">
          <div className="col-4">
            <img
              className="course-image"
              src={assignments.course_result.image_url}
              alt={assignments.course_result.name}
            />
            {/* <div className="col-4">
              <img className="course-image" src={Image} alt="" />
            </div> */}
          </div>
          <div className="col-8">
            <h2 className="mt-5 text-center">
              {assignments.course_result.name}
            </h2>
            <br />
            <h4> {assignments.course_result.description}</h4>
          </div>
          {/* add assignment button  */}
          <div className="sb">
            <Link
              to={{
                pathname: "/add-assignment/"+id,
              }}
              className="btn btn-dark"
            >
              Add Assignment
            </Link>
          </div>

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
          {/* display assignments  */}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Details</th>
                <th>Total Grade </th>
                <th>Edit Assignment</th>
              </tr>
            </thead>
            <tbody>
              {assignments.assignments_result.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.details}</td>
                  <td>{a.total_grade}</td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={(e) => {
                        deleteAssignment(a.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      /*   role="upd" */
                      className="ml-20"
                      variant="dark"
                      data-toggle="modal"
                      data-target="#update-modal"
                      onClick={(e) => {
                        setAssignment({
                          ...assignment,
                          id: a.id,
                          name: a.name,
                          details: a.details,
                          total_grade: a.total_grade,
                        });
                        handleShow();
                      }}
                    >
                      Update
                    </Button>
                    <Modal
                      id="add-modal"
                      className="walaa"
                      show={show}
                      onHide={handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Update Assignment</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={updateAssignment}>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              required
                              defaultValue={assignment.name}
                              onChange={(e) =>
                                setAssignment({
                                  ...assignment,
                                  name: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Details"
                              required
                              defaultValue={assignment.details}
                              onChange={(e) =>
                                setAssignment({
                                  ...assignment,
                                  details: e.target.value,
                                })
                              }

                              /* autoFocus */
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Grade</Form.Label>
                            <Form.Control
                              type="number"
                              step="1"
                              placeholder="Grade"
                              required
                              defaultValue={assignment.total_grade}
                              onChange={(e) =>
                                setAssignment({
                                  ...assignment,
                                  total_grade: e.target.value,
                                })
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
                    </Modal>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <AssignmentTable assignments={assignments.assignments_result} /> */}
        </div>
      </div>
    </>
  );
};

export default SetAssigments;
