import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import * as requestAPI from "../FormLogin/helpers/Api";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { orderCar } from "../../redux/features/order/orderSlice";
const FormLogin = () => {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setEmailUser(e.target.value);
  };

  const onChangePassword = (e) => {
    setPasswordUser(e.target.value);
  };

  const handleLogin = async () => {
    const carId = localStorage.getItem("carId");
    try {
      const bodyPayLoad = {
        email: emailUser,
        password: passwordUser,
      };
      setLoading(true);
      const res = await requestAPI.handleLogin(bodyPayLoad);
      localStorage.setItem("accesToken", res.data.access_token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Succes",
        showConfirmButton: false,
        timer: 1500,
      });
      if (carId) {
        handleNextPage();
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      if (emailUser === "" || passwordUser === "") {
        Swal.fire({
          title: "Email And Password ",
          text: "Cannot Be Empety!",
          icon: "warning",
        });
        setLoading(false);
      } else {
        Swal.fire({
          title: "Email And Password ",
          text: "Not Found!",
          icon: "error",
        });
        setLoading(false);
        return;
      }
    }
  };

  const handleNextPage = async () => {
    let carId = localStorage.getItem("carId");
    carId = JSON.parse(carId);
    setTimeout(() => {
      navigate(`/car/${carId}`);
      localStorage.removeItem("carId");
    }, 2000);
  };

  return (
    <div className="container-form-login">
      <div className="head-formlogin d-grid gap-3">
        <Link to={"/"}>
          <div className="logo-formlogin">p</div>
        </Link>
        <div className="header-login">Welcome Back!</div>
        <Form className="d-grid gap-3">
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email" name="name" placeholder="Email" onChange={onChangeEmail} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </Form.Group>
        </Form>
        <button onClick={handleLogin} className="btn-signup" disabled={loading ? true : false}>
          {loading ? "...loading" : "Sign in"}
        </button>
        <div className="have-account">
          <p>Don’t have an account?</p>
          <Link to={"/register"}>
            <h1>Sign Up Hare</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
