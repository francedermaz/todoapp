import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser,createUser } from "../../redux/actions/index";
import Loader from "../Loader/Loader";
import styles from "./Login.module.css";
import NavBar from "../NavBar/NavBar";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: true,
    password: true,
  });
  const [errorIncorrect, setErrorIncorrect] = useState({
    password: false,
    email: false,
  });
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const makedispatch = (e) => {
    e.preventDefault();
    dispatch(loginUser(input)).then((res) => {
      if (res.payload.msg === "Incorrect password") {
        setErrorIncorrect({
          password: true,
        });
      } else if (res.payload.msg === "Email not found") {
        setErrorIncorrect({
          email: true,
        });
      } else {
        setInput({
          email: "",
          password: "",
        });
        setSuccess(true);
        setTimeout(function () {
          window.location.href = "http://localhost:3000/home";
        }, 1600);
      }
    });
  };

  function validate_password(str) {
    let pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    return !!pattern.test(str);
  }

  function validate_email(str) {
    let pattern = new RegExp(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    return !!pattern.test(str);
  }

  function validate(ipname, ipvalue) {
    if (ipname === "email") {
      validate_email(ipvalue) === true
        ? setError({ ...error, email: false })
        : setError({ ...error, email: true });
    }
    if (ipname === "password") {
      validate_password(ipvalue) === true
        ? setError({ ...error, password: false })
        : setError({ ...error, password: true });
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validate(e.target.name, e.target.value);
  };

  return (
    <div>
      <div className={styles.divbtt}>
          <NavBar/>
      </div>

      <div className={styles.page}>
        <form className={styles.form} onSubmit={(e) => makedispatch(e)}>
          <div className={styles.title}>Login</div>
          <input
            className={styles.input}
            value={input.email}
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            className={styles.input}
            value={input.password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          ></input>
          <div>
            {error.email === true || error.password === true ? (
              <button className={styles.buttondis} disabled type="submit">
                Sign in
              </button>
            ) : (
              <button className={styles.button} type="submit">
                Sign in
              </button>
            )}
          </div>
          <div className={styles.others}>
            <div>
              <Link className={styles.nav_link} to="/signup">
                Register
              </Link>
            </div>
          </div>
          {errorIncorrect.password === true ? (
            <p className={styles.errors}>Password Incorrect</p>
          ) : (
            <></>
          )}
          {errorIncorrect.email === true ? (
            <p className={styles.errors}>Email not registered</p>
          ) : (
            <></>
          )}
        </form>
      </div>
      {success === true ? <Loader /> : <></>}
    </div>
  );
};
export default Login;
