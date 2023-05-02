import React, { useState, useEffect } from "react";
import "./../../css/CourseDetails.css";
import "./../../HTML/CourseDetails.html";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import SetGradesButton from "./SetGradesButton";
import SetAssigments from "./SetAssigments";
import TableGrades from "./TableGrades";
import { Grades } from "./Grades";
import Image from "../../core/data/a652bd3cfb5e4378d94d5fa17627dae1.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { getAuthUser } from "../../core/helper/Storage";

const CourseDetailsFI = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = getAuthUser();

  let token = null;
  let { id } = useParams();
  if (auth) token = auth.token;

  let url = "http://localhost:4000/course/";
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
    err: null,
  });

  useEffect(() => {
    setCourse({ ...course, loading: true });
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
          loading: false,
        });
      })
      .catch((errors) => {
        setCourse({
          ...course,
          loading: false,
          err: "Something went wrong, please check the course name entered",
        });
      });
  }, []);

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
        {auth.type === "student" && <> </>}

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
              course_id={course.course_result.id}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsFI;
