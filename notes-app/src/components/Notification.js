import React from 'react';
import PropTypes from 'prop-types';

const Notification = (props) => {
  Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
  };
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
