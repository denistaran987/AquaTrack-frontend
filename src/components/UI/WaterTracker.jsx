import React, { useState } from 'react';
import Modal from './Modal/Modal.jsx';
import WaterModal from './WaterModal/WaterModal.jsx';

const WaterTracker = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const initialEditData = {
    time: '10:00',
    usedAmount: 250,
  };

  return (
    <div>
      <h1>Water Tracker</h1>
      <button onClick={() => setIsAddModalOpen(true)}>Add Water</button>
      <button onClick={() => setIsEditModalOpen(true)}>Edit Water</button>

      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} toggleModal={() => setIsAddModalOpen(false)}>
          <WaterModal type="add" onClose={() => setIsAddModalOpen(false)} />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} toggleModal={() => setIsEditModalOpen(false)}>
          <WaterModal
            type="edit"
            initialData={initialEditData}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default WaterTracker;