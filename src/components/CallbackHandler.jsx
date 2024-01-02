// src/components/CallbackHandler.js
import React, { useEffect } from 'react';


const CallbackHandler = ({ onCallback }) => {
  useEffect(() => {
    // Perform any necessary logic for callback handling
    onCallback();
  }, [onCallback]);

  return <div>Callback Handling...</div>;
};

export default CallbackHandler;
