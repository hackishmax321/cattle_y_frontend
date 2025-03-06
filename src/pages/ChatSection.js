// pages/ChatSection.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import ChatOutlet from '../components/ChatOutlet';
import ChatMessages from '../components/ChatMessages';
import axios from 'axios';
import ENV from '../data/Env';

const ChatSection = () => {
  const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {};
  });
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Failed to get your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      // Fetch nearby locations from backend
      const fetchNearbyLocations = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${ENV.SERVER}/nearby_locations`, {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
          });

          if (response.data.locations) {
            setLocations(response.data.locations);
          }
        } catch (error) {
          console.error("Error fetching nearby locations:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNearbyLocations();
    }
  }, [currentLocation]);


  return (
    <div className="dashContainer">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="details">
          <ChatMessages />
          <ChatOutlet locations={locations}
            setSelectedLocation={setSelectedLocation} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ChatSection;
