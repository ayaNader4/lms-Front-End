import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../css/SetGrades.css";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../core/helper/Storage";
import axios from "axios";

const SetGradesButton = (user_id, courseid) => {
  console.log(user_id, courseid);
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
      url: url + courseid,
      headers: { token: token },
      params: { user_id: user_id },
    })
      .then((response) => {
        // console.log(response);

        setAssignments({
          ...assignments,
          assignments_result: response.data.assignments,
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
  console.log(assignments);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        SetGrades
      </Button>

      <Modal className="walaa" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SetGrades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/*  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">  */}
            {/* <Form.Label>MidTerm Grade</Form.Label> */}
            {/*  <Form.Control
               /*  type="email" *
                 placeholder="MidTerm Grade" /> */}
            {/*  /* autoFocus */}

            {/*   /* </Form.Group>  */}

            {/* 


           {/*  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"> *
              <Form.Label>MidTerm Grade</Form.Label>
              <Form.Control
               /*  type="email" *
                 placeholder="MidTerm Grade" >
                /* autoFocus *
              />
           {/*  </Form.Group> *
                 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Assigments Grade</Form.Label>
              <Form.Control
               /*  type="email" *
                placeholder="Assigments Grade"
                /* autoFocus *
              />
            </Form.Group>




            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Project Grade</Form.Label>
              <Form.Control
               /*  type="email" *
                placeholder="Project Grade"
                /* autoFocus *
              />
            </Form.Group>










            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Final Grade</Form.Label>
              <Form.Control /* as="Final grade" *rows={1} />
            </Form.Group>




             */}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetGradesButton;
