import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../.././css/Home.css";
import CarouselPage from "../../components/Carouselpage";
//import Cards from "../../components/Cards";
import CoursesCards from "../../components/CoursesCards";
import { getAuthUser } from "../../core/helper/Storage";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import FilterCourses from "../../components/FilterCourses";
const Home = () => {
  const auth = getAuthUser();//user_data//token
  let token = null;
  if (auth) token = auth.token;

  let url = "http://localhost:4000/courses";//student
  if (auth) {
    if (auth.type === "instructor") {
      url = "http://localhost:4000/instructor/manage/courses";
    } else {
      url = "http://localhost:4000/courses";
    }
  }
  console.log("auth", auth);
  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setCourses({ ...courses, loading: true });
    axios
      .get(url, {
        headers: { token: token },
      })
      .then((response) => {
        console.log(response);
        setCourses({ ...courses, results: response.data, loading: false });
      })
      .catch((errors) => {
        setCourses({
          ...courses,
          loading: false,
          err: errors.response.data.message,
        });
      });
  }, [courses.reload]);//0+1+1

  const searchCourses = (e) => {
    e.preventDefault();
    setCourses({ ...courses, reload: courses.reload + 1 });
  };

  console.log(courses.results);

  return (
    <div className="Home">
      {/* Loader */}
      {courses.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {/* <CarouselPage /> */}
      {/* <Cards /> */}

      {courses.loading === false && courses.err == null && (
        <>
          {auth.type === "student" && (
            <>
              <CarouselPage />
              <FilterCourses />
            </>
          )}
          <Container fluid>
            <Row className="course-row ">
              {auth.type === "instructor" && (
                <>
                  {courses.results.map((course) => (
                    <CoursesCards
                      key={course.id}
                      name={course.name}
                      code={course.code}
                      description={course.description}
                      image_url={course.image_url}
                      id={course.course_id}
                    />
                  ))}
                </>
              )}
              {auth.type === "admin" && (
                <>
                  <FilterCourses />
                </>
              )}
            </Row>
          </Container>
        </>
      )}

      {/* error handling  */}
      {courses.loading === false && courses.err != null && (
        <Alert variant="danger" className="p-2 mt-5">
          {courses.err}
        </Alert>
      )}

      {courses.loading === false &&
        courses.err == null &&
        courses.results.length === 0 && (
          <Alert variant="info" className="p-2">
            No courses available
          </Alert>
        )}
    </div>
  );
};

export default Home;
