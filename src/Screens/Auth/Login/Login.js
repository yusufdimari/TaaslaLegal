import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { useAuth } from "../../../Components/Auth/use-auth";
import "./index.css";

export default function Login() {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);
  const auth = useAuth();
  return (
    <>
      <div class="loginForm">
        <section class={`wrapper ${active && "active"}`}>
          <div class="form signup" onClick={() => setActive(false)}>
            <header>Signup</header>
            <Formik
              initialValues={{ fullname: "", email: "", password: "" }}
              onSubmit={(values) => {
                if (
                  values.email == "" ||
                  values.password == "" ||
                  values.fullname == ""
                ) {
                  alert("one or more fields cannot be empty");
                  return;
                }
                if (checked) {
                  auth
                    .signup(values)
                    .then((res) => console.log("rrreeesss", res));
                }

                if (!checked) {
                  alert("please accept terms");
                  console.log(values, checked);
                }
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit} id="signUpForm">
                    <label className="label">Full Name:</label>

                    <Field
                      type="text"
                      placeholder={"Please input your Full Name"}
                      id="fullname"
                      name="fullname"
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                    <label className="label">Email:</label>

                    <Field
                      type="email"
                      placeholder={"Please input Email"}
                      id="email"
                      name="email"
                    />

                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                    <label className="label">Password:</label>

                    <Field
                      type="password"
                      placeholder={"Please input Password"}
                      id="password"
                      name="password"
                    />
                    <div class="checkbox" onClick={() => setChecked(!checked)}>
                      <input type="checkbox" id="signupCheck" />
                      <label for="signupCheck">
                        I accept all terms & conditions
                      </label>
                    </div>
                    <input type="submit" value="Signup" className="Signup" />
                  </form>
                );
              }}
            </Formik>
          </div>
          <div
            class="form login"
            id="myLoginForm"
            onClick={() => setActive(true)}
          >
            <header>Login</header>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                auth.signin(values.email, values.password);
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <label className="label">Email:</label>

                    <Field
                      type="email"
                      placeholder={"Please input Email"}
                      id="email"
                      name="email"
                    />

                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />

                    <label className="label">Password:</label>

                    <Field
                      type="password"
                      placeholder={"Please input Password"}
                      id="password"
                      name="password"
                    />
                    <a href="#">Forgot password?</a>
                    <input type="submit" value="Login" />
                  </form>
                );
              }}
            </Formik>
          </div>
        </section>
      </div>
    </>
  );
}
