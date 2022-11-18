import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CountryDetails() {
  const { countryId } = useParams();
  const [oneCountry, setOneCountry] = useState(null);

  const getFromApi = async () => {
    try {
      const apiCall = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${countryId}`
      );
      setOneCountry(apiCall.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFromApi();
  }, [countryId]);

  return (
    <div>
      {oneCountry && (
        <div className="col-7">
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${oneCountry.alpha2Code.toLowerCase()}.png`}
            alt="flag"
          />
          <h1>{oneCountry.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td>Capital</td>
                <td>{oneCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {oneCountry.area}
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul>
                    {oneCountry.borders.map((eachCountry) => {
                      return <li>{eachCountry}</li>;
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
