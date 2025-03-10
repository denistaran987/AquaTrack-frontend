import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./SignInForm.module.css";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/auth/operations";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted with values:", values);
  
    dispatch(signInUser(values))
    .unwrap()
    .then((res) => {
      console.log("Server response:", res);
  
      const user = res.data?.user || {};
      const userName = user.name?.trim() || "User"; 
  
      toast.success(`Welcome back, ${userName}!`, {
        style: { backgroundColor: "#4CAF50", fontWeight: "bold" },
        iconTheme: { primary: "white", secondary: "black" },
      });
  
      resetForm();
  
      setTimeout(() => {
        navigate("/tracker");
      }, 2000);
    })
    .catch((error) => {
      console.error("Error in sign-in:", error);
  
      if (error.response) {
        const { status, message } = error.response.data;
        console.log("Response error data:", error.response.data);
  
        if (status === 400) {
          toast.error("Invalid email or password.");
        } else if (status === 401) {
          toast.error("Unauthorized. Please try again.");
        } else if (status === 404) {
          toast.error("User not found.");
        } else if (status === 500) {
          toast.error("Something went wrong. Please try again later.");
        } else {
          toast.error(`Error: ${message}`);
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    });
  };

  return (
      <section className={styles.section}>
        <Logo />
        <section className={styles.signinSection}>
          <h2 className={styles.title}>Sign In</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldTouched }) => (
              <Form className={styles.signinForm}>
                <label className={styles.label}>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`${styles.input} ${touched.email ? (errors.email ? styles.errorInput : styles.focusedInput) : styles.inactiveInput}`}
                  onFocus={() => setFieldTouched("email", true)}
                  onBlur={() => setFieldTouched("email", true)}
                />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />

                <label className={styles.label}>Password</label>
                <div className={styles.passwordWrapper}>
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`${styles.input} ${touched.password ? (errors.password ? styles.errorInput : styles.focusedInput) : styles.inactiveInput}`}
                    onFocus={() => setFieldTouched("password", true)}
                    onBlur={() => setFieldTouched("password", true)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.togglePassword}
                  >
                    <svg className={styles.icon} width="24" height="24">
                      <use xlinkHref={`/images/icons.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`} />
                    </svg>
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />

                <button type="submit" className={styles.signinBtn}>Sign In</button>
              </Form>
            )}
          </Formik>
          <p className={styles.signupLink}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.signupLinkText}>Sign Up</Link>
          </p>
        </section>
      <ToastContainer />
    </section>
  );
};

export default SignInPage;