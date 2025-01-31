import { useEffect, useState } from "react";
import './History.css';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState({ calculatorHistory: [], cgpaHistory: [] });

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setHistory({ calculatorHistory: [], cgpaHistory: [] });

      try {
        const res = await axios.get("https://calculator-back-2.onrender.com/history", {
          headers: { token }
        });

        console.log("API Response:", res.data); // Debugging API response
        setHistory(res.data); // Correctly set the API response to state
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="page-container">
      
      <ul>
        {history.calculatorHistory.length > 0 ? (
          history.calculatorHistory.map((entry, index) => (
            <li key={index}>{index+1} : {entry.result}</li>
          ))
        ) : (
          <li>No calculation history</li>
        )}
      </ul>

      
      <ul>
        {history.cgpaHistory.length > 0 ? (
          history.cgpaHistory.map((entry, index) => (
            <li key={index}>CGPA: {entry.cgpa}</li>
          ))
        ) : (
          <li>No CGPA history</li>
        )}
      </ul>
    </div>
  );
}

export default History;
