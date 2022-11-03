import React, { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import uniquid from "uniqid";
import Swal from "sweetalert2";

function Login({ login, setlogin }) {
  /////////////LOGIN//////////////////////////CARLOSSSSSSSSSSSSSS
  //Hooks
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  const logi = async (credentials) => {
    const { data } = await axios.post("/api/usuario/logi", credentials);
    return data;
  };

  const logini = async (event) => {
    try {
      const useri = await logi({
        useremail,
      });
      //setlogin(useri.shift().password)
      if (useri[0].password === md5(password)) {
        
        /*
        window.sessionStorage.setItem(
          "loggedAppUser",
          JSON.stringify(useri.shift().password)
        );
        setlogin(md5(document.querySelector("#loginName").value));
        */
       console.log(useri)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const mostrar = () => {
    let login = document.querySelector(".login");
    login.getAttribute("style").search("none") > -1
      ? login.setAttribute("style", "display:block;")
      : login.setAttribute("style", "display:none;");
    let create = document.querySelector(".create");
    create.getAttribute("style").search("none") > -1
      ? create.setAttribute("style", "display:block;")
      : create.setAttribute("style", "display:none;");
  };

  /////////////CREATE//////////////////////////
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const user = {
    name: formValues.name,
    email: formValues.email,
    password: md5(formValues.password),
    id: uniquid(),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function adduser(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
      setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("/api/usuario/adduser", user)
        .then(
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Created",
            showConfirmButton: false,
          })
        )
        .then(window.location.reload());
    }
  }, [isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <>
      {/* Login //////////////////////////////////////////////// */}
      <div className="container login" style={{ display: "block" }}>
        <h1 className="mt-4 text-danger">Login</h1>
        <div className="row">
          <div className="col-sm-6 offset-3">
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-danger">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                value={useremail}
                onChange={(e) => {
                  setUseremail(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-danger">
                Password
              </label>
              <input
                type="password"
                id="loginName"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <button onClick={logini} className="btn btn-lg btn-danger">
              LOGIN
            </button>
            <center>
              <p className="text-white mt-4">Have an account?</p>
              <h6>
                <a className="text-white" href="#" onClick={() => mostrar()}>
                  Register
                </a>
              </h6>
            </center>
          </div>
        </div>
      </div>

      {/* Create //////////////////////////////////////////////// */}
      <div className="container create" style={{ display: "none" }}>
        <div className="row">
          <h2 className="mt-4 text-success">Create a new user</h2>
        </div>

        <div className="row">
          <form className="col-sm-6 offset-3" onSubmit={adduser}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-success">
                User Name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="name"
                value={formValues.name}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{formErrors.name}</p>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-success">
                Email
              </label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{formErrors.email}</p>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-success">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              ></input>
            </div>
            <p className="text-danger">{formErrors.password}</p>
            <button className="btn btn-success">
              Create
            </button>
            <center>
              <h6 className="mt-4">
                <a className="text-white mt-4" href="#" onClick={()=>mostrar()}>
                  Go Back
                </a>
              </h6>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
