import React from 'react';

const Notification = (props) => {
  if (props.message === null) {
    return null;
  }
  return (
    <div className="error">
      <p>{props.message}</p>
    </div>
  );
};

export default Notification;
