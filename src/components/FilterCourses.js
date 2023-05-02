import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { CardsData } from "../core/data/HomeCards";
import { Link } from "react-router-dom";
import "../css/FilterCourses.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import CoursesCards from "../components/CoursesCards";
import { getAuthUser } from "../core/helper/Storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FilterCourses = (props) => {
  const auth = getAuthUser();
  const [filterValue, setFilterValue] = useState({
    type: "",
    loading: false,
    results: [],
    err: [],
    reload: 0,
  });
  const [search, setSearch] = useState("");
  /* let url="http://localhost:4000/courses"; */
  let url = "http://localhost:4000/courses";
  let a = "btns";
  let av="btns";
  let all="btns";
  let p="btns";
  if (filterValue.type === "/") {
    url = "http://localhost:4000/courses";
    all+=" active"
  } else if (filterValue.type === "active") {
    url = "http://localhost:4000/courses?type=active";
    a+=" active";
  } else if (filterValue.type === "passed") {
    url = "http://localhost:4000/courses?type=passed";
    p+=" active";
  } else if (filterValue.type === "available") {
    url = "http://localhost:4000/courses?type=available";
    av+=" active";
  }
  let handleButtons = (e) => {
    console.log(e);
    e.preventDefault();
    setFilterValue({ ...filterValue, reload: filterValue.reload + 1 });
  };

  useEffect(() => {
    setFilterValue({ ...filterValue, loading: true, err: [] });
    axios
      .get(url, {
        headers: { token: auth.token },
        params: { search: search },
      })
      .then((response) => {
        setFilterValue({
          ...filterValue,
          results: response.data,
          loading: false,
          err: [],
        });
      })
      .catch((errors) => {
        setFilterValue({
          ...filterValue,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  }, [filterValue.reload]);

  return (
    <div className="home-container  ">
      <Form onSubmit={handleButtons}>
        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="search"
            placeholder="Search courses"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <button className="btn btn-dark rounded-0">Search</button> */}
          <Button
            as="input"
            type="submit"
            value="Search"
            variant="btn btn-primary m-0"
          />
        </Form.Group>
      </Form>
      <div className="myBtnContainer">
        <form onSubmit={handleButtons}>
          <button
            className={all}
            value="All"
            type="submit"
            onClick={() =>
              setFilterValue({
                ...filterValue,
                type: "/",
              })
            }
          >
            All courses
          </button>
          <button
            className={av}
            value="available"
            type="submit"
            onClick={() =>
              setFilterValue({
                ...filterValue,
                type: "available",
              })
            }
          >
            available courses
          </button>
          <button
            className={p}
            type="submit"
            onClick={() =>
              setFilterValue({
                ...filterValue,
                type: "passed",
              })
            }
          >
            passed courses
          </button>
          <button
            className={a}
            type="submit"
            onClick={() =>
              setFilterValue({
                ...filterValue,
                type: "active",
              })
            }
          >
            active courses
          </button>
        </form>
      </div>
      <Container fluid>
        <Row className="course-row ">
          {filterValue.results.map((course) => (
            <CoursesCards
              key={course.id}
              name={course.name}
              code={course.code}
              description={course.description}
              image_url={course.image_url}
              id={course.id}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FilterCourses;
