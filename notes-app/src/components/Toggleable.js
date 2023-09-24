import React, { useState, useImperativeHandle } from 'react';

import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
  };
  console.log(typeof props.children);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel} </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
