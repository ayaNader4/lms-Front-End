import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../css/SetGrades.css";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../core/helper/Storage";
import axios from "axios";

const SetGradesButton = (props) => {
  console.log(props.user_id, props.assignments);
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = getAuthUser();

  let token = null;
  if (auth) token = auth.token;
  let url =
    "http://127.0.0.1:4000/instructor/students/course-students/assignments/";
  let method = "get";

  // assignments data
  const [assignments, setAssignments] = useState({
    loading: true,
    grades: [],
    total: null,
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
      params: { user_id: props.user_id },
    })
      .then((response) => {
        // console.log(response);
        setAssignments({
          ...assignments,
          grades: response.data.assignments,
          loading: false,
        });
      })
      .catch((errors) => {
        setAssignments({
          ...assignments,
          loading: false,
          err: errors.response.data.message,
        });
      });
  }, [assignments.reload]);
  // console.log(assignments);

  const [assignment, setAssignment] = useState({
    id: "",
    name: "",
    details: "",
    grade: "",
    err: "",
    loading: false,
    success: null,
  });

  // update assignment
  const updateAssignment = (e) => {
    setAssignment({ ...assignment, loading: true });
    e.preventDefault();
    console.log(assignment);
    const rawData = {
      id: assignment.id,
      name: assignment.name,
      details: assignment.details,
      grade: assignment.grade,
    };
    // const new_grades = arr.map(v => v.value)
    axios
      .put(
        "http://127.0.0.1:4000/instructor/students/course-students/assignments/student-grade/" +
          id,
        { grade: parseInt(assignment.grade) },
        {
          headers: {
            token: auth.token,
            "Content-Type": "application/json",
          },
          params: { user_id: props.user_id, assignment_id: assignment.id },
        }
      )
      .then((response) => {
        console.log(response);
        setAssignments({
          ...assignments,
          reload: assignments.reload + 1,
          err: null,
          loading: false,
          success: "Grades updated successfully!",
        });
        setAssignment({
          ...assignment,
          err: null,
          loading: false,
          success: "Grade updated successfully!",
        });
      })
      .catch((errors) => {
        setAssignments({
          ...assignments,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <>
      <Button
        variant="dark"
        value={id}
        onClick={(e) => {
          setAssignments({
            ...assignments,
            id: e.target.value,
          });
          handleShow();
        }}
      >
        SetGrades
      </Button>
      <Modal className="walaa" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Grades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateAssignment}>
            {assignments.grades.map((oneGrade) => (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                key={oneGrade.id}
              >
                <Form.Label>{oneGrade.name}</Form.Label>
                <Form.Control
                  type="number"
                  step="1"
                  placeholder="Grade"
                  defaultValue={oneGrade.grade}
                  onChange={(e) => {
                    oneGrade.grade = parseInt(e.target.value);
                    setAssignments({
                      ...assignments,
                    });
                  }}
                  /* autoFocus */
                />
                <Button
                  type="submit"
                  variant="dark"
                  onClick={(e) => {
                    setAssignments({
                      ...assignments,
                      reload: assignments.reload + 1,
                    });
                    setAssignment({
                      ...assignment,
                      id: oneGrade.id,
                      grade: oneGrade.grade,
                    });
                  }}
                >
                  Save Changes
                </Button>
              </Form.Group>
            ))}
            <Modal.Footer>
              <Button type="submit" variant="dark" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>{" "}
    </>
  );
};

export default SetGradesButton;
