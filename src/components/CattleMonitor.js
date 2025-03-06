import React, { useState, useEffect } from 'react';
import { db } from '../data/Firebase';
import { ref, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const CattleMonitor = ({ cattle }) => {
    const navigate = useNavigate()
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMilliseconds = today - birth;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    const ageInMonths = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    return `${ageInYears} years, ${ageInMonths} months`;
  };

  const [cowData, setCowData] = useState({
    name: '',
    id: '',
    age: '',
    breed: '',
    health: '',
    owner: '',
    status: '',
    image: '',
  });

  const [iotData, setIotData] = useState({
    COUNT: 'Loading...',
    DegreeC: 'Loading...',
    trance: 'Loading...',
  });

  useEffect(() => {
    if (cattle) {
      setCowData({
        name: cattle.name || '',
        id: cattle.id || '',
        age: calculateAge(cattle.birth),
        breed: cattle.breed || '',
        health: cattle.health || '',
        owner: cattle.owner || '',
        status: cattle.status || '',
        image: cattle.image || '',
      });
    }
  }, [cattle]);

  useEffect(() => {
    const iotCOUNT = ref(db, 'COUNT'); 
    const iotDegreeC = ref(db, 'DegreeC'); 
    const iotTrance = ref(db, 'trance'); 
  
    // Fetch data from multiple references
    const unsubscribeCOUNT = onValue(iotCOUNT, (snapshot) => {
        console.log(snapshot.val())
      setIotData((prevData) => ({
        ...prevData,
        COUNT: snapshot.val() !== null ? Number(snapshot.val()) : 'N/A',
      }));
    });
  
    const unsubscribeDegreeC = onValue(iotDegreeC, (snapshot) => {
      setIotData((prevData) => ({
        ...prevData,
        DegreeC: snapshot.val() !== null ? Number(snapshot.val()) : 'N/A',
      }));
    });
  
    const unsubscribeTrance = onValue(iotTrance, (snapshot) => {
      setIotData((prevData) => ({
        ...prevData,
        trance: snapshot.val() !== null ? Number(snapshot.val()) : 'N/A',
      }));
    });
  
    // Cleanup function to unsubscribe on unmount
    return () => {
      unsubscribeCOUNT();
      unsubscribeDegreeC();
      unsubscribeTrance();
    };
  }, []);

  const isOutOfRange = (value, min, max) => value < min || value > max;

  const showAlert = 
    isOutOfRange(iotData.DegreeC, 38.5, 39.5) ||
    isOutOfRange(iotData.trance, 48, 84) ||
    isOutOfRange(iotData.COUNT, 95, 100);

  const getActionInstructions = () => {
    if (isOutOfRange.DegreeC && isOutOfRange.COUNT) {
      return "The cow is experiencing abnormal body temperature and low oxygen levels. Ensure a proper ventilation system, provide cool water, and consult a veterinarian immediately.";
    } else if (isOutOfRange.DegreeC) {
      return "The cow's body temperature is outside the normal range. Provide a cool and shaded environment, ensure hydration, and monitor closely.";
    } else if (isOutOfRange.COUNT) {
      return "The cow's oxygen saturation is below normal. Check for respiratory issues, improve ventilation, and seek veterinary attention.";
    }
    return "Health parameters are within the normal range.";
  };

  const handleChange = (e) => {
    setCowData({ ...cowData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  return (
    <div className='recentOrders'>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Section: Cattle Profile */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: 'auto', marginBottom: '10px' }}>
            <img src={cowData.image} alt={cowData.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <input name="name" placeholder="Cow Name" style={inputStyle} onChange={handleChange} value={cowData.name} />
          <input name="id" placeholder="Cow ID" style={inputStyle} onChange={handleChange} value={cowData.id} />
          <input name="age" placeholder="Cow Age" style={inputStyle} onChange={handleChange} value={cowData.age} />
          <input name="breed" placeholder="Cow Breed" style={inputStyle} onChange={handleChange} value={cowData.breed} />
        </div>

        {/* Right Section: Health Status */}
        <div style={{ flex: 2 }}>
          <h2>Health Status</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>Measures</th>
                <th style={thTdStyle}>Normal Range</th>
                <th style={thTdStyle}>Your Cow Level</th>
              </tr>
            </thead>
            <tbody>
                <tr style={isOutOfRange(iotData.DegreeC, 38.5, 39.5) ? { backgroundColor: 'red', color: 'white' } : {}}>
                    <td style={thTdStyle}>Body Temperature</td>
                    <td style={thTdStyle}>38.5 - 39.5°C</td>
                    <td style={thTdStyle}>{iotData.DegreeC}°C</td>
                </tr>
                <tr style={isOutOfRange(iotData.trance, 48, 84) ? { backgroundColor: 'red', color: 'white' } : {}}>
                    <td style={thTdStyle}>Heart Rate (Pulse Rate)</td>
                    <td style={thTdStyle}>48 - 84 bpm</td>
                    <td style={thTdStyle}>{iotData.trance} bpm</td>
                </tr>
                <tr style={isOutOfRange(iotData.COUNT, 95, 100) ? { backgroundColor: 'red', color: 'white' } : {}}>
                    <td style={thTdStyle}>Oxygen Saturation</td>
                    <td style={thTdStyle}>95 - 100%</td>
                    <td style={thTdStyle}>{iotData.COUNT}%</td>
                </tr>
            </tbody>
          </table>
          <p style={{ color: 'red', fontWeight: 'bold' }}>{getActionInstructions()}</p>
          {showAlert && <button 
          onClick={() => {navigate('/logged/map')}}
          style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>Get Treatments</button>}
        </div>
      </div>

      {/* Reminder and Alert Set */}
      <div style={{ marginTop: '20px' }}>
        <h3>Reminder and Alert Set</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', marginTop: '10px' }}>
          <input placeholder="Vet Checkup" style={inputStyle} />
          <button style={buttonStyle}>Set</button>
          <input placeholder="Vaccination" style={inputStyle} />
          <button style={buttonStyle}>Set</button>
          <input placeholder="Medical Treatment" style={inputStyle} />
          <button style={buttonStyle}>Set</button>
        </div>
      </div>

      {/* Action and Recommendation */}
      <div style={{ marginTop: '20px' }}>
        <h3>Action and Recommendation</h3>
        <p><strong>Health Status:</strong> {cowData.health}</p>
        <p><strong>Status:</strong> {cowData.status}</p>
        <p><strong>Owner:</strong> {cowData.owner}</p>
        <p><strong>Nutrition and Food:</strong> Provide a balanced diet rich in minerals and vitamins.</p>
        <button style={buttonStyle}>Contact Vet</button>
      </div>
    </div>
  );
};

export default CattleMonitor;
