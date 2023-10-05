import React, { useState, useEffect } from 'react';

const Dashboard = ({ loggedInUser }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await fetch('http://afc7a104784594208b12c3474fa3c924-1060237241.us-east-2.elb.amazonaws.com:9002/login', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    const filtered = data.filter((item) => {
      const filterMatch = item.someField.includes(filterValue);
      const searchMatch = item.someField.includes(searchValue);
      return filterMatch && searchMatch;
    });

    setFilteredData(filtered);
  }, [data, filterValue, searchValue]);

  return (
    <div>
      <nav>
        <div className="profile-icon">Profile Icon</div>
      </nav>
      <h2>Welcome, {loggedInUser}</h2>
      <div>
        <select onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">All</option>
          <option value="filter1">Filter 1</option>
          <option value="filter2">Filter 2</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.field1}</td>
              <td>{item.field2}</td>
              {/* Add more table data fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;