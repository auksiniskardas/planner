import React, { useState } from 'react';
import './index.css';
import { calculateHours } from './utils';

const App = () => {
  const [workload, setWorkload] = useState('');
  const [deadline, setDeadline] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [result, setResult] = useState([]);

  const handleCalculate = () => {
    const calculatedHours = calculateHours(workload, deadline, hoursPerDay);
    setResult(calculatedHours);
  };

  return (
    <div className="container">
      <h1>Laiko Planuotojas</h1>
      <div className="input-group">
        <label>Darbo apimtis (valandomis):</label>
        <input
          type="text"
          value={workload}
          onChange={(e) => setWorkload(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Terminas (yyyy-mm-dd):</label>
        <input
          type="text"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Užimtos valandos per dieną:</label>
        <input
          type="text"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Skaičiuoti</button>
      <h2>Rezultatas:</h2>
      {result.length > 0 ? (
        result.map((entry, index) => (
          <p key={index}>
            Data: {entry.date}, Valandos: {entry.hours}
          </p>
        ))
      ) : (
        <p>skirkite daugiau valandų per dieną!</p>
      )}
    </div>
  );
};

export default App;
