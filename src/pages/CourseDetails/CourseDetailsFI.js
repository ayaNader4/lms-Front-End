import React, { useState, useEffect } from "react";
import "./../../css/CourseDetails.css";
import "./../../HTML/CourseDetails.html";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import SetGradesButton from "./SetGradesButton";
import SetAssigments from "./SetAssigments";
import TableGrades from "./TableGrades";
import Image from "../../core/data/a652bd3cfb5e4378d94d5fa17627dae1.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../core/helper/Storage";
import { Link } from "react-router-dom";

const CourseDetailsFI = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = getAuthUser();

  let token = null;
  let { id } = useParams();
  if (auth) token = auth.token;
  console.log(token);
  let url = "http://localhost:4000/course/";//student
  let method = "get";
  if (auth.type === "instructor") {
    method = "put";
    url = "http://localhost:4000/instructor/students/course-students/";
  }

  const [course, setCourse] = useState({
    loading: true,
    course_result: [],
    assignments_result: [],
    students_result: [],
    passed: "",
    err: null,
  });

  useEffect(() => {
    setCourse({ ...course, loading: true });

    console.log(url + id);
    axios({
      method: "get",
      url: url + id,
      headers: { token: token },
    })
      .then((response) => {
        console.log(response);

        setCourse({
          ...course,
          course_result: response.data.course,
          assignments_result: response.data.assignments,
          students_result: response.data.students,
          passed: response.data.isPassed,
          loading: false,
        });
        console.log(course);
      })
      .catch((errors) => {
        setCourse({
          ...course,
          loading: false,
          err: "Something went wrong, please check the course name entered",
        });
      });
  }, []);

  // create assignment
  const registerCourse = (e) => {
    e.preventDefault();

    setCourse({ ...course, loading: true });
    axios
      .post(
        "http://127.0.0.1:4000/course/" + id,
        {},
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCourse({
          ...course,
          err: null,
          loading: false,
          success: "Course registered successfully!",
          reload: course.reload + 1,
        });
      })
      .catch((errors) => {
        setCourse({
          ...course,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };
  console.log(auth.type);
  return (
    <div className="course-details-container p-5  bg-white text-black">
      {/* Loader */}
      {course.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <div className="row">
        <div className="col-4">
          <img
            className="course-image"
            src={course.course_result.image_url}
            alt={course.course_result.name}
          />
          {/*   <div className='col-4'>
                    <img className='course-image' src={Image} alt='' />
                </div> */}
        </div>

        <div className="col-8">
          <h2 className="mt-5 text-center">{course.course_result.name}</h2>
          <br />

          <h4> {course.course_result.description}</h4>
        </div>

        {/* student view  */}
        {auth.type === "student" && course.passed && (
          <>
            <div className="sb">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Total Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{course.passed.total_grade}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        )}

        {auth.type === "student" &&
          !course.passed &&
          !course.assignments_result && (
            <>
              <Link
                className="btn btn-primary mb-5"
                onClick={(e) => {
                  registerCourse(e);
                }}
              >
                Enroll Now
              </Link>
            </>
          )}

        {auth.type === "student" &&
          course.passed != "passed" &&
          course.assignments_result && (
            <>
              <div className="sb">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Details</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.assignments_result.map((grade) => (
                      <tr key={grade.id}>
                        <td>{grade.name}</td>
                        <td>{grade.details}</td>
                        <td>{grade.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}

        {/* instructor view  */}
        {auth.type === "instructor" && (
          <>
            <Button
              href={"/setassigments/" + id}
              className="but"
              variant="dark"
            >
              Set Assigments
            </Button>{" "}
            <TableGrades
              students={course.students_result}
              assignments={course.assignments_result}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsFI;
