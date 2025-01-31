import React, { useState } from 'react';
import './Cgpa.css';

function Cgpa() {
  const [gpArray, setGpArray] = useState([]);
  const [courseCode, setCourseCode] = useState('');
  const [unitLoad, setUnitLoad] = useState('');
  const [grade, setGrade] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [showCalcBtn, setShowCalcBtn] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [gpaResult, setGpaResult] = useState(null); 

  const handleAdd = () => {
    if (courseCode === '' || unitLoad <= 0 || grade === '') {
      alert('Wrong input, check and try again');
    } else {
      const newGpArray = [
        ...gpArray,
        { courseCode, unitLoad, grade },
      ];
      setGpArray(newGpArray);
      setShowTable(true);
      setShowCalcBtn(true);
      setShowClearBtn(true);

      setCourseCode('');
      setUnitLoad('');
      setGrade('');
    }
  };

  const handleClear = () => {
    setGpArray([]);
    setShowTable(false);
    setShowCalcBtn(false);
    setShowClearBtn(false);
    setGpaResult(null); 
  };

  const handleCalcGp = async () => {
    let unitLoads = 0;
    let sumOfProductOfUnitLoadsAndGrades = 0;

    gpArray.forEach((result) => {
      unitLoads += parseInt(result.unitLoad);
      sumOfProductOfUnitLoadsAndGrades += parseInt(result.unitLoad) * parseInt(result.grade);
    });

    const gpa = (sumOfProductOfUnitLoadsAndGrades / unitLoads).toFixed(2);
    setGpaResult({ unitLoads, gpa });

    
    const token = localStorage.getItem('token');
    {console.log(gpArray)}
    if (token) {
      await fetch('http://localhost:5000/cgpa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        
        body: JSON.stringify({
          grades: gpArray.map(item => item.grade),
          cgpa: gpa,
        }),
      });
    }
  };

  return (
    <div >
        <h1>GP CALCULATOR</h1>
        <div className="wrapper">
      <div className="form-row">
        <div className="col">
          <input
            id="course-code"
            className="form-control"
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Course Code"
          />
        </div>
        <div className="col">
          <input
            id="unit-load"
            className="form-control"
            type="number"
            value={unitLoad}
            onChange={(e) => setUnitLoad(e.target.value)}
            placeholder="Unit Load"
            min="1"
            max="15"
          />
        </div>
        <div className="col">
          <select
            id="grade"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Grade</option>
            <option value="5">A</option>
            <option value="4">B</option>
            <option value="3">C</option>
            <option value="2">D</option>
            <option value="1">E</option>
            <option value="0">F</option>
          </select>
        </div>
        <div className="col">
          <input
            id="add"
            className="btn btn-primary"
            type="button"
            value="Add"
            onClick={handleAdd}
          />
        </div>
      </div>
      {showTable && (
        <table id="table" className="table table-bordered">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Unit Load</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {console.log(gpArray)}
            {gpArray.map((item, index) => (
  <tr key={index}>
    <td>{item.courseCode}</td>  
    <td>{item.unitLoad}</td>    
    <td>{item.grade}</td>       
  </tr>
))}
          </tbody>
        </table>
      )}
      {gpaResult && (
        <div className="result">
          <p>Your total unit load is {gpaResult.unitLoads}</p>
          <p>Your GPA is {gpaResult.gpa}</p>
        </div>
      )}
      <div className="row">
        {showCalcBtn && (
          <div className="col">
            <input
              id="calc-gp"
              className="btn btn-success"
              type="button"
              value="Calc GP"
              onClick={handleCalcGp}
            />
          </div>
        )}
        {showClearBtn && (
          <div className="col">
            <input
              id="clear"
              className="btn btn-warning"
              type="button"
              value="Clear"
              onClick={handleClear}
            />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default Cgpa;
