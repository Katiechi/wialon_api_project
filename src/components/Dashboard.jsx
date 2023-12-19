// components/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/wialon/wialon/ajax.html?svc=core/search_items&params={"spec":{"itemsType":"avl_unit","propName":"sys_name","propValueMask":"DEMO UNIT","sortType":"sys_name"},"force":1,"flags":4096,"from":0,"to":0}&sid=51f71925306defd2b8cfecaef3835408');
        const data = await response.json();
        console.log(data);
        dispatch(setData(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <div>
      <h1>Real-time Fleet Monitoring Dashboard</h1>
      <div className="dashboard">
        {/* Render your dashboard components using the 'data' from Redux state */}
      </div>
    </div>
  );
};

export default Dashboard;
