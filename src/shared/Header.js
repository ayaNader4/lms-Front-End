import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/Header.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../core/helper/Storage";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();

  const Logout = () => {
    removeAuthUser();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <Navbar bg="light" expand="lg">
      
        <div className="logo"> 
        <img src = "76-769067_black-and-white-four-leaf-clover-black-and-removebg-preview (1) (2).png" alt="logo"   />
        </div> 
       
        <Container>
          <Navbar.Brand href={"/"}>Barseem</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
              
              {/* <Link className='nav-link' to={'/instructor'}>Courses</Link> */}
              <Link className="nav-link" to={"/help"}>
                Help
              </Link>

              {/* unauthenticated routes */}
              {!auth && (
                <>
                  <Link className="nav-link me-2" to={"/login"}>
                    Login
                  </Link>
                  <Link className="nav-link me-2" to={"/register"}>
                    Register
                  </Link>
                </>
              )}

              {/* admin routes */}
              {auth && auth.type === "admin" && (
                <>
                  <Link className="nav-link me-2" to={"/manage-users"}>
                    Manage Users
                  </Link>
                  <Link className="nav-link me-2" to={"/manage-courses"}>
                    Manage Courses
                  </Link>
                </>
              )}

              <Nav className="ms-auto">
                {/* Authenticated Routes  */}
                {auth && (
                  <Nav.Link
                    className="nav-link mar text-white"
                    onClick={Logout}
                  >
                    Logout
                  </Nav.Link>
                )}
              </Nav>
              {/* Authenticated Routes */}
              {/* {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
