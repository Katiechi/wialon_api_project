// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginButton from './components/LoginButton';
import Dashboard from './components/Dashboard';
import CallbackHandler from './components/CallbackHandler';

// Function to extract 'eid' value from JSON data
const extractEidValue = (jsonData) => {
  try {
    // Assuming the 'eid' property is present in the JSON data
    const eidValue = jsonData.eid;
    return eidValue;
  } catch (error) {
    console.error('Error extracting eid value:', error);
    return null; // Return null or handle the error as needed
  }
};

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Redirect the user to the Wialon authorization URL
    const redirectUri = `${window.location.origin}/callback`;
    const authUrl = `https://track.trackinghub.co.ke/login.html?access_type=-1&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  const handleCallback = () => {
    // Extract the query parameters from the callback URL
    const queryParams = new URLSearchParams(window.location.search);
  
    // Check if the URL contains an error parameter
    const errorParam = queryParams.get('error');
    if (errorParam) {
      setError(errorParam);
      return;
    }
  
    // Extract the access token parameter from the callback URL
    const accessTokenParam = queryParams.get('access_token');
  
    if (accessTokenParam) {
      // Log the access token to the console
      console.log('Access Token:', accessTokenParam);
  
      // Set the access token
      setAccessToken(accessTokenParam);
    } else {
      setError('Access token not found in the callback URL');
    }
  };
  

  useEffect(() => {
    // You can add additional logic here if needed
    console.log(accessToken);
  
    const fetchData = async () => {
      try {
        const response = await fetch('/wialon-api/wialon/ajax.html?svc=token/login&params={"token":"' + accessToken + '"}');
        const data = await response.json();
        console.log('Raw JSON data:', data);
  
        // Extract the 'eid' value using the function
        const eidValue = extractEidValue(data);
  
        // Log or handle the 'eid' value as needed
        console.log('Extracted eid value:', eidValue);
  
        // Assuming 'sid' is a constant value or obtained from somewhere
        const sid = '51f71925306defd2b8cfecaef3835408';
  
        // Construct the new endpoint with the dynamic 'eid' value
        const newEndpoint = `/wialon-api/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"DEMO UNIT","sortType":"sys_name"},"force":1,"flags":4096,"from":0,"to":0}&sid=${eidValue}`;
  
        // Perform a fetch on the new endpoint
        const searchItemsResponse = await fetch(newEndpoint);
        const searchItemsData = await searchItemsResponse.json();
        
        console.log('Search Items API Response:', searchItemsData);
  
        // Assuming dispatch and setData are defined somewhere in your component
        // dispatch(setData(searchItemsData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 5000);
  
    return () => clearInterval(interval);
  
  }, [accessToken]);
  
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              accessToken ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginButton onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard accessToken={accessToken} />}
          />
          <Route
            path="/callback"
            element={<CallbackHandler onCallback={handleCallback} />}
          />
        </Routes>
        {error && <p>Error: {error}</p>}
      </div>
    </Router>
  );
};

export default App;
