import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import ENV from "../data/Env";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MilkCollectionReport = ({ weatherData, cattles, username }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualData, setManualData] = useState({});
  const [selectedCattle, setSelectedCattle] = useState(null);

  useEffect(() => {
    const fetchMilkProductionData = async () => {
      console.log("Fetch");
      if (!weatherData || weatherData.length === 0) {
        setError("No weather data available.");
        console.log("No weather data available.");
        setLoading(true);
        return;
      }
      console.log("Fetch2");
      try {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-indexed
        const startDate = today.getDate();
    
        let dates = [];
        // Loop for the previous 7 days and the next 10 days (total 17 days)
        for (let i = -7; i < 10; i++) {
          let currentDate = new Date(year, month, startDate + i);
          let validMonth = currentDate.getMonth();
    
          // Break if the month changes (to ensure we're only getting the current month)
          // if (validMonth !== month) {
          //   break;
          // }

          console.log("Fetch3");
  
          dates.push(currentDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
        }
  
        const { main, weather } = weatherData[0];
        const temperature = main.temp;
        const humidity = main.humidity;
        const weatherDescription = weather[0].description.toLowerCase();
  
        const weatherTextMap = {
          "clear sky": "Clear",
          "few clouds": "Partially cloudy",
          "scattered clouds": "Partially cloudy",
          "broken clouds": "Overcast",
          "shower rain": "Rain, Partially cloudy",
          "rain": "Rain, Overcast",
          "thunderstorm": "Rain, Overcast"
        };
  
        const weatherText = weatherTextMap[weatherDescription] || "Clear";
        const predictions = {};
        const actuals = {};
  
        for (const date of dates) {
          const response = await axios.post(ENV.SERVER + "/milk-weather-predict", {
            year,
            month: month + 1,
            date: new Date(date).getDate(),
            temperature,
            humidity,
            rainfall: weatherText,
          });
  
          predictions[date] = response.data.predicted_milk_liters*cattles.length;
          const summaryResponse = await axios.get(`${ENV.SERVER}/milk-summary/${username}/${date}`);
          actuals[date] = summaryResponse.data.summary?.actual_total || 0;
          console.log(summaryResponse.data)
        }
  
        setChartData({
          labels: dates,
          datasets: [
            {
              label: "Predicted Milk Production (Liters)",
              data: dates.map((date) => predictions[date] || 0),
              borderColor: "orange",
              backgroundColor: "rgba(255, 165, 0, 0.2)",
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: "orange",
            },
            {
              label: "Actual Milk Production (Liters)",
              data: dates.map((date) => actuals[date] || 0),
              borderColor: "purple", // Actual data in purple
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              borderWidth: 2,
              pointRadius: 6,
              pointBackgroundColor: "purple",
            },
          ],
        });
  
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      }
    };
  
    fetchMilkProductionData();
  }, [weatherData, cattles]);
  

  const addManualEntry = () => {
    const dateInput = document.getElementById("manual-date").value;
    const amountInput = document.getElementById("manual-amount").value;
  
    if (!selectedCattle) {
      alert("Please select a cattle before adding a milk record.");
      return;
    }
  
    if (!dateInput || !amountInput) {
      alert("Please enter a valid date and amount.");
      return;
    }
  
    const formattedDate = new Date(dateInput).toISOString().split("T")[0];
  
    setManualData((prevData) => {
      const updatedData = { ...prevData };
      // Add the new amount to the existing value if the date exists, else set to the new value
      updatedData[formattedDate] = (updatedData[formattedDate] || 0) + parseFloat(amountInput);
  
      if (chartData) {
        setChartData((prevChart) => {
          // Combine existing chart data and manual data
          const updatedLabels = [...new Set([...prevChart.labels, formattedDate])].sort();
  
          // Generate new manual data for the updated labels
          const updatedManualData = updatedLabels.map((label) => updatedData[label] || 0);
  
          // Generate updated predicted data
          const updatedPredictions = updatedLabels.map((label) =>
            prevChart.labels.includes(label) ? prevChart.datasets[0].data[prevChart.labels.indexOf(label)] : 0
          );
  
          // Generate updated actual data, combining the existing and manual data
          const updatedActualData = updatedLabels.map((label) => {
            return updatedData[label] || (prevChart.datasets[1].data[prevChart.labels.indexOf(label)] || 0);
          });
  
          return {
            labels: updatedLabels,
            datasets: [
              {
                ...prevChart.datasets[0],
                data: updatedPredictions,
              },
              {
                label: "Actual Milk Production (Liters)",
                data: updatedActualData,
                borderColor: "purple", // Actual data in purple
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                borderWidth: 2,
                pointRadius: 6,
                pointBackgroundColor: "purple",
              },
              {
                label: "Manual Entry",
                data: updatedManualData,
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                borderWidth: 2,
                pointRadius: 6,
                pointBackgroundColor: "green",
              },
            ],
          };
        });
      }
  
      return updatedData;
    });
  };
  

const selectCattle = (cattle) => {
  setSelectedCattle(cattle);
};



  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Milk Production Prediction for the Next 10 Days",
        color: "#333",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: { ticks: { color: "#333" }, title: { display: true, text: "Dates", color: "#333" } },
      y: { ticks: { color: "#333" }, title: { display: true, text: "Liters Produced", color: "#333" }, beginAtZero: true },
    },
  };

  if (loading) return <p>Loading chart...</p>;

  const updateEntry = async () => {
    const dateInput = document.getElementById("manual-date").value;
    const amountInput = document.getElementById("manual-amount").value;
  
    if (!selectedCattle) {
      alert("Please select a cattle before updating a milk record.");
      return;
    }
  
    if (!dateInput || !amountInput) {
      alert("Please enter a valid date and amount.");
      return;
    }
  
    const formattedDate = new Date(dateInput).toISOString().split("T")[0];
  
    try {
      // Send the milk record update request
      const milkRecord = {
        cattle_id: selectedCattle.id,
        amount: parseFloat(amountInput),
        status: "ok", // You can adjust the status if necessary
      };
  
      await axios.post(`${ENV.SERVER}/milk-record/${selectedCattle.owner}/${formattedDate}`, milkRecord);
  
      // Update the daily milk summary for the date
      const dailyMilkSummary = {
        predicted_total: chartData?.datasets[0].data.reduce((acc, curr) => acc + curr, 0), // Sum of predicted milk
        actual_total: (manualData[formattedDate] || 0), // Add manual entry to actual total
      };
  
      await axios.post(`${ENV.SERVER}/milk-summary/${selectedCattle.owner}/${formattedDate}`, dailyMilkSummary);
  
      alert("Milk record updated successfully!");
    } catch (err) {
      alert("Failed to update the milk record. Please try again.");
      console.error(err);
    }
  };
  

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Milk Production Trend</h2>
      </div>
      <div className="chartContainer">
        {chartData && <Line data={chartData} options={options} />}
      </div>
      <div className="cardHeader">
        <h2>Milk Records</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
        
        <input 
          type="date" 
          id="manual-date" 
          max={new Date().toISOString().split("T")[0]} 
          style={{ width: "30%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
        />
        <input 
          type="number" 
          id="manual-amount" 
          placeholder="Liters" 
          min="0" 
          step="0.1"   
          style={{ width: "30%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
        />
        <button 
          onClick={addManualEntry} 
          style={{ 
            width: "15%", 
            backgroundColor: "green", 
            color: "white", 
            padding: "8px", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Add
        </button>
        <button 
          onClick={updateEntry} 
          style={{ 
            width: "25%", 
            backgroundColor: "blue", 
            color: "white", 
            padding: "8px", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Update
        </button>
      </div>


      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "20px" }}>
        {cattles.length === 0 ? (
          <p>No cattles available</p>
        ) : (
          cattles.map((cattle) => (
            <div 
            onClick={() => selectCattle(cattle)}
            key={cattle.id} style={{ backgroundColor: selectedCattle?.id === cattle.id ? "lightgreen" : "#f9f9f9", borderRadius: "8px", padding: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 2, marginRight: "16px" }}>
                <h3>{cattle.name}</h3>
                <small>({cattle.id})</small>
                <img src={cattle.image} alt={cattle.name} style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 2 }}>
                <p><strong>Breed:</strong> {cattle.breed}</p>
                <p><strong>Age:</strong> {cattle.age}</p>
                <p><strong>Health:</strong> {cattle.health}</p>
                <p><strong>Status:</strong> {cattle.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MilkCollectionReport;
