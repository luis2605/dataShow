import React, { useState , useEffect } from 'react';
import csvtojson from 'csvtojson';

import classes from './CSVToJson.module.css'

import HelpModal from '../HelpModal/HelpModal.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomSelectedData from '../CustomSelectedData/CustomSelectedData';


const CSVToJSON = () => {
  const [jsonData, setJsonData] = useState(null);
 /* csv file metadata */
  const [fileMetadata, setFileMetadata] = useState(null);

 const[mappedElement,setMappedElements] = useState(null);
 const [multipleFilterData, setMultipleFilterData] = useState(null);

 const [selectedCustomData, setSelectedCustomData] = useState([]);
 
const [selection, setSelection] = useState(null);

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
 /*filter by roomtype */

 const [selectedRoomtype, setSelectedRoomtype] = useState('');

/*filter by hasPrivateBathroom */

const [hasPrivateBathroom, setHasPrivateBathroom] = useState('')

/*filter by by City */

const [selectedCity, setSelectedCity] = useState('')
/*filter by activities */

const [offerActivities, setOfferActivities] = useState('')


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

  // Get file metadata
  const fileMetadata = {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
  };

  // Store the file metadata in a state variable
  setFileMetadata(fileMetadata);
};

  /*Reset all filters*/ 
  const resetFilters = () => {
    setSelectedCountry('');
    setSelectedRoomtype('')
    setSelectedCity('');
    setHasPrivateBathroom('');
    setOfferActivities('')
  };

 
console.log(fileMetadata)

    useEffect(() => {
      if (jsonData) {
        let filteredData = jsonData;

       
    
        if (selectedCountry || selectedRoomtype ||hasPrivateBathroom || selectedCity||offerActivities) {
          filteredData = jsonData.filter((item) => {
            const publicData = item.publicData1;
    
          const countryMatch = !selectedCountry || publicData.country === selectedCountry;
          const roomtypeMatch = !selectedRoomtype || publicData.roomtype === selectedRoomtype;
          const bathroomMatch=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('privat_bathroom')? "true":"false"  == hasPrivateBathroom 
          const bathroomMatchNot=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('shared_bathroom')? "false":"true"  == hasPrivateBathroom 
         
          const cityMatch = !selectedCity || publicData.city === selectedCity;
          const activitiesMatch = !offerActivities || (publicData.activities ? "yes" : "no") === offerActivities; 
            return countryMatch && roomtypeMatch && cityMatch  && bathroomMatch && bathroomMatchNot && activitiesMatch;
          });
        }

 
          // if (selectedCountry) {
          //   filteredData = jsonData.filter(
          //     (item) => item.publicData1.country === selectedCountry
            
          //     );
          
          // }
          // if (selectedRoomtype) {
          //   filteredData = multipleFilterData.filter(
          //     (item) => (item.publicData1 && item.publicData1.roomtype && item.publicData1.roomtype  === selectedRoomtype)
            
          //     );
          
          // }
         
          // if (hasPrivateBathroom) {
          //   filteredData = multipleFilterData.filter(
          //     (item) => (item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('privat_bathroom')? "true":"false" ||  item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('shared_bathroom')? "false":"true") === hasPrivateBathroom
          //   );
         
          // }

          // if (selectedCity) {
          //   filteredData = multipleFilterData.filter(
          //     (item) => item.publicData1.city === selectedCity
          //   );
          
          // }

         
          

          const mapped = filteredData.map((item, index) => {
            let stateClasses = "";
            if (item.State === "draft") {
              stateClasses = classes.draft;
            } else if (item.State === "closed") {
              stateClasses = classes.closed;
            } else if (item.State === "published") {
              stateClasses = classes.published;
            }
 /*remove roomtype from title */
            const title = item.Title;
const updatedTitle = title.split("•")[0].trim();
   /*map the listings  */        
            return (
              <tr  key={index} className={classes.card}>
                <td>{index}</td>
                <td>{item.Id}</td>
                <td className={stateClasses}>{item.State}</td>
                <td>{updatedTitle}</td>
                <td>{item.publicData1.roomtype}</td>
                <td>{item.PriceAmount / 100}</td>
                <td>{item.publicData1.customCurrency}</td>
                {item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('privat_bathroom') ? (
                  <td className={classes.true}>true </td>
                ) : (
                  <td className={classes.false}>false </td>
                )}
                <td>{item.publicData1.country}</td>
                <td>{item.publicData1.city}</td>
                <td>{item.publicData1.activities ? "yes":"no"}</td>
                {multipleFilterData && <td  onClick={(e) => addCustomElement(e, index)}>+</td>}
               
              </tr>
            );
          });
          setMultipleFilterData(filteredData);
          setMappedElements(mapped);

 console.log(filteredData)
   /* add custom elements from filteredData to selectedCustomData */
const addCustomElement = (e, index) => {
  const selectedElement = filteredData[index];
  setSelectedCustomData(prevData => [...prevData, selectedElement]);
 
  };
 /* remove custom elements from filteredData to selectedCustomData */
  const removeCustomElement = (e) => {
    const elementIndex = e.target.dataset.index; // Get the index of the element from the data-index attribute
    const updatedSelectedCustomData = selectedCustomData.filter((_, index) => index !== parseInt(elementIndex)); // Remove the element at the specified index
    
    setSelectedCustomData(updatedSelectedCustomData); // Update the selectedCustomData state
  };



const selection = selectedCustomData.map((item, index)=>{
  
  return(
    <div className={classes["selected-item"]}> 
 <p>{item.Title} </p>
 <p data-index={index} onClick={removeCustomElement}>-</p> {/* Pass the index of the element */}
    </div>
   
  )
  })

  setSelection(selection)
       
        }
      }, [jsonData, selectedCountry,selectedRoomtype,hasPrivateBathroom,selectedCity,selectedCustomData,offerActivities]);

   
      console.log(multipleFilterData);
    



