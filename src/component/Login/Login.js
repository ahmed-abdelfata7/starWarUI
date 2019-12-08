import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import APIServices from "../Services/API";
import { notify } from "react-notify-toast";
import { useDispatch } from "react-redux";
import { SignIn } from "./../../actions/index";
import "./Login.css";
import SWButton from "../SWButton/SWButton";
const Login = props => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string().required("Passsword is required")
    }),
    dirty: true,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      let result = await APIServices.login({
        email: values.email,
        password: values.password
      });
      const responseData = result.data;
      if (responseData.success) {
        dispatch(SignIn());
        window.localStorage.setItem("isAuth", true);
        window.localStorage.setItem("token", responseData.data.token);
        resetForm({});
        props.history.push("/dashboard");
      } else {
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
              <h1 className="text-truncate">Sign in</h1>
              <div className="px-2">
                <form
                  onSubmit={formik.handleSubmit}
                  className="justify-content-center"
                >
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
                    <SWButton
                      type="submit"
                      disabled={
                        Object.keys(formik.errors).length > 0 || !formik.dirty
                      }
                    >
                      Login
                    </SWButton>
                  </div>
                  <span>
                    Are you haven't account ?<a href="/signup"> Create one</a>
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
export default Login;
