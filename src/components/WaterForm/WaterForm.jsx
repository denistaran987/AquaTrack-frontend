import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addWater, updateWater } from "../../redux/waterSlice/slice.js";
import { closeModal } from "../../redux/waterModal/slice.js";

const WaterForm = ({ type, initialValues }) => {
  const dispatch = useDispatch();

  
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(50, "Минимальное значение 50 мл")
      .max(2000, "Максимальное значение 2000 мл")
      .required("Введите количество воды"),
    time: Yup.string().required("Выберите время"),
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
    <form onSubmit={formik.handleSubmit}>
      
      <label>
        Amount (ml):
        <input
          type="number"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.amount && formik.errors.amount && (
          <div className="error">{formik.errors.amount}</div>
        )}
      </label>

     
      <label>
        Time:
        <input
          type="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.time && formik.errors.time && (
          <div className="error">{formik.errors.time}</div>
        )}
      </label>

     
      <button type="submit">{type === "add" ? "Add" : "Save"}</button>
    </form>
  );
};

export default WaterForm;
