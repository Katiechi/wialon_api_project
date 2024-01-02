// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ accessToken }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
};

export default Dashboard;