console.log(selectedCustomData)



  return (
    <div>
       <HelpModal isOpen={isOpen} onClose={closeModal}>
        <h2 >Help Modal</h2>
        <p>This is the content of the help modal.</p>
      </HelpModal>
    <input type="file" accept=".csv" onChange={handleFileUpload} />
    {jsonData && <p>File created on: {fileMetadata.lastModifiedDate.toLocaleString()}</p>}
    {multipleFilterData && (
      <div className={classes["table-container"]}>

        {selection}
  
        <div className={classes["nav-container"]}>
        <div className={classes["filter-container"]}> 
         {/* filtering by country*/}
        <div  className={classes["filter-element"]} >
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

                 {/* filtering by roomtype*/}
        <div  className={classes["filter-element"]}>
            <label htmlFor="roomtype">Filter by Room Type:</label>
            <select
              id="roomtype"
              value={selectedRoomtype}
              onChange={(e) => setSelectedRoomtype(e.target.value)}
            >
              <option value="">All</option>
              {/* the roomtype values are available in the multipleFilterData but not on a stylish way */}
              <option key={1} value={"entire_accomodation"}>
                 Entire accomodation
                </option>
              <option key={2} value={'singlebedroom'}>
                 Single Bedroom
              </option>
              <option key={3} value={"doublebedroom"}>
                 Double Bedroom
              </option>
              <option key={4} value={"shared_bedroom"}>
                 Dormitory
              </option>
              <option key={5} value={"multi_bedroom"}>
                 Multi Bedroom
              </option>
              <option key={6} value={"twobedroom"}>
                 Two Bedroom
              </option>
              <option key={7} value={"camping"}>
                 Camping
              </option>
           
            </select>
          </div>

            {/* filtering by hasPrivateBathroom*/}
        <div  className={classes["filter-element"]}>
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
                <option key={3} value={"both"}>
                 private & shared bathroom
                </option>
            </select>
          </div>
              {/* filtering by city*/}
        <div  className={classes["filter-element"]}>
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
          <div  className={classes["filter-element"]}>
            <label htmlFor="activitiesFilter">Offer activities:</label>
            <select
              id="activitiesFilter"
              value={offerActivities}
              onChange={(e) => setOfferActivities(e.target.value)}
            >
              <option value="">All</option>
              {/* the values are not available on json data*/}
          
                <option key={1} value={"yes"}>
                 yes
                </option>
                <option key={2} value={"no"}>
                 no 
                </option>
              
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
              <th>Room Type</th>
              <th>Price/Night</th>
              <th>Currency</th>
              <th>Private Bathroom</th>
              <th>Country</th>
              <th>City</th>
              <th>Activities</th>
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
