import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/waterModal/slice.js";
import WaterForm from "../WaterForm/WaterForm.jsx";

const WaterModal = () => {
  const dispatch = useDispatch();
  const { type, initialValues } = useSelector((state) => state.waterModal);

  return (
    <div className="modal">
      <div className="modal-content">
        
        <h2>{type === "add" ? "Add Water" : "Edit Water"}</h2>

        
        <WaterForm type={type} initialValues={initialValues} />

        
        <button onClick={() => dispatch(closeModal())}>Close</button>
      </div>
    </div>
  );
};

export default WaterModal;