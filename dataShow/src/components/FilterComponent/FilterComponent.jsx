
import React, { useState , useEffect } from 'react';




import HelpModal from '../HelpModal/HelpModal.jsx';

import CustomSelectedData from '../CustomSelectedData/CustomSelectedData';


/* font-awesome icons  */
import '@fortawesome/fontawesome-free/css/all.min.css';

/* css modules  */
import classes from './filterComponent.module.css'
/* bootstrap components  */
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';

/* export final table to json  */
import { saveAs } from 'file-saver';  

const FilterComponent = ({jsonData , fileMetadata}) => {

   /*mapped elements for rendering table */
    const[mappedElement,setMappedElements] = useState(null);
 /*json data after filters applied*/
    const [multipleFilterData, setMultipleFilterData] = useState(null);
 /*json data after filters applied and specific data selected*/  
    const [selectedCustomData, setSelectedCustomData] = useState([]);
/* display selected json data from selectedCustomData */  
   const [selection, setSelection] = useState(null);

 /* created table on json format */
 
 const [tableJson, setTableJson]=useState([])

   /*boolean for displaying help modal*/ 
    const [isOpen, setIsOpen] = useState(false);
  
    /*filter offset canvas */
    const [show, setShow] = useState(false);
   
    /* help modal open/close */
    const openModal = () => {
      setIsOpen(true);
    };
   
    const closeModal = () => {
      setIsOpen(false);
    };

    /*filters */
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
   
   /*open close filter offset canvas */
   
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);


  /*Reset all filters*/ 
  const resetFilters = () => {
    setSelectedCountry('');
    setSelectedRoomtype('')
    setSelectedCity('');
    setHasPrivateBathroom('');
    setOfferActivities('')
  };

 


    useEffect(() => {
      if (jsonData) {
        let filteredData = jsonData;

       
    
        if (selectedCountry || selectedRoomtype ||hasPrivateBathroom || selectedCity||offerActivities) {
          filteredData = jsonData.filter((item) => {
            const publicData = item.publicData1;
    
          const countryMatch = !selectedCountry || publicData.country === selectedCountry;
          const roomtypeMatch = !selectedRoomtype || publicData.roomtype === selectedRoomtype;
          const bathroomMatch=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('privat_bathroom')? "true":"false"  == hasPrivateBathroom 
          const bathroomMatchNot=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('shared_bathroom')? "false":"true" == hasPrivateBathroom 
         
          const cityMatch = !selectedCity || publicData.city === selectedCity;
          const activitiesMatch = !offerActivities || (publicData.activities ? "yes" : "no") === offerActivities; 
            return countryMatch && roomtypeMatch && cityMatch  && bathroomMatch && bathroomMatchNot && activitiesMatch;
          });
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

            let meals="";

            /*
            diplay the meals 
             */
            if( item.publicData1 && item.publicData1.food && item.publicData1.food.includes("breakfast_inclusive") && item.publicData1 && item.publicData1.food && !item.publicData1.food.includes("lunch_inclusive") && item.publicData1 && item.publicData1.food && !item.publicData1.food.includes("dinner_inclusive") ){

              meals = "Only Breakfast"
              } 


            if(item.publicData1 && item.publicData1.amenities && !item.publicData1.amenities.includes("private_kitchen") || item.publicData1 && item.publicData1.amenities && !item.publicData1.amenities.includes("shared_kitchen" ) || item.publicData1 && item.publicData1.food && !item.publicData1.food.includes("lunch_for_sale") ||item.publicData1 && item.publicData1.food && !item.publicData1.food.includes("dinner_for_sale") || item.publicData1 && item.publicData1.food && !item.publicData1.food.includes("breakfast_for_sale")){

              meals = "N/A"
            }

            if(item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes("private_kitchen") || item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes("shared_kitchen" )){

              meals = "Self catering"
            }
            if( item.publicData1 && item.publicData1.food && item.publicData1.food.includes("lunch_for_sale") ||item.publicData1 && item.publicData1.food && item.publicData1.food.includes("dinner_for_sale") || item.publicData1 && item.publicData1.food && item.publicData1.food.includes("breakfast_for_sale") ){

              meals = "On request"
              } 


            if( item.publicData1 && item.publicData1.food && item.publicData1.food.includes("breakfast_inclusive") && item.publicData1 && item.publicData1.food && item.publicData1.food.includes("lunch_inclusive") || item.publicData1 && item.publicData1.food && item.publicData1.food.includes("breakfast_inclusive") && item.publicData1 && item.publicData1.food && item.publicData1.food.includes("dinner_inclusive")  ){

            meals = "Half board"
            } 
             if(item.publicData1 && item.publicData1.food && item.publicData1.food.includes("breakfast_inclusive") && item.publicData1 && item.publicData1.food && item.publicData1.food.includes("lunch_inclusive")  && item.publicData1 && item.publicData1.food &&  item.publicData1.food.includes("dinner_inclusive")){

              meals = "Full board"
            }
           
             /* forming the url */
                const name = item.Title
                const id = item.Id

                const url = `https://www.socialbnb.org/l/${name.replace(/\s+/g, '-')}/${id}`;
          
            /*remove roomtype from title */
                const title = item.Title;
                const updatedTitle = title.split("•")[0].trim();
   /*map the listings  */        
            return (
              <tr  key={index} className={classes.card}>
                <td>{index}</td>
                <td className={classes["small"]}>{item.Id}</td>
                <td className={stateClasses}>{item.State}</td>
                <td>{updatedTitle}</td>
                <td>{item.publicData1.roomtype}</td>
                <td>{item.publicData1.roomamount}</td>
                <td>{item.publicData1.bedamount}</td>
                <td>{item.publicData1.bedamount && item.publicData1.roomamount ? item.publicData1.bedamount * item.publicData1.roomamount : ""}</td>
                <td>{item.PriceAmount / 100}</td>
                <td>{item.publicData1.customCurrency}</td>
                <td>{ meals}</td>
                {item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('privat_bathroom') ? (
                  <td className={classes.true}>true </td>
                ) : (
                  <td className={classes.false}>false </td>
                )}
                <td>{item.publicData1.country}</td>
                <td>{item.publicData1.city}</td>
                <td>{item.publicData1.activities ? "yes":"no"}</td>
                <td><a href={url} target='_blank'> link</a> </td>
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

    

      /*exporting the final table to json file  */

      // const exportTableToJSON = () => {
      //   const table = document.getElementById('yourTableId');
      //   const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
    
      //   const rows = Array.from(table.querySelectorAll('tbody tr'));
      //   const data = rows.map(row => {
      //     const cells = Array.from(row.querySelectorAll('td'));
      //     return headers.reduce((rowData, header, index) => {
      //       rowData[header] = cells[index].textContent.trim();
      //       return rowData;
      //     }, {});
      //   });
      
      //   const jsonData = JSON.stringify(data, null, 2);
      //  setTableJson(jsonData)
      //   console.log(tableJson)
      // };
      
      
   
    console.log(selectedCustomData)

  return (
    <>
     {jsonData && <div>
       <HelpModal isOpen={isOpen} onClose={closeModal}>
        <h2 >Help Modal</h2>
        <p>This is the content of the help modal.</p>
      </HelpModal>
     
    
    {selection}
   {jsonData && <div>
    <Button variant="primary" onClick={handleShow}>
        Filters
      </Button>
    <Button   onClick={openModal}>  <i className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i></Button>
     <p>File created on: {fileMetadata.lastModifiedDate.toLocaleString()}</p>
     <CustomSelectedData onMultipleFilterData={multipleFilterData} onCustomSelectedData={selectedCustomData} />
    
   </div> }
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {multipleFilterData && <div className={classes["nav-container"]}>
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
       
     
          </div>

        </div>}
        </Offcanvas.Body>
      </Offcanvas>


    {multipleFilterData && (
     
         <Table striped bordered hover id="yourTableId" >
         <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>State</th>
              <th>Title</th>
              <th>Room Type</th>
              <th>Room Amount</th>
              <th>Room Occupancy</th>
              <th>Max Amount P.</th>
              <th>Price/Night</th>
              <th>Currency</th>
              <th>Meals</th>
              <th>Private Bathroom</th>
              <th>Country</th>
              <th>City</th>
              <th>Activities</th>
              <th>Url</th>
            
             
            </tr>
          </thead>
          <tbody>{mappedElement}</tbody>
         </Table>
        
     
    )}
  </div>}
    </>
   

  );




  
}

export default FilterComponent