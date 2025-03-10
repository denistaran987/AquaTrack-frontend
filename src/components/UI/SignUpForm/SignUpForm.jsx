import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./SignUpForm.module.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/auth/operations";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 


const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted with values:", values);

    const { repeatPassword, ...userData } = values;
    console.log("Repeat Password:", repeatPassword);

    dispatch(registerUser(userData))
      .unwrap()
      .then((res) => {
        console.log("Server response:", res);

        const name = res?.data?.user?.name?.trim() || 'User';  

        toast.success(`Registration successful! Welcome, ${name}!`, {
          style: { backgroundColor: '#4CAF50', fontWeight: 'bold' }, 
          iconTheme: { primary: 'white', secondary: 'black' },
        });

        resetForm();

        setTimeout(() => {
          navigate('/tracker');
        }, 2000);  
      })
      .catch((error) => {
        console.error("Error in registration:", error);

        if (error.response) {
          const { status, message, data } = error.response.data;
          console.log("Response error data:", data);
          console.log("Error status:", status);
          console.log("Error message:", message);

          if (status === 400) {
            toast.error(message || "Bad request. Invalid input data.");
          } else if (status === 401) {
            toast.error(message || "Unauthorized. Session not found.");
          } else if (status === 404) {
            toast.error(message || "Resource not found.");
          } else if (status === 409) {
            toast.error(message || "A contact with this email already exists.");
          } else if (status === 500) {
            toast.error(message || "Something went wrong. Please try again later.");
          } else {
            toast.error(`Error: ${message || "An unknown error occurred."}`);
          }
        } else if (error.request) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      });
};

  return (
    <section className={styles.section}>
        <Logo />
        <section className={styles.signupSection}>
          <h2 className={styles.title}>Sign Up</h2>
          <Formik
            initialValues={{ email: "", password: "", repeatPassword: "" }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            >
            {({ errors, touched, handleSubmit, setFieldTouched }) => (
                <Form className={styles.signupForm} noValidate onSubmit={handleSubmit}>  
                <label className={styles.label}>Email</label>
                <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`${styles.input} ${
                    touched.email && errors.email ? styles.errorInput : ""
                    }`}
                    onBlur={() => setFieldTouched("email", true)}
                />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />

                <label className={styles.label}>Password</label>
                <div className={styles.passwordWrapper}>
                    <Field
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`${styles.input} ${
                        touched.password && errors.password ? styles.errorInput : ""
                    }`}
                    onBlur={() => setFieldTouched("password", true)}
                    />
                    <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className={styles.togglePassword}
                    >
                    <svg className={styles.icon} width="24" height="24">
                        <use xlinkHref={`/images/icons.svg#${showPassword.password ? "icon-eye" : "icon-eye-off"}`} />
                    </svg>
                    </button>
                </div>
                <ErrorMessage name="password" component="div" className={styles.errorMessage} />

                <label className={styles.label}>Repeat password</label>
                <div className={styles.passwordWrapper}>
                    <Field
                    name="repeatPassword"
                    type={showPassword.repeatPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    className={`${styles.input} ${
                        touched.repeatPassword && errors.repeatPassword ? styles.errorInput : ""
                    }`}
                    onBlur={() => setFieldTouched("repeatPassword", true)}
                    />
                    <button
                    type="button"
                    onClick={() => togglePasswordVisibility("repeatPassword")}
                    className={styles.togglePassword}
                    >
                    <svg className={styles.icon} width="24" height="24">
                        <use xlinkHref={`/images/icons.svg#${showPassword.repeatPassword ? "icon-eye" : "icon-eye-off"}`} />
                    </svg>
                    </button>
                </div>
                <ErrorMessage name="repeatPassword" component="div" className={styles.errorMessage} />

                <button type="submit" className={styles.signupBtn}>
                    Sign Up
                </button>
                </Form>
            )}
          </Formik>
          <p className={styles.signinLink}>
            Already have account?{" "}
            <Link to="/signin" className={styles.signinLinkText}>Sign In</Link>
          </p>
        </section>
      <ToastContainer />
    </section>
  );
};

export default SignUpPage;