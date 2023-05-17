import React, { useState , useEffect } from 'react';
import csvtojson from 'csvtojson';

import classes from './CSVToJson.module.css'

import HelpModal from '../HelpModal/HelpModal.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';


const CSVToJSON = () => {
  const [jsonData, setJsonData] = useState(null);
 const[mappedElement,setMappedElements] = useState(null);
 const [multipleFilterData, setMultipleFilterData] = useState(null);

 const [selectedCustomData, setSelectedCustomData] = useState([]);
 
 const [isOpen, setIsOpen] = useState(false);


 /* help modal */
 const openModal = () => {
   setIsOpen(true);
 };

 const closeModal = () => {
   setIsOpen(false);
 };
 /*filter by country */

 const [selectedCountry, setSelectedCountry] = useState('');
/*filter by hasPrivateBathroom */

const [hasPrivateBathroom, setHasPrivateBathroom] = useState('')

/*filter by by City */

const [selectedCity, setSelectedCity] = useState('')



/* uploading the raw csv file */
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

  /*Reset all filters*/ 
  const resetFilters = () => {
    setSelectedCountry('');
    setSelectedCity('');
    setHasPrivateBathroom('');
  };

 


    useEffect(() => {
        if (jsonData) {

          {/* filtering logic*/}
          let filteredData = jsonData;

          if (selectedCountry) {
            filteredData = jsonData.filter(
              (item) => item.publicData1.country === selectedCountry
            
              );
          
          }
         
          if (hasPrivateBathroom) {
            filteredData = multipleFilterData.filter(
              (item) => (item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('privat_bathroom')? "true":"false" ||  item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('shared_bathroom')? "false":"true") === hasPrivateBathroom
            );
         
          }

          if (selectedCity) {
            filteredData = multipleFilterData.filter(
              (item) => item.publicData1.city === selectedCity
            );
          
          }

         
          setMultipleFilterData(filteredData);

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
              <tr  key={index} className={classes.card}>
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
                {multipleFilterData && <td onClick={(e) => addCustomElement(e, index)}> + </td>}
                {multipleFilterData && <td onClick={(e) => removeCustomElement(e, index)}> - </td>}
              </tr>
            );
          });
    
          setMappedElements(mapped);
          console.log(multipleFilterData);
          console.log(selectedCustomData);
        }
      }, [jsonData, selectedCountry,hasPrivateBathroom,selectedCity,selectedCustomData]);

   
      
    
 /* add custom elements from filteredData to selectedCustomData */
 const addCustomElement = (e, index) => {
  const selectedElement = multipleFilterData[index];
  const elementName = selectedElement.Title; // Assuming 'Title' is the property to be used as the element name

  setSelectedCustomData((prevElements) => {
    // Check if the element with the same name already exists
    if (prevElements.some((element) => element.Title === elementName)) {
      return prevElements; // If the element already exists, return the previous elements as is
    } else {
      // If the element doesn't exist, add the selected element to the custom elements array
      return [...prevElements, selectedElement];
    }
  });
};
 /* remove custom elements from filteredData to selectedCustomData */
const removeCustomElement = (e, index) => {
  const removedElement = selectedCustomData[index];
  const elementName = removedElement.Title; // Assuming 'Title' is the property used as the element name

  setSelectedCustomData((prevElements) => {
    // Filter out the element with the same name from the custom elements array
    return prevElements.filter((element) => element.Title !== elementName);
  });
};
// console.log(jsonData)
// console.log(hasPrivateBathroom)

    




  return (
    <div>
       <HelpModal isOpen={isOpen} onClose={closeModal}>
        <h2 >Help Modal</h2>
        <p>This is the content of the help modal.</p>
      </HelpModal>
    <input type="file" accept=".csv" onChange={handleFileUpload} />
    {multipleFilterData && (
      <div>

        <p> {selectedCustomData.map((item)=> item.Title)}</p>
        <h3>Converted JSON Data:</h3>
        <div className={classes["nav-container"]}>
        <div className={classes["filter-container"]}> 
         {/* filtering by country*/}
        <div>
            <label htmlFor="countryFilter">Filter by Country:</label>
            <select
              id="countryFilter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All</option>
              {/* Assuming the country values are available in the multipleFilterData */}
              {[...new Set(multipleFilterData.map((item) => item.publicData1.country))].map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

            {/* filtering by hasPrivateBathroom*/}
        <div>
            <label htmlFor="bathroomFilter">Has Private Bathroom:</label>
            <select
              id="bathroomFilter"
              value={hasPrivateBathroom}
              onChange={(e) => setHasPrivateBathroom(e.target.value)}
            >
              <option value="">All</option>
              {/* the values are not available on json data*/}
          
                <option key={1} value={"true"}>
                 true
                </option>
                <option key={2} value={"false"}>
                 false
                </option>
            </select>
          </div>
              {/* filtering by city*/}
        <div>
            <label htmlFor="cityFilter">Filter by City:</label>
            <select
              id="cityFilter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All</option>
              {/* Assuming the city values are available in the multipleFilterData */}
              {[...new Set(multipleFilterData.map((item) => item.publicData1.city))].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div className={classes["btn-container"]}>
          <button className={classes["reset-btn"]} onClick={resetFilters}><i className="fa fa-refresh" style={{fontSize:"16px"}}></i></button>
          <button  className={classes["help-btn"]} onClick={openModal}>  <i className="fas fa-question-circle" style={{ fontSize: '24px', color: 'red' }}></i></button>
     
          </div>

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
              <th></th>
              <th></th>
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
