import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Image from "../../core/data/b4630a60e57d000f7e2533473e0716ce.jpg";
import "../../css/ManageCourses.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ManageCourses = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const auth = getAuthUser();
  let token = null;
  if (auth) token = auth.token;
  let url = "http://localhost:4000/admin/courses/update-courses/";

  const [Courses, setCourses] = useState({
    id: "",
    name: "",
    code: "",
    description: "",
    image_url: "",
    prerequisite: null,
    loading: false,
    err: "",
    success: null,
  });
  const [course, getCourses] = useState({
    loading: true,
    results: [],
    err: "",
    reload: 0,
    success: null,
  });

  const handleSelect = (evtKey, evt) => {
    // Get the selectedIndex in the evtKey variable
    console.log(evtKey);
    if (evtKey !== "") setCourses({ ...Courses, prerequisite: evtKey });
    // console.log(evt);
  };
  const CoursesFun = (e) => {
    e.preventDefault();
    setCourses({ ...Courses, loading: true });
    console.log(Courses);
    axios
      .put(
        url + Courses.id,
        {
          name: Courses.name,
          code: Courses.code,
          description: Courses.description,
          image_url: Courses.image_url,
          prerequisite: Courses.prerequisite,
        },
        {
          headers: { token: auth.token },
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
        getCourses({ ...course, reload: course.reload + 1 });
        setCourses({
          ...Courses,
          loading: false,
          err: "",
          success: response.data.message,
        });
      })
      .catch((errors) => {
        getCourses({ ...course, reload: course.reload + 1 });
        setCourses({
          ...Courses,
          loading: false,
          err: errors.response.data.errors,
          success: null,
        });
      });
  };
  useEffect(() => {
    getCourses({ ...course, loading: true });
    axios
      .get("http://localhost:4000/admin/courses/courses", {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);
        getCourses({
          ...course,
          results: response.data,
          loading: false,
          err: null,
        });
      })
      .catch((errors) => {
        console.log(errors);
        getCourses({
          ...course,
          loading: false,
          err: errors.response.data.message,
        });
      });
  }, [course.reload]);
  const deleteCourse = (course_id) => {
    axios
      .delete("http://localhost:4000/admin/courses/delete/" + course_id, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        getCourses({ ...course, reload: course.reload + 1 });
        setCourses({
          ...Courses,
          success: response.data.message,
        });
      })
      .catch((errors) => {
        getCourses({ ...course, reload: course.reload + 1 });
        setCourses({
          ...Courses,
          success: null,
          err: errors.response.data.message,
        });
      });
  };

  return (
    <div className="manage-courses p-5 bg-white text-black">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center mb-3">Manage Courses</h3>
        <Link to={"add-courses"} className="btn btn-dark">
          Add New Course
        </Link>
      </div>

      {Courses.err && (
        <Alert variant="danger" className="p-2">
          {Courses.err}
        </Alert>
      )}
      {Courses.success && (
        <Alert variant="success" className="p-2">
          {Courses.success}
        </Alert>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>code</th>
            <th>Description</th>
            <th>Prerequisites</th>
            <th>instructor</th>
            <th>Action</th>
          </tr>
        </thead>
        {course.results.map((c) => (
          <tbody>
            <tr>
              <td>{c.id}</td>
              <td>
                <img src={Image} alt="" className="image-avatar"></img>
              </td>
              <td>{c.name}</td>
              <td>{c.code}</td>
              <td>{c.description}</td>
              <td>{c.prerequisite}</td>
              <td>{c.instructor_name}</td>
              <td>
                <Button
                  variant="dark"
                  data-toggle="modal"
                  data-target="add-modal"
                  value={c.id}
                  onClick={(e) => {
                    setCourses({
                      ...Courses,
                      id: e.target.value,
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
                    <Modal.Title>Update Courses</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={CoursesFun}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Course Name"
                          required
                          value={Courses.name}
                          onChange={(e) =>
                            setCourses({ ...Courses, name: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          rows={4}
                          required
                          value={Courses.description}
                          onChange={(e) =>
                            setCourses({
                              ...Courses,
                              description: e.target.value,
                            })
                          }
                        ></textarea>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="code"
                          required
                          value={Courses.code}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            setCourses({ ...Courses, code: e.target.value });
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <div>
                          <DropdownButton
                            id="dropdown-basic-button "
                            variant="secondary"
                            title="Prerequisites"
                            onSelect={handleSelect}
                          >
                            {course.results.map((course) => (
                              <Dropdown.Item eventKey={course.name}>
                                {course.name}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <input
                          type="file"
                          className="form-control"
                          value={Courses.image_url}
                          onChange={(e) =>
                            setCourses({
                              ...Courses,
                              image_url: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Modal.Footer>
                        <Button
                          type="submit"
                          variant="dark"
                          onClick={handleClose}
                          //   value={user.id}
                          //   onClick={(e) =>
                          //     setCourses({
                          //       ...Courses,
                          //       id: e.target.value,
                          //     })
                          //   }
                          //   onClick={(e) => {
                          //     CoursesFun(e);
                          //   }}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Body>
                </Modal>{" "}
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deleteCourse(c.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ManageCourses;
