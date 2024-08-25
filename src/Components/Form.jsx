
import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format: data key should be an array');
      }
      setError('');

      const res = await axios.post('13.233.244.173:3000/bfhl', parsedData);

      setResponse(res.data);
    } catch (err) {
      setError(err.message || 'Invalid JSON');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const displayData = [];

    if (selectedOptions.includes('Numbers')) {
      displayData.push(<div key="numbers">Numbers: {numbers.join(', ')}</div>);
    }

    if (selectedOptions.includes('Alphabets')) {
      displayData.push(<div key="alphabets">Alphabets: {alphabets.join(', ')}</div>);
    }

    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      displayData.push(
        <div key="highest-lowercase">
          Highest Lowercase Alphabet: {highest_lowercase_alphabet.join(', ')}
        </div>
      );
    }

    return displayData;
  };

  return (
    <div className="App">
      <h1>21BCE5638</h1> 
      <div>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON here...'
          rows="5"
          cols="50"
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest Lowercase Alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>
          <div>{renderResponse()}</div>
        </>
      )}
    </div>
  );
}

export default Form;
