import React, { useEffect, useState } from 'react';

const ApiTest: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/fetchData')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Sanity Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApiTest;