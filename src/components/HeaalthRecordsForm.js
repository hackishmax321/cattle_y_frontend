// components/HealthRecordForm.js
import React, { useState } from 'react';
import diseases from '../data/catle_diseases.json';

const HealthRecordForm = () => {
  const initialConditions = {
    "anorexia": 0,
    "abdominal_pain": 0,
    "anaemia": 0,
    "abortions": 0,
    "acetone": 0,
    "aggression": 0,
    "arthrogyposis": 0,
    "ankylosis": 0,
    "anxiety": 0,
    "bellowing": 0,
    "blood_loss": 0,
    "blood_poisoning": 0,
    "blisters": 0,
    "colic": 0,
    "Condemnation_of_livers": 0,
    "conjunctivae": 0,
    "coughing": 0,
    "depression": 1,
    "discomfort": 0,
    "dyspnea": 0,
    "dysentery": 0,
    "diarrhoea": 0,
    "dehydration": 0,
    "drooling": 0,
    "dull": 0,
    "decreased_fertility": 0,
    "diffculty_breath": 0,
    "emaciation": 0,
    "encephalitis": 0,
    "fever": 1,
    "facial_paralysis": 0,
    "frothing_of_mouth": 0,
    "frothing": 0,
    "gaseous_stomach": 0,
    "highly_diarrhoea": 0,
    "high_pulse_rate": 0,
    "high_temp": 0,
    "high_proportion": 0,
    "hyperaemia": 0,
    "hydrocephalus": 0,
    "isolation_from_herd": 0,
    "infertility": 0,
    "intermittent_fever": 0,
    "jaundice": 0,
    "ketosis": 0,
    "loss_of_appetite": 1,
    "lameness": 0,
    "lack_of-coordination": 0,
    "lethargy": 0,
    "lacrimation": 0,
    "milk_flakes": 1,
    "milk_watery": 1,
    "milk_clots": 1,
    "mild_diarrhoea": 0,
    "moaning": 0,
    "mucosal_lesions": 0,
    "milk_fever": 0,
    "nausea": 0,
    "nasel_discharges": 0,
    "oedema": 0,
    "pain": 0,
    "painful_tongue": 0,
    "pneumonia": 0,
    "photo_sensitization": 0,
    "quivering_lips": 0,
    "reduction_milk_vields": 0,
    "rapid_breathing": 0,
    "rumenstasis": 0,
    "reduced_rumination": 0,
    "reduced_fertility": 0,
    "reduced_fat": 0,
    "reduces_feed_intake": 0,
    "raised_breathing": 0,
    "stomach_pain": 0,
    "salivation": 0,
    "stillbirths": 0,
    "shallow_breathing": 0,
    "swollen_pharyngeal": 0,
    "swelling": 0,
    "saliva": 0,
    "swollen_tongue": 0,
    "tachycardia": 0,
    "torticollis": 0,
    "udder_swelling": 0,
    "udder_heat": 0,
    "udder_hardeness": 0,
    "udder_redness": 0,
    "udder_pain": 0,
    "unwillingness_to_move": 0,
    "ulcers": 0,
    "vomiting": 0,
    "weight_loss": 0,
    "weakness": 0,
  };

  const diseasesData = diseases;

  const [conditions, setConditions] = useState(initialConditions);
  const [possibleDiseases, setPossibleDiseases] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setConditions(prevState => ({
      ...prevState,
      [name]: checked ? 1 : 0
    }));
  };

  const searchDiseases = () => {
    console.log("Available Diseases Data:", diseasesData);
  
    const selectedConditions = Object.keys(conditions).filter(condition => conditions[condition] === 1);
  
    let diseaseMatches = diseasesData.map(diseaseRecord => {
      const { prognosis, ...symptoms } = diseaseRecord;
      const diseaseSymptoms = Object.keys(symptoms).filter(symptom => symptoms[symptom] === 1);
  
      // Count how many selected conditions match the disease symptoms
      const matchCount = selectedConditions.filter(condition => diseaseSymptoms.includes(condition)).length;
  
      return { prognosis, matchCount, totalSymptoms: diseaseSymptoms.length };
    });
  
    // Sort diseases based on match count in descending order
    diseaseMatches.sort((a, b) => b.matchCount - a.matchCount);
  
    console.log("Matching Diseases (Sorted by Score):", diseaseMatches);
  
    // Set the highest matching disease (first index)
    const highestMatchingDisease = diseaseMatches.length > 0 ? diseaseMatches[0].prognosis : null;
  
    setPossibleDiseases(highestMatchingDisease);
  };
  

  return (
    <div className="recentCustomers">
      <div className="cardHeader">
        <h2>Health Condition Checklist</h2>
      </div>
      <form>
        <div className="checkboxList">
          {Object.keys(conditions).map((condition, index) => (
            <div key={index} className="checkboxItem">
              <label className="checkboxLabel">
                {condition}
              </label>
              <input
                type="checkbox"
                name={condition}
                checked={conditions[condition] === 1}
                onChange={handleCheckboxChange}
                className="checkboxInput"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={searchDiseases} className="searchButton">
          Search Possible Diseases
        </button>
      </form>
          {possibleDiseases && (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Most Likely Disease:
        </h3>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#d9534f",
            margin: "0",
          }}
        >
          {possibleDiseases}
        </p>
      </div>
    )}
    </div>
  );
};

export default HealthRecordForm;
