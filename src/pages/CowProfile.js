// pages/MilkProduction.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import UserSummary from '../components/UserSummary';
import CattleForm from '../components/CattleForm';
import ENV from '../data/Env';

const CowProfile = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [cattles, setCattles] = useState([]); 

  const addNewCattle = (newCattle) => {
    setCattles((prevCattles) => [...prevCattles, newCattle]);
  };

  const removeCattle = (id) => {
    setCattles((prevCattles) => prevCattles.filter((cattle) => cattle.id !== id));
  }

  // Fetch cattles on component mount
  useEffect(() => {
    const fetchCattles = async () => {
      try {
        const response = await fetch(`${ENV.SERVER}/cattle/owner/${user.username}`);
        const data = await response.json();
        setCattles(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching cattles:', error);
      }
    };

    if (user.username) {
      fetchCattles(); 
    }
  }, [user.username]);


  return (
    <div className="dashContainer">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="details">
          <UserSummary user={user} cattles={cattles} removeCattle={removeCattle}/>
          <CattleForm user={user} addNewCattle={addNewCattle}/>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CowProfile;
