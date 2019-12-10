import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIServices from "../Services/API";
import { notify } from "react-notify-toast";
import SWButton from "./../SWButton/SWButton";
import { Link } from "react-router-dom";
import "./Signup.css";
const SignupForm = props => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Name is Required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password Must be more than 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .min(8, "Confirm password Must be more than 8 characters")
        .oneOf(
          [Yup.ref("password")],
          "Confirm password and password are not the same"
        )
        .required("Please confirm password")
    }),
    dirty: true,
    setFieldValue: values => {},
    onSubmit: async (values, { resetForm, setFieldError }) => {
      let result = await APIServices.signUp({
        name: values.name,
        email: values.email,
        password: values.password
      });
      const responseData = result.data;
      if (responseData.success) {
        notify.show("Account created successfully Login", "success", 2000);
        setTimeout(() => {
          props.history.push("/login");
        }, 2000);
        resetForm({});
      } else {
        setFieldError("email", `${responseData.errors[0]}`);
        notify.show(`${responseData.errors[0]}`, "error", 2000);
      }
    }
  });
  return (
    <section id="cover" className="min-vh-100">
      <div id="cover-caption">
        <div className="container">
          <div className="row text-white">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
              <h1 className="text-truncate">Sign up</h1>
              <div className="px-2">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      name="name"
                      className={
                        formik.touched.name && formik.errors.name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      className={
                        formik.touched.email && formik.errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <input
                      className={
                        formik.touched.password && formik.errors.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Confirm Password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="invalid-feedback">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <SWButton
                      type="submit"
                      disabled={
                        Object.keys(formik.errors).length > 0 || !formik.dirty
                      }
                    >
                      Create account
                    </SWButton>
                  </div>
                  <span>
                    Are you have account ? <Link to="/login"> log in </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupForm;
