import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addWater, updateWater } from "../../redux/waterSlice/slice.js";
import { closeModal } from "../../redux/waterModal/slice.js";
import css from "./WaterForm.module.css"; 

const WaterForm = ({ type, initialValues }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(50, "min 50 ml")
      .max(2000, "max 2000 ml")
      .required("amount of water"),
    time: Yup.string().required("time"),
  });

  const formik = useFormik({
    initialValues: initialValues || { amount: "", time: "" },
    validationSchema,
    onSubmit: (values) => {
      if (type === "add") {
        dispatch(addWater(values));
      } else {
        dispatch(updateWater(values));
      }
      dispatch(closeModal());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <label className={css.label}>
        Amount (ml):
        <input
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={css.input}
        />
        {formik.touched.amount && formik.errors.amount && (
          <div className={css.error}>{formik.errors.amount}</div>
        )}
      </label>

      <label className={css.label}>
        Time:
        <input
          type="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={css.input}
        />
        {formik.touched.time && formik.errors.time && (
          <div className={css.error}>{formik.errors.time}</div>
        )}
      </label>

      <button type="submit" className={css.button}>
        {type === "add" ? "Add" : "Save"}
      </button>
    </form>
  );
};

export default WaterForm;