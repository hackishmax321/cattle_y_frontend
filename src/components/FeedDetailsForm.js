import React, { useState, useEffect } from "react";

const FeedDetailsForm = ({ temp }) => {
  const [formData, setFormData] = useState({
    temperature: temp || "", // Default to the `temp` prop, if provided
    milkIntake: "",
    bodyScore: "", // Add Body Score
    rumenFill: "", // Add Rumen Fill
  });

  const [records, setRecords] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords((prevRecords) => [
      ...prevRecords,
      {
        id: prevRecords.length + 1,
        ...formData,
      },
    ]);
    setFormData({
      temperature: temp || "", // Reset the temperature to the prop value
      milkIntake: "",
      bodyScore: "",
      rumenFill: "",
    });
  };

  // Update form data when parent prop (`temp`) changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      temperature: temp || "",
    }));
  }, [temp]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center" }}>Feed Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Temperature:</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            required
            disabled
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
          <label style={{ display: "block", marginBottom: "5px" }}>Milk Intake (ml):</label>
          <input
            type="number"
            name="milkIntake"
            value={formData.milkIntake}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Body Score:</label>
          <input
            type="number"
            name="bodyScore"
            value={formData.bodyScore}
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
          <label style={{ display: "block", marginBottom: "5px" }}>Rumen Fill:</label>
          <input
            type="number"
            name="rumenFill"
            value={formData.rumenFill}
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
          Submit
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ textAlign: "center" }}>Feed Records</h2>
        {records.map((record) => (
          <div
            key={record.id}
            className="card"
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Record {record.id}</h3>
            <p>Temperature: {record.temperature}°C</p>
            <p>Milk Intake: {record.milkIntake} ml</p>
            <p>Body Score: {record.bodyScore}</p>
            <p>Rumen Fill: {record.rumenFill}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedDetailsForm;
