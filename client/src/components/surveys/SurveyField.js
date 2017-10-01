// component to render one single label and one single text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  // props.input and ...input will include all eventHandlers
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }}/>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
