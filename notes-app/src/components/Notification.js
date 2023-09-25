import React from 'react';
import PropTypes from 'prop-types';

const Notification = (props) => {
  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
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
