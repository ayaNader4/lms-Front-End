import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../../css/ManageCourses.css";
import DropDownList from "../../components/DropDownList";
import axios from "axios";
import { getAuthUser } from "../../core/helper/Storage";

const AddCourse = () => {
  const auth = getAuthUser();
  let token = null;
  if (auth) token = auth.token;
  const [courses, getCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const handleSelect = (evtKey, evt) => {
    // Get the selectedIndex in the evtKey variable
    console.log(evtKey);
    if (evtKey !== "") setCourse({ ...Course, prerequisite: evtKey });
    // console.log(evt);
  };

  useEffect(() => {
    getCourses({ ...courses, loading: true });
    axios
      .get("http://localhost:4000/admin/courses/courses", {
        headers: { token: token },
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

  const [Course, setCourse] = useState({
    name: "",
    code: "",
    description: "",
    image_url: "",
    prerequisite: null,
    instructor: "",
    loading: false,
    err: "",
    success: null,
  });
  const CourseFun = (e) => {
    e.preventDefault();
    setCourse({ ...Course, loading: true, err: [] });
    axios
      .post(
        "http://127.0.0.1:4000/admin/courses/add-course",
        {
          name: Course.name,
          code: Course.code,
          description: Course.description,
          image_url: Course.image_url,
          prerequisite: Course.prerequisite,
          instructor_id: Course.instructor,
        },
        {
          headers: { token: auth.token },
        }
      )
      .then((response) => {
        console.log(response);
        setCourse({
          ...Course,
          loading: false,
          err: "",
          success: response.data.message,
        });
      })
      .catch((errors) => {
        setCourse({
          ...Course,
          loading: false,
          err: errors.response.data.message,
          success: null,
        });
      });
  };
  return (
    <div className="add-container">
      <h1>Add New Course</h1>
      {Course.err && (
        <Alert variant="danger" className="p-2">
          {Course.err}
        </Alert>
      )}
      {Course.success && (
        <Alert variant="success" className="p-2">
          {Course.success}
        </Alert>
      )}
      <Form onSubmit={CourseFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Course Name"
            required
            value={Course.name}
            onChange={(e) => setCourse({ ...Course, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            rows={4}
            required
            value={Course.description}
            onChange={(e) =>
              setCourse({ ...Course, description: e.target.value })
            }
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="code"
            required
            value={Course.code}
            onChange={(e) => setCourse({ ...Course, code: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="instructor"
            value={Course.instructor}
            onChange={(e) =>
              setCourse({ ...Course, instructor: e.target.value })
            }
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
              {courses.results.map((course) => (
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
            value={Course.image_url}
            onChange={(e) =>
              setCourse({ ...Course, image_url: e.target.value })
            }
          />
        </Form.Group>

        <Button className="btn btn-dark w-90" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;
