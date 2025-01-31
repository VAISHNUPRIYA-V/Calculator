import './Cal.css';
import { useState } from 'react';

function Cal() {
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  };

  const clear = () => {
    setResult("");
  };

  const handleDelete = () => {
    setResult(result.slice(0, -1));
  };

  const calculate = async () => {
    try {
      const finalResult = eval(result).toString();
      setResult(finalResult);

      // Save the calculation to history
      const token = localStorage.getItem('token'); // Assuming you store JWT token
      if (token) {
        await fetch('https://calculator-back-2.onrender.com/calculate', { // Change URL based on backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            result: finalResult,
            type: 'calculator',
          }),
        });
      }
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="App">
      <h1>Modern Calculator</h1>

      <div className='container'>
        <form>
          <input type="text" value={result} readOnly />
        </form>

        <div className='keypad'>
          <button onClick={clear} id='clear' className='highlight'>AC</button>
          <button onClick={handleDelete} className='highlight'>DEL</button>
          <button name='/' onClick={handleClick} className='highlight'>&divide;</button>
          <button name="7" onClick={handleClick}>7</button>
          <button name="8" onClick={handleClick}>8</button>
          <button name="9" onClick={handleClick}>9</button>
          <button name="*" onClick={handleClick} className='highlight'>&times;</button>
          <button name="4" onClick={handleClick}>4</button>
          <button name="5" onClick={handleClick}>5</button>
          <button name="6" onClick={handleClick}>6</button>
          <button name="-" onClick={handleClick} className='highlight'>-</button>
          <button name="1" onClick={handleClick}>1</button>
          <button name="2" onClick={handleClick}>2</button>
          <button name="3" onClick={handleClick}>3</button>
          <button name="+" onClick={handleClick} className='highlight'>+</button>
          <button name="0" onClick={handleClick}>0</button>
          <button name="." onClick={handleClick}>.</button>
          <button onClick={calculate} id='equal' className='highlight'>=</button>
        </div>

      </div>

    </div>
  );
}

export default Cal;
