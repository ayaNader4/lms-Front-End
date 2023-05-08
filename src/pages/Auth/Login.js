import React, { useState } from "react";
/* import Form from 'react-bootstrap/Form';
import"../../HTML/Login.html"; */
import "../../css/Login.css";
import Image from "../../core/data/Free Vector _ Polygon lines background.jpeg";
import axios from "axios";
import { setAuthUser } from "../../core/helper/Storage";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: "",
    success: null,
  });

  const LoginFun = (e) => {
    console.log(login);

    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    console.log("login fun 1");
    axios
      .post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((response) => {//user_data
        console.log(response);
        setLogin({
          ...login,
          loading: false,
          err: "",
          success: "logined successfully",
        });
        setAuthUser(response.data);
        navigate("/");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: "E-mail or password not found",
          success: null,
        });
      });
  };
  return (
    <div className="bg">
      <div className="limiter">
        <div className="container-login100">
          {/* <span  >
         <img  className="login100-form-logo" src="https://www.pngitem.com/pimgs/m/76-769067_black-and-white-four-leaf-clover-black-and.png" />
					</span> */}
          {/*  <div className='bg' >< img  src={Image}></img></div>   */}
          {/*  <img className='bg'  src={Image}> </img> */}
          <div className="wrap-login100">
            <div className="login100-form-title"> LOG IN</div>
            {login.err && (
              <Alert variant="danger" className="p-2">
                {login.err}
              </Alert>
            )}
            {login.success && (
              <Alert variant="success" className="p-2">
                {login.success}
              </Alert>
            )}
            {/* {login.err.map((error)=>({error.message}))} */}

            <form className="login100-form validate-form" onSubmit={LoginFun}>
              <div
                className="wrap-input100 validate-input"
                // data-validate="Enter email"
              >
                {/*  <Form.Group className="wrap-input100" controlId="formGroupEmail"> */}
                {/* <Form.Label> */}{" "}
                <input
                  className="input100 "
                  type="Email"
                  name="Enter email"
                  placeholder="Enter email"
                  required
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                ></input>
                {/*  </Form.Label> */}
                <span /* className="focus-input100" data-placeholder=' ' */>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="focus-input100"
                    data-placeholder=""
                    width="20"
                    height="20"
                    fill="white"
                    /*  className="bi bi-person-fill" */
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    {/* <input className="focus-input100::before"  ></input> */}
                    <input className="focus-input100::after"></input>
                  </svg>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                // data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  required
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                ></input>
                {/* <span className="focus-input100" data-placeholder="&#xf191;"></span> */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="focus-input100"
                  data-placeholder=""
                  width="20"
                  height="20"
                  fill="white"
                  /* viewBox="0 0 16 16" */
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
              </div>

              <div className="contact100-form-checkbox">
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="remember-me"
                ></input>
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="login100-form-btn"
                  type="submit"
                  disabled={login.loading === true}
                >
                  Login
                </button>
              </div>

              <br />
              <div className="text-center p-t-90">
                <a className="txt1" href="#">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
