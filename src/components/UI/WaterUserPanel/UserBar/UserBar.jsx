import React from 'react';

const UserBar = () => {
  return (
    <div>
      <button>
        <p>Nadia</p>
        <img src="/public/images/avatar_1.jpg" alt="" />
        <svg
          width="16"
          height="16"
          style={{ fill: 'none', stroke: 'white', transform: 'rotate(90deg)' }}
        >
          <use href="/images/icons.svg#icon-right"></use>
        </svg>
      </button>
    </div>
  );
};

export default UserBar;
