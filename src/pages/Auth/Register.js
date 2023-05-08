import React, { useState } from "react";
/* import Form from 'react-bootstrap/Form';
import"../../HTML/Login.html"; */
import "../../css/Login.css";
import Image from "../../core/data/Free Vector _ Polygon lines background.jpeg";
import axios from "axios";
import { setAuthUser } from "../../core/helper/Storage";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    loading: false,
    err: "",
    success: null,
  });

  const RegisterFun = (e) => {
    console.log(register);

    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        name: register.name,
        email: register.email,
        password: register.password,
        phone: register.phone,
      })
      .then((response) => {
        console.log(response);
        setRegister({
          ...register,
          loading: false,
          err: "",
          success: "Register Successfully",
        });
        setAuthUser(response.data);
        navigate("/");
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: "E-mail is not found",
          success: null,
        });
      });
  };
  return (
    <div>
      <div className="bg">
        <div className="limiter">
          <div className="container-login100">
            {/* <div className='bg' >< img  src={Image}></img></div>  */}
            <div className="wrap-login100">
              <form
                className="login100-form validate-form"
                onSubmit={RegisterFun}
              >
                {/* <span className="login100-form-logo">
						 <i className="zmdi zmdi-landscape"></i> 
					</span> */}

                <span className="login100-form-title ">REGISTER</span>
                {register.err && (
                  <Alert variant="danger" className="p-2">
                    {register.err}
                  </Alert>
                )}
                {register.success && (
                  <Alert variant="success" className="p-2">
                    {register.success}
                  </Alert>
                )}
                <div
                  className="wrap-input100 validate-input"
                  // data-validate="Enter username"
                >
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={register.name}
                    onChange={(e) =>
                      setRegister({ ...register, name: e.target.value })
                    }
                  ></input>
                  {/* <span className="focus-input100" data-placeholder="&#xf207;"></span> */}
                </div>

                <div
                  className="wrap-input100 validate-input"
                  // data-validate="Email"
                >
                  <input
                    className="input100"
                    type="Email"
                    name="Email"
                    placeholder="Email"
                    required
                    value={register.email}
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                  ></input>
                  {/* <span className="focus-input100" data-placeholder="&#xf207;"></span> */}
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
                    value={register.password}
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                  ></input>
                  {/* <span className="focus-input100" data-placeholder="&#xf191;"></span> */}
                </div>

                <div
                  className="wrap-input100 validate-input"
                  // data-validate="Enter Phone"
                >
                  <input
                    className="input100"
                    type="Phone"
                    name="Phone"
                    placeholder="Phone"
                    required
                    value={register.phone}
                    onChange={(e) =>
                      setRegister({ ...register, phone: e.target.value })
                    }
                  ></input>
                  {/* <span className="focus-input100" data-placeholder="&#xf191;"></span> */}
                </div>

                {/* <div className="wrap-input100 validate-input" data-validate = "Enter Phone">
						<input className="input100" type="number" name="Phone" placeholder="Phone"></input>
						{/* <span className="focus-input100" data-placeholder="&#xf207;"></span> *
					</div>  */}

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
