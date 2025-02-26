import React, { useState } from 'react';
import axios from 'axios';
import ENV from '../data/Env';

const DiseaseUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Content mapping for each condition
  const conditionInfo = {
    dermatitis: {
      description: "Dermatitis is an inflammation of the skin that can cause redness, swelling, and itching. It is often caused by allergens or infections.",
      remedies: [
        "Apply topical steroids as prescribed by a vet.",
        "Use anti-inflammatory medications to reduce swelling.",
        "Maintain a clean and dry environment to avoid further irritation."
      ]
    },
    healthycows: {
      description: "This is a healthy cow without any visible conditions or diseases. Maintain proper care and feeding.",
      remedies: [
        "Ensure cows have access to clean water and good nutrition.",
        "Regularly check cows for any signs of illness.",
        "Maintain proper hygiene and sanitation in living areas."
      ]
    },
    lumpycows: {
      description: "Lumpy skin disease is a viral infection that causes fever, swelling, and nodules on the skin. It is spread by insect bites.",
      remedies: [
        "Consult a vet for appropriate vaccination and treatment options.",
        "Ensure cows are isolated to prevent the spread of the disease.",
        "Use insect repellents to reduce the risk of transmission."
      ]
    },
    respiratory: {
      description: "Respiratory diseases in cows can cause coughing, nasal discharge, and difficulty breathing. It is often caused by infections or environmental factors.",
      remedies: [
        "Consult a vet for antibiotics if an infection is diagnosed.",
        "Ensure good ventilation in barns to prevent respiratory issues.",
        "Keep cows away from dust or smoke that could worsen symptoms."
      ]
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  // Handle disease detection
  const handleDetectDisease = async () => {
    if (!uploadedImage) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedImage);

    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post(ENV.SERVER+'/predict-pest', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error detecting disease:', error);
      alert('Failed to detect disease.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Disease Detection</h2>
      </div>

      {/* Image Upload Section */}
      <div className="uploadSection">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="uploadButton"
        />
        {previewUrl && (
          <div className="imagePreview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
        <button onClick={handleDetectDisease} className="detectButton">
          {loading ? 'Detecting...' : 'Detect Disease'}
        </button>
      </div>

      {/* Prediction Results */}
      {prediction && (
        <div className="predictionResult">
          <h3>Prediction:</h3>
          <p>
            <strong>Label:</strong> {prediction.predicted_label}
          </p>
          <p>
            <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%
          </p>

          {/* Display condition details and remedies */}
          {prediction.predicted_label && conditionInfo[prediction.predicted_label] && (
            <div className="conditionDetails">
              <h4>Condition Details:</h4>
              <p>{conditionInfo[prediction.predicted_label].description}</p>

              <h5>Recommended Remedies:</h5>
              <ul className='ct-rem'>
                {conditionInfo[prediction.predicted_label].remedies.map((remedy, index) => (
                  <li key={index}>{remedy}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseUpload;
