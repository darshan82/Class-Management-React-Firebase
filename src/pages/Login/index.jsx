import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
// images
import LoginImage from "../../images/login/login.svg";
//
import {
  CheckBox,
  Form,
  ImageApresatation,
  LoginPageContainer,
  WrapInput,
  WrapperForm,
  ContainerForm,
} from "./styled.js";
//
// import { Input } from "../../Components/Input"; // dont work with react-hook-form
import { Button } from "../../Components/Button";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadSpinner } from "../../Components/LoadSpinner";

// schema
const loginSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required().min(6),
  })
  .required();

export function Login() {
  // Hooks
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const getErrors = (field) => errors[field] && errors[field].message;
  const navigate = useNavigate();
  // Context
  const { authenticate, handleLoginEmailPass, signinWithGoogle,authError } =
    React.useContext(AuthContext);
  // States
  const [isLoad, setIsLoad] = React.useState(false);
  // Handle Functions
  async function login(data) {
    setIsLoad(true);
    await handleLoginEmailPass(data);
    authError&&setIsLoad(false)
  }

  // Validation
  if (authenticate) {
    navigate("/dashboard");
  }

  return (
    <LoginPageContainer>
      <ImageApresatation>
        <img src={LoginImage} alt="Login image" />
      </ImageApresatation>
      <ContainerForm>
        <WrapperForm width="400px">
          <div className="header-form">
            <p>Welcome back</p>
            <h1>Login to your account</h1>
          </div>
          <Form onSubmit={handleSubmit(login)}>
            <WrapInput>
              <label>Email</label>
              <input
                type="email"
                name="email"
                style={{
                  boxShadow: getErrors("email") && "0 0 5px 2px #ff2e2e7e",
                }}
                {...register("email")}
                placeholde="Email"
              />
              <small>{getErrors("email")}</small>
            </WrapInput>
            <WrapInput>
              <label>Password</label>
              <input
                type="password"
                name="password"
                style={{
                  boxShadow: getErrors("password") && "0 0 5px 2px #ff2e2e7e",
                }}
                {...register("password")}
                placeholde="Password"
              />
              <small>{getErrors("password")}</small>
            </WrapInput>

            <div className="sub-options">
              <div className="wrap-checkbox">
                <CheckBox
                  type="checkbox"
                  name="rememberLogin"
                  {...register("rememberLogin")}
                />
                <label>Remember me</label>
              </div>
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </div>
            <small>{getErrors("rememberLogin")}</small>
            <div className="wrap-buttons">
              <Button
                bg={"#63AAE6"}
                color="#fff"
                padding="14px 10px"
                fontWeight="500"
                height="52px"
                type="submit"
              >
                Login Now
                {isLoad && <LoadSpinner size={"26px"} />}
              </Button>
            </div>
          </Form>
          <label>or</label>
          <Button
            bg={"#2D3748"}
            color="#fff"
            padding="14px 10px"
            fontWeight="500"
            height="52px"
            onClick={() => {
              signinWithGoogle();
              return;
            }}
          >
            <FcGoogle />
            Sign-in with Google
          </Button>
          <div className="create-account">
            <p>
              Dont have an account?{" "}
              <Link to={"sign-up"}>Join free today 😃</Link>
            </p>
          </div>
        </WrapperForm>
      </ContainerForm>
    </LoginPageContainer>
  );
}
