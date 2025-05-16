import React from "react";

const Alert = (props) => {
  //initally props.alert.type and msg are not setup so react will show error that can't read property of null so it is a trick to render it 
  return (
    <>
   {props.alert && props.alert.type && props.alert.message && (
  <div className={`alert alert-${props.alert.setClass}`} role="alert">
    <strong>{props.alert.type}</strong>: {props.alert.message}
  </div>
)}

      </>
  );
};

export default Alert;
