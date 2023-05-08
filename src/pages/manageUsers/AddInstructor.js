import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/ManageUsers.css";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
  const [courses, getCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const handleSelect = (evtKey, evt) => {
    // Get the selectedIndex in the evtKey variable
    console.log(evtKey);
    if (evtKey !== "") 
     setInstructor({ ...instructor, courses: evtKey });
    // console.log(evt);
  };
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
  useEffect(() => {
    getCourses({ ...courses, loading: true });
    axios
      .get("http://localhost:4000/admin/courses/courses", {
        headers: { token: auth.token },
      })
      .then((response) => {
        console.log(response);
        getCourses({ ...courses, results: response.data, loading: false });
      })
      .catch((errors) => {
        console.log(errors);
        getCourses({
          ...courses,
          loading: false,
          err: errors.response.data.message,
        });
      });
  }, [courses.reload]);
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
        <div>
            <DropdownButton
              id="dropdown-basic-button "
              variant="secondary"
              title="Course"
              onSelect={handleSelect}
            >
              {courses.results.map((course) => (
                <Dropdown.Item eventKey={course.name}>
                  {course.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            
          </div>
        <Button className="btn btn-dark w-90" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddInstructor;
