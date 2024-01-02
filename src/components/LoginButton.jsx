// src/components/LoginButton.js
import React from 'react';

const LoginButton = ({ onLogin }) => {
  return <button onClick={onLogin}>Login with Wialon</button>;
};

export default LoginButton;
