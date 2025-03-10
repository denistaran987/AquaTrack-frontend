import React, { useState } from 'react';
import Modal from './Modal/Modal.jsx';
import AddWaterModal from './AddWaterModal/AddWaterModal.jsx';
import EditWaterModal from './EditWaterModal/EditWaterModal.jsx';

const WaterTracker = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div>
      <h1>Water Tracker</h1>
      <button onClick={() => setIsAddModalOpen(true)}>Add Water</button>
      <button onClick={() => setIsEditModalOpen(true)}>Edit Water</button>

      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} toggleModal={() => setIsAddModalOpen(false)}>
          <AddWaterModal onClose={() => setIsAddModalOpen(false)} />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} toggleModal={() => setIsEditModalOpen(false)}>
          <EditWaterModal onClose={() => setIsEditModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default WaterTracker;