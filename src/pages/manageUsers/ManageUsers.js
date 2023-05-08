import React, { useState, useEffect } from "react";
import Image from "../../core/data/588b0c601b6f7444c5fc9e347b252835.jpg";
import Table from "react-bootstrap/Table";
import "../../css/ManageUsers.css";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ManageUsers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = getAuthUser();
  let url = "http://localhost:4000/admin/manage/update-instructor/";

  const [instructor, setInstructor] = useState({
    id: "",
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
    setInstructor({ ...instructor, loading: true });

    console.log(url + instructor.id);
    axios
      .put(
        url + instructor.id,
        {
          name: instructor.name,
          password: instructor.password,
          phone: instructor.phone,
          old_course: instructor.old_course,
          new_course: instructor.new_course,
        },
        {
          headers: { token: auth.token },
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
        setUsers({ ...users, response: users.reponse + 1 });

        setInstructor({
          ...instructor,
          name: response.data.instructor.name,
          phone: response.data.instructor.phone,
          loading: false,
          err: "",
          success: response.data.message,
        });
      })
      .catch((errors) => {
        setInstructor({
          ...instructor,
          loading: false,
          err: errors.response.data.errors,
          success: null,
        });
      });
  };
  let token = null;
  if (auth) token = auth.token;
  const [users, setUsers] = useState({
    loading: true,
    results: [],
    err: "",
    reload: 0,
    success: null,
  });

  const deleteUser = (user_id) => {
    axios
      .delete("http://localhost:4000/admin/manage/delete/" + user_id, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setUsers({
          ...users,
          reload: users.reload + 1,
          success: response.data.message,
        });
      })
      .catch((errors) => {
        setUsers({
          ...users,
          reload: users.reload + 1,
          success: null,
          err: errors.response.data.message,
        });
      });
  };

  useEffect(() => {
    setUsers({ ...users, loading: true });
    axios
      .get("http://localhost:4000/admin/manage/", {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);
        setUsers({
          ...users,
          results: response.data,
          loading: false,
          err: null,
        });
      })
      .catch((errors) => {
        console.log(errors);
        setUsers({
          ...users,
          loading: false,
          err: errors.response.data.message,
        });
      });
  }, [users.reload]);

  return (
    <div className="manage-usersetUsers p-5 bg-white text-black">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center mb-3">Manage Users</h3>
        <div className="header d-flex justify-content-between">
          <Link to={"add-student"} className="btn btn-dark">
            Add New Student
          </Link>
          <Link to={"add-instructor"} className="btn btn-dark">
            Add New Instuctors
          </Link>
        </div>
      </div>

      {users.err && (
        <Alert variant="danger" className="p-2">
          {users.err}
        </Alert>
      )}
      {users.success && (
        <Alert variant="success" className="p-2">
          {users.success}
        </Alert>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        {users.results.map((user) => (
          <tbody key={user.id}>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>{" "}
                <Button
                  variant="dark"
                  data-toggle="modal"
                  data-target="add-modal"
                  value={user.id}
                  onClick={(e) => {
                    setInstructor({
                      ...instructor,
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
                    <Modal.Title>Update Instructor</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={instructorFun}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          required
                          value={instructor.name}
                          onChange={(e) =>
                            setInstructor({
                              ...instructor,
                              name: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phone Number"
                          required
                          value={instructor.phone}
                          onChange={(e) =>
                            setInstructor({
                              ...instructor,
                              phone: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          required
                          value={instructor.password}
                          onChange={(e) =>
                            setInstructor({
                              ...instructor,
                              password: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Old Course Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Old Course Name"
                          value={instructor.old_course}
                          onChange={(e) =>
                            setInstructor({
                              ...instructor,
                              old_course: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>New Course Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="New Course Name"
                          value={instructor.new_course}
                          onChange={(e) =>
                            setInstructor({
                              ...instructor,
                              new_course: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Modal.Footer>
                        <Button
                          type="submit"
                          variant="dark"
                          onClick={handleClose}
                          // value={user.id}
                          // onClick={(e) =>
                          //   setInstructor({
                          //     ...instructor,
                          //     id: e.target.value,
                          //   })
                          // }
                          // onClick={(e) => {
                          //   instructorFun(e);
                          // }}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Body>
                </Modal>{" "}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ManageUsers;
