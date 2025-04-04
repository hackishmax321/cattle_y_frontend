import React, { useState, useEffect } from "react";

const VaccinationForm = ({ temp }) => {
  const [formData, setFormData] = useState({
    vaccinationType: "", // New field for vaccination type
    vaccinationDate: "", // New field for vaccination date
    vaccinationDetails: "", // New field for additional vaccination details
  });

  const [vaccinationRecords, setVaccinationRecords] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for vaccination notifier
  const handleVaccinationSubmit = (e) => {
    e.preventDefault();
    setVaccinationRecords((prevRecords) => [
      ...prevRecords,
      {
        id: prevRecords.length + 1,
        vaccinationType: formData.vaccinationType,
        vaccinationDate: formData.vaccinationDate,
        vaccinationDetails: formData.vaccinationDetails,
      },
    ]);
    setFormData({
      vaccinationType: "",
      vaccinationDate: "",
      vaccinationDetails: "",
    });
  };

  // Remove vaccination record
  const handleRemoveRecord = (id) => {
    setVaccinationRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== id)
    );
  };

  // Update form data when parent prop (`temp`) changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      temperature: temp || "",
    }));
  }, [temp]);

  return (
    <div
      style={{
        // maxWidth: "500px",
        // margin: "0 auto",
        // padding: "20px",
        // border: "1px solid #ddd",
        // borderRadius: "8px",
        // backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Reminder and Alert Set</h2>
      <form onSubmit={handleVaccinationSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Vaccination Type:
          </label>
          <select
            name="vaccinationType"
            value={formData.vaccinationType}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select a Vaccination Type</option>
            <option value="Bovine Tuberculosis">Bovine Tuberculosis</option>
            <option value="Brucellosis">Brucellosis</option>
            <option value="Foot and Mouth Disease">Foot and Mouth Disease</option>
            <option value="Black Quarter">Black Quarter</option>
            <option value="Anthrax">Anthrax</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Vaccination Date:
          </label>
          <input
            type="date"
            name="vaccinationDate"
            value={formData.vaccinationDate}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Additional Details:
          </label>
          <textarea
            name="vaccinationDetails"
            value={formData.vaccinationDetails}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              minHeight: "100px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          Submit Vaccination Notifier
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ textAlign: "center" }}>Vaccination Notifications</h2>
        {vaccinationRecords.length === 0 && (
          <p>No vaccination records available.</p>
        )}
        {vaccinationRecords.map((record) => (
          <div
            key={record.id}
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <button
              onClick={() => handleRemoveRecord(record.id)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "transparent",
                border: "none",
                color: "red",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              &#10006; {/* Red cross icon */}
            </button>
            <h3>Vaccination Record {record.id}</h3>
            <p>Vaccination Type: {record.vaccinationType}</p>
            <p>Vaccination Date: {record.vaccinationDate}</p>
            <p>Additional Details: {record.vaccinationDetails}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaccinationForm;
