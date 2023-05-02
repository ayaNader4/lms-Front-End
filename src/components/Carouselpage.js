import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { CarouselData } from ".././core/data/HomeCarousel";
import ".././css/Home.css";

const CarouselPage = () => {
  return (
    <section id="carousel" className="carousel-block">
      <Carousel controls={true} fade={true} pause={true}>
        {CarouselData.map((HomeCourses) => {
          return (
            <Carousel.Item
              interval={2000}
              key={HomeCourses.id}
              className="c-item"
            >
              <img
                className="d-block w-100 c-img "
                src={HomeCourses.image}
                alt={"Slide " + HomeCourses.id}
              />
              <Carousel.Caption className="top-5 mt-2 c-cap">
                <h3 className="display-1 fw-bolder c-name">
                  {HomeCourses.name}
                </h3>
                <p className="mt-8 fs-3 c-disc">{HomeCourses.description}</p>
                <a
                  className="btn btn-primart px-4 py-2 fs-5 mt-5 c-but"
                  href={HomeCourses.link}
                >
                  <i className="fas fa-chevron-right">
                    <Button variant="light">Learn More</Button>{" "}
                  </i>
                </a>
              </Carousel.Caption>
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target=""
                  aria-label="Slide 1"
                  aria-current="true"
                  className="active"
                ></button>
                <button
                  type="button"
                  data-bs-target=""
                  aria-label="Slide 2"
                  aria-current="false"
                ></button>
                <button
                  type="button"
                  data-bs-target=""
                  aria-label="Slide 3"
                  aria-current="false"
                ></button>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
};

export default CarouselPage;
