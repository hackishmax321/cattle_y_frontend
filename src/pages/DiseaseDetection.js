// pages/DiseaseDetection.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import DiseaseUpload from '../components/DiseaseUpload';
import InformationContainer from '../components/InformationContainer';
import HealthRecordForm from '../components/HeaalthRecordsForm';

const DiseaseDetection = () => {
  return (
    <div className="dashContainer">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="details">
          <DiseaseUpload />
          <HealthRecordForm />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DiseaseDetection;
