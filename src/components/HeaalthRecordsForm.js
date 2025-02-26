// components/HealthRecordForm.js
import React, { useState } from 'react';
import diseases from '../data/diseases.json';

const HealthRecordForm = () => {
  const initialConditions = {
    "nervous system disorders": 0,
    "blister-like lesions on the skin": 0,
    "respiratory distress": 0,
    "scabby lesions on the lips and muzzle": 0,
    "foul breath": 0,
    "painful mouth": 0,
    "decreased performance": 0,
    "colic": 0,
    "blood in urine": 0,
    "lethargy": 0,
    "dark urine": 0,
    "loss of appetite": 0,
    "oral ulcers": 0,
    "immunosuppression": 0,
    "nervousness": 0,
    "rough hair coat": 0,
    "pale mucous membranes": 0,
    "bone abnormalities": 0,
    "watching porn": 0,
    "Macendastit attack": 0,
    "Floodistic brain": 0,
    "Klingonist speak": 0,
    "Watcheist sense": 0,
    "Fortnight": 0,
    "Sarvagya": 0,
    "Chicken poloeo dance": 0,
    "Boringist sight": 0,
    "Namelist forget": 0,
    "Fly short": 0,
    "Backneck crawl": 0,
    "Blingduh sneeze": 0,
    "Squirreling stare": 0,
    "Choir scream": 0,
    "Floor fart": 0,
    "Cronin": 0,
    "Wallcrawl": 0,
    "Bookdrool": 0,
    "Hatchatter": 0,
    "Socksing": 0,
    "Bedonscream": 0,
    "Toilet-stare": 0,
    "Smell-shout": 0,
    "See-chatter": 0,
    "Feeling Farty": 0,
    "nervous system disorders__1": 0,
    "blister-like lesions on the skin__1": 0,
    "respiratory distress__1": 0,
    "scabby lesions on the lips and muzzle__1": 0,
    "foul breath__1": 0,
    "painful mouth__1": 0,
    "decreased performance__1": 0,
    "colic__1": 0,
    "blood in urine__1": 0,
    "lethargy__1": 0,
    "dark urine__1": 0,
    "loss of appetite__1": 0,
    "oral ulcers__1": 0,
    "immunosuppression__1": 0,
    "nervousness__1": 0,
    "rough hair coat__1": 0,
    "pale mucous membranes__1": 0,
    "bone abnormalities__1": 0,
    "watching porn__1": 0,
    "Macendastit attack__1": 0,
    "Floodistic brain__1": 0,
    "Klingonist speak__1": 0,
    "Watcheist sense__1": 0,
    "Fortnight__1": 0,
    "Sarvagya__1": 0,
    "Chicken poloeo dance__1": 0,
    "Boringist sight__1": 0,
    "Namelist forget__1": 0,
    "Fly short__1": 0,
    "Backneck crawl__1": 0,
    "Blingduh sneeze__1": 0,
    "Squirreling stare__1": 0,
    "Choir scream__1": 0,
    "Floor fart__1": 0,
    "Cronin__1": 0,
    "Wallcrawl__1": 0,
    "Bookdrool__1": 0,
    "Hatchatter__1": 0,
    "Socksing__1": 0,
    "Bedonscream__1": 0,
    "Toilet-stare__1": 0,
    "Smell-shout__1": 0,
    "See-chatter__1": 0,
    "Feeling Farty__1": 0,
    "nervous system disorders__2": 0,
    "blister-like lesions on the skin__2": 0,
    "respiratory distress__2": 0,
    "scabby lesions on the lips and muzzle__2": 0,
    "foul breath__2": 0,
    "painful mouth__2": 0,
    "decreased performance__2": 0,
    "colic__2": 0,
    "blood in urine__2": 0,
    "lethargy__2": 0,
    "dark urine__2": 0,
    "loss of appetite__2": 0,
    "oral ulcers__2": 0,
    "immunosuppression__2": 0,
    "nervousness__2": 0,
    "rough hair coat__2": 0,
    "pale mucous membranes__2": 0,
    "bone abnormalities__2": 0,
    "watching porn__2": 0,
    "Macendastit attack__2": 0,
    "Floodistic brain__2": 0,
    "Klingonist speak__2": 0,
    "Watcheist sense__2": 0,
    "Fortnight__2": 0,
    "Sarvagya__2": 0,
    "Chicken poloeo dance__2": 0,
    "Boringist sight__2": 0,
    "Namelist forget__2": 0,
    "Fly short__2": 0,
    "Backneck crawl__2": 0,
    "Blingduh sneeze__2": 0,
    "Squirreling stare__2": 0,
    "Choir scream__2": 0,
    "Nintendo": 0
  };

  const diseasesData = diseases;

  const [conditions, setConditions] = useState(initialConditions);
  const [possibleDiseases, setPossibleDiseases] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setConditions(prevState => ({
      ...prevState,
      [name]: checked ? 1 : 0
    }));
  };

  const searchDiseases = () => {
    console.log(diseases)
    const selectedConditions = Object.keys(conditions).filter(condition => conditions[condition] === 1);
    const matchingDiseases = [];

    for (const disease in diseasesData) {
      const diseaseConditions = diseasesData[disease];
      const isMatch = selectedConditions.every(condition => diseaseConditions[condition] === 1);
      
      if (isMatch) {
        matchingDiseases.push(disease);
      }
    }

    setPossibleDiseases(matchingDiseases);
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
      {possibleDiseases.length > 0 && (
        <div className="diseaseResults">
          <h3>Possible Diseases:</h3>
          <ul>
            {possibleDiseases.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthRecordForm;
