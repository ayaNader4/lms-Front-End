import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { CardsDataI } from "../core/data/CourseCardsInfo";
import ".././css/Home.css";

const CoursesCards = (props) => {
  console.log(props.image_url);
  return (
    <Col className="course-col mt-5" sm={4} key={props.id}>
      <div className="holder">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={props.image_url} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Link className="btn btn-primary" to={"/" + props.id}>
              Show Course Details
            </Link>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
};

export default CoursesCards;
