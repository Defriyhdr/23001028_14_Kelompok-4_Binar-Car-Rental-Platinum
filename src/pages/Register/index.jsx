import "./style.css";
import FormRegister from "../../components/FormRegister";
import LandingPageImage from "../../assets/img/LandingPageDesktop.png";

function Register() {
  return (
    <div className="container-register row">
      <div className="container-left-register">
        <FormRegister />
      </div>
      <div className="container-right-register">
        <h1 className="title-login-register">Binar Car Rental</h1>
        <img src={LandingPageImage} />
      </div>
    </div>
  );
}

export default Register;
