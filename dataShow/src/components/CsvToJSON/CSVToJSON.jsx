import React, { useState , useEffect } from 'react';
import csvtojson from 'csvtojson';

import classes from './CSVToJson.module.css'

const CSVToJSON = () => {
  const [jsonData, setJsonData] = useState(null);
 const[mappedElement,setMappedElements] = useState(null);

 /*filter by country */

 const [selectedCountry, setSelectedCountry] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      const csvData = event.target.result;
      const jsonArray = await csvtojson().fromString(csvData);

      const modifiedData = jsonArray.map((item) => {
        const publicData1 = JSON.parse(item.PublicData);
        return { ...item, publicData1 };
      });

      setJsonData(modifiedData);
    };

    fileReader.readAsText(file);

   
  };

console.log(mappedElement);




    useEffect(() => {
        if (jsonData) {
          let filteredData = jsonData;
          if (selectedCountry) {
            filteredData = jsonData.filter(
              (item) => item.publicData1.country === selectedCountry
            );
          }
    
        
          const mapped = filteredData.map((item, index) => {
            let stateClasses = "";
            if (item.State === "draft") {
              stateClasses = classes.draft;
            } else if (item.State === "closed") {
              stateClasses = classes.closed;
            } else if (item.State === "published") {
              stateClasses = classes.published;
            }
          
            return (
              <tr key={index} className={classes.card}>
                <td>{index}</td>
                <td>{item.Id}</td>
                <td className={stateClasses}>{item.State}</td>
                <td>{item.Title}</td>
                <td>{item.PriceAmount / 100}</td>
                <td>{item.publicData1.customCurrency}</td>
                {item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('privat_bathroom') ? (
                  <td className={classes.true}>true</td>
                ) : (
                  <td className={classes.false}>false</td>
                )}
                <td>{item.publicData1.country}</td>
                <td>{item.publicData1.city}</td>
              </tr>
            );
          });
    
          setMappedElements(mapped);
        }
      }, [jsonData, selectedCountry]);
    




    




  return (
    <div>
    <input type="file" accept=".csv" onChange={handleFileUpload} />
    {jsonData && (
      <div>
        <h3>Converted JSON Data:</h3>
         {/* filtering by country*/}
        <div>
            <label htmlFor="countryFilter">Filter by Country:</label>
            <select
              id="countryFilter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All</option>
              {/* Assuming the country values are available in the jsonData */}
              {[...new Set(jsonData.map((item) => item.publicData1.country))].map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
         <table>
         <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>State</th>
              <th>Title</th>
              <th>Price/Night</th>
              <th>Currency</th>
              <th>Private Bathroom</th>
              <th>Country</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>{mappedElement}</tbody>
         </table>
        
      </div>
    )}
  </div>

  );
};

export default CSVToJSON;
