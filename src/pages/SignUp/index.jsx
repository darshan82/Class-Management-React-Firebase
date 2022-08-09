import React, { useContext } from "react";
import {
  SignUpContainer,
  ImageApresatation,
  CheckBox,
  ContainerForm,
  WrapperForm,
  Form,
  WrapInput,
} from "./styled.js";
// images
import signUp from "../../images/signup/sign-up.svg";
import { FcGoogle } from "react-icons/fc";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "../../Components/Button/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../Contexts/AuthContext/index.jsx";
import { LoadSpinner } from "../../Components/LoadSpinner/index.jsx";

const signUpSchema = yup
  .object({
    name: yup.string().required().min(3).max(12),
    email: yup.string().required(),
    password: yup.string().required().min(6),
  })
  .required();

export function SignUp() {
  // Hooks
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const getErrors = (field) => errors[field] && errors[field].message;
  const navigate = useNavigate();
  // Context
  const { authenticate, createUserEmailPass,signinWithGoogle } = useContext(AuthContext);
  // States
  const [isLoad, setIsLoad] = React.useState(false)
  // handle functions
  async function createUser(data){
    setIsLoad(true)
    await createUserEmailPass(data)
    setIsLoad(false)
  }

  // Validation
  if (authenticate) {
    navigate("/dashboard");
  }

  return (
    <SignUpContainer>
      <ImageApresatation>
        <img src={signUp} alt="Sign up" />
      </ImageApresatation>
      <ContainerForm>
        <WrapperForm width="400px">
          <div className="header-login">
            <Link to={"/"}>
              <BiLeftArrowAlt />
              Back to home
            </Link>
            <h1>Create an account</h1>
          </div>
          <Form onSubmit={handleSubmit(createUser)}>
            <WrapInput>
              <label>Name</label>
              <input
                type="name"
                name="name"
                style={{
                  boxShadow: getErrors("name") && "0 0 5px 2px #ff2e2e7e",
                }}
                {...register("name")}
                placeholde="name"
              />
              <small>{getErrors("name")}</small>
            </WrapInput>
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
                Sign up
                {isLoad&&<LoadSpinner size={'26px'} />}
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
                onClick={signinWithGoogle}
              >
                <FcGoogle />
                Sign-in with Google
              </Button>
        </WrapperForm>
      </ContainerForm>
    </SignUpContainer>
  );
}
