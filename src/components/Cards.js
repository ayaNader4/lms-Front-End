import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { CardsData } from ".././core/data/HomeCards";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <section id="blog" className="block blog-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Latest Courses</h2>
          <div className="subtitle">
            what are you wating for enroll in our courses now
          </div>
        </div>
        <Row className="course-row">
          {CardsData.map((HomeCards) => {
            return (
              <Col className="course-col" sm={4} key={HomeCards.id}>
                <div className="holder">
                  <Card>
                    <Card.Img variant="top" src={HomeCards.image} />
                    <Card.Body>
                      <Card.Title>{HomeCards.name}</Card.Title>
                      <Card.Text>{HomeCards.description}</Card.Text>
                      <Link className="btn btn-primary" /* to={'/'}  */>
                        Show Details
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Cards;
