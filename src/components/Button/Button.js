import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';


const Button = props => {
  return (
    <button onClick={props.onClick} className="button button-cta">
      {props.children}
    </button>
  );
};
export default Button

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string,

}