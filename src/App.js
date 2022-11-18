import './App.css';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);

  const getFromApi = async () => {
    try {
      const apiCall = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries`
      );
      setCountries(apiCall.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFromApi();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="appBody">
        <CountriesList countries={countries} />
        <Routes>
          <Route path="/:countryId" element={<CountryDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
