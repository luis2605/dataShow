
import React, { useState , useEffect } from 'react';




import Modal from '../Modal/Modal.jsx';

import CustomSelectedData from '../CustomSelectedData/CustomSelectedData';


/* font-awesome icons  */
import '@fortawesome/fontawesome-free/css/all.min.css';

/* css modules  */
import classes from './filterComponent.module.css'
/* bootstrap components  */
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

/* export final table to json  */
import { saveAs } from 'file-saver';  

/*impor for checkin countries to continents for filtering */
import { getContinentCode, getContinentName } from '@brixtol/country-continent';

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
    const [isOpenHelp, setIsOpenHelp] = useState(false);

    
   /*boolean for displaying selection modal*/ 
   const [isOpenSelection, setIsOPenSelection] = useState(false);
  
    /* selection modal open/close */
    const openModalSelection = () => {
      setIsOPenSelection(true);
    };
   
    const closeModalSelection = () => {
      setIsOPenSelection(false);
    };

    /*filter offset canvas */
    const [show, setShow] = useState(false);
   
    /* help modal open/close */
    const openModalHelp = () => {
      setIsOpenHelp(true);
    };
   
    const closeModalHelp = () => {
      setIsOpenHelp(false);
    };

    /*filters */

    /*filter by State */

    const[ actualState, setActualState ] = useState('')
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

    /*filter by impact */
   
      const [impact, setImpact] = useState('')
    /*filter by continent */
      const [selectedContinent, setSelectedContinent] = useState('');
   
   /*open close filter offset canvas */
   
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  /*expand close activities description */

  const [actExpanded, setActExpanded] = useState(false)

  /* expand close activities description  */

  const expandActivitiesHandler = () => {
    
    setActExpanded(true)
    };
  ;

  const closeActivitiesHandler = () => {
    setActExpanded(false)
  };




  /*Reset all filters*/ 
  const resetFilters = () => {
    setActualState('')
    setSelectedCountry('');
    setSelectedRoomtype('')
    setSelectedCity('');
    setHasPrivateBathroom('');
    setOfferActivities('')
    setImpact('')
    setSelectedContinent('')
  };

/*btn + and - effect & styles */
  const buttonStyle = {
    padding: '10px ',
    backgroundColor: '#0B5ED7',
   borderRadius:'50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    fontSize: '16px',
     color: 'white'
  };

  const handleMouseDown = (e) => {
    e.target.style.transform = 'translateY(2px)';
  };

  const handleMouseUp = (e) => {
    e.target.style.transform = 'none';
  };

  /* clear selection */
  const clearSelection = () => {
  setSelection('')
  setSelectedCustomData([])
  setIsOPenSelection(false);
  }

    useEffect(() => {
      if (jsonData) {
        let filteredData = jsonData;

       
    
        if ( actualState||selectedCountry || selectedRoomtype ||hasPrivateBathroom || selectedCity||offerActivities || impact) {
          filteredData = jsonData.filter((item) => {
            const publicData = item.publicData1;
          const stateMatch= !actualState || item.State === actualState;
          const countryMatch = !selectedCountry || publicData.country === selectedCountry;
          const roomtypeMatch = !selectedRoomtype || publicData.roomtype === selectedRoomtype;
          const bathroomMatch=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('privat_bathroom')? "yes":"no"  == hasPrivateBathroom 
          const bathroomMatchNot=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('shared_bathroom')? "no":"yes" == hasPrivateBathroom 
         
          const cityMatch = !selectedCity || publicData.city === selectedCity;
          const activitiesMatch = !offerActivities || (publicData.activities ? "yes" : "no") === offerActivities; 
          const impactMatch =
          !impact ||
          (publicData.amenities && publicData.category.includes(impact)) ||
          (publicData.categories && publicData.category.includes(impact));
 
    // Check if publicData and publicData.country are defined before getting the continent
    const continent = publicData && publicData.country && getContinentName(publicData.country);
// la pinga esta no funciona tratar manana de nuevo
    // Perform continent match only if the continent is defined and selectedContinent is not empty para 
    const continentMatch = !selectedContinent || (continent && continent === selectedContinent);
          
            return  stateMatch && countryMatch && roomtypeMatch && cityMatch  && bathroomMatch && bathroomMatchNot && activitiesMatch && impactMatch && continentMatch;
          });
        }
       
          const mapped = filteredData.map((item, index) => {
           
            /*set continent name */
            const publicData = item.publicData1;
            const continent = publicData && publicData.country && getContinentName(publicData.country);

           /*set className for styles on state */
            let stateClasses = "";
            if (item.State === "draft") {
              stateClasses = classes.draft;
            } else if (item.State === "closed") {
              stateClasses = classes.closed;
            } else if (item.State === "published") {
              stateClasses = classes.published;
            }

            /*
            diplay the meals 
             */


            let meals="";

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
                  <td className={classes.true}>yes </td>
                ) : (
                  <td className={classes.false}>no </td>
                )}
                <td>{continent}</td>
                <td>{item.publicData1.country}</td>
                <td>{item.publicData1.city}</td>
                <td>{item.publicData1.activities ? "yes":"no"}</td>
                
                <td>
                  <div className={classes["act-exp-container"]}>
                    <span
                      className={actExpanded ? classes["act-exp"] : classes["act-not-exp"]}
                    >
                      {item.publicData1.activities}
                    </span>
                    
                  </div>
              </td>
                <td>{item.publicData1.category.join(' ')}</td>
                <td>{item.publicData1.languages.join(' ')}</td>
                <td>{item.publicData1.otherLanguages}</td>
                <td><a href={url} target='_blank'> {url}</a> </td>
                {multipleFilterData && <td   onClick={(e) => addCustomElement(e, index)}> <i className="fas fa-solid fa-plus" style={buttonStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}></i></td>}
               
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



const selectedItems = selectedCustomData.map((item, index)=>{
  
  return(

    <Card style={{ width: '100%',height:'5rem', margin:'1em auto .5em auto' }}>
    
    <Card.Body  style={{ display:'flex',justifyContent:'space-around',alignItems:'flex-start'}} >
      <Card.Title>{item.Title}</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      
      <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} data-index={index}  onClick={removeCustomElement} variant="primary" style={{ margin:'0  .5em ',padding:'.5em' }}> <i className="fas fa-duotone fa-house-circle-xmark" style={{ fontSize: '16px', color: 'white' }}></i></Button> {/* Pass the index of the element */}
    </Card.Body>
  </Card>

   
   
  )
  })

  setSelection(selectedItems)
 
  



        }
      }, [jsonData,actualState, selectedCountry,selectedRoomtype,hasPrivateBathroom,selectedCity,selectedCustomData,offerActivities, actExpanded,impact,selectedContinent]);


    

  
      
   
    console.log(selectedCustomData)
  console.log(selection)
  return (
    <>
     {jsonData && <div key={"mxps"} className={classes["mega-container"]}>
       <Modal isOpen={isOpenHelp} onClose={closeModalHelp}>
        <h2 >Help Modal</h2>
        <div>

          
        </div>
      </Modal>
  
      
      <Modal isOpen={isOpenSelection} onClose={closeModalSelection}  >

      <div className={classes["display-selection"]}>
        {selection && selection.length === 0 ? (
          <p>Sorry, no items selected.</p>
        ) : (
          <>
           <h2>Selected items</h2>
          {selection}
          </>
         
        )}
      </div>
      <div className={classes["selection-btn-container"]}>
      <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={clearSelection}> {selection && selection.length === 0? 
          <span>OK</span>
         : 
         <span>Clear selection</span>
        }

      </Button>

      </div>
   
    </Modal>
  
   
   {jsonData && <div>
    <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} variant="primary" onClick={handleShow} style={{ marginRight:'1em' }}>
        Filters
      </Button>
      
     {selection && <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={openModalSelection} style={{ marginRight:'1em' }}>
  <i className="fas fa-duotone fa-eye" style={{ fontSize: '16px', color: 'white',marginRight:'.5em' }}></i>
  <span style={{ position: 'relative' }}>
    {selection.length > 0 && (
      <span
        style={{
          position: 'absolute',
          top: '-15px',
          right: '-80px',
          backgroundColor: 'red',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '12px',
        }}
      >
        {selection.length}
      </span>
    )}
  </span>
  Selection
</Button>}
    <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}   onClick={openModalHelp} style={{ marginRight:'1em' }}>  <i className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i></Button>
     <p style={{ marginTop:'1em' }}>File created on: {fileMetadata.lastModifiedDate.toLocaleString()}</p>
     <CustomSelectedData onMultipleFilterData={multipleFilterData} onCustomSelectedData={selectedCustomData} />
    
   </div> }
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {multipleFilterData && <div className={classes["nav-container"]}>
        <div className={classes["filter-container"]}> 
           {/* filtering by State*/}
           <div  className={classes["filter-element"]}>
            <label htmlFor="stateFilter">Actual Status:</label>
            <select
              id="stateFilter"
              value={actualState}
              onChange={(e) => setActualState(e.target.value)}
            >
              <option value="">All</option>
              {/* the values are not available on json data*/}
          
                <option key={1} value={"draft"}>
                draft
                </option>
                <option key={2} value={"published"}>
                published 
                </option>
                <option key={3} value={"closed"}>
                closed
                </option>
                <option key={4} value={"pendingApproval"}>
                pending Approval
                </option>
            </select>
          </div>
          <div  className={classes["filter-element"]} >
            <label htmlFor="selectedContinent">Filter by Continent:</label>
            <select
              id="selectedContinent"
              value={selectedContinent}
              onChange={(e) => {setSelectedContinent(e.target.value); console.log(e.target.value)} }
            >
                <option value="">All Continents</option>
                <option key={1} value={"Africa"}>Africa</option>
                <option key={2} value={"Antarctica"}>Antarctica</option>
                <option key={3} value={"Asia"}>Asia</option>
                <option key={4} value={"Europe"}>Europe</option>
                <option key={5} value={"North America"}>North America</option>
                <option key={6} value={"Oceania"}>Oceania</option>
                <option key={7} value={"South America"}>South America</option>
            </select>
          </div>
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

          <div  className={classes["filter-element"]}>
            <label htmlFor="impact">Filter by Impact:</label>
            <select
              id="impact"
              value={impact}
              onChange={(e) =>  setImpact(e.target.value)}
            >
              <option value="">All</option>
              {/* the roomtype values are available in the multipleFilterData but not on a stylish way */}
              <option key={1} value={"Bildung"}>
              Bildung
                </option>
                <option key={2} value={"Equality"}>
              Equality
                </option>
                <option key={4} value={"Health"}>
              Health
                </option>
              <option key={5} value={'Naturschutz'}>
              Naturschutz
              </option>
              <option key={6} value={"Sports"}>
              Sports
              </option>
              <option key={7} value={"Tierschutz"}>
              Tierschutz
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
          
                <option key={1} value={"yes"}>
                 yes
                </option>
                <option key={2} value={"no"}>
                 no 
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
          <button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} className={classes["reset-btn"]} onClick={resetFilters}><i className="fa fa-refresh" style={{fontSize:"16px"}}></i></button>
       
     
          </div>

        </div>}
        </Offcanvas.Body>
      </Offcanvas>

  {!multipleFilterData && <div className={classes["spinner"]}></div>}
    { multipleFilterData && (
           <>
           <p style={{ marginTop:'1em' }}>elements: {multipleFilterData.length}</p>
    
          <Table striped bordered hover   id="filteredTable" >
         <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>State</th>
              <th>Title</th>
              <th>Room Type</th>
              <th>Room Amount</th>
              <th>Room Occupancy</th>
              <th>Max Amount</th>
              <th>Price/Night</th>
              <th>Currency</th>
              <th>Meals</th>
              <th>Private Bathroom</th>
              <th>Continent</th>
              <th>Country</th>
              <th>City</th>
              <th>Activities</th>
              <th>Activities Description {actExpanded ? (
                      <i
                        onClick={ closeActivitiesHandler}
                        className="fas fa-solid fa-chevron-up"
                        style={{ fontSize: "16px", color: "blue", padding: "0 1em" }}
                      />
                    ) : (
                      <i
                        onClick={ expandActivitiesHandler}
                        className="fas fa-solid fa-chevron-down"
                        style={{ fontSize: "16px", color: "blue", padding: "0 1em" }}
                      />
                    )}</th>
              <th>Impact</th>
              <th>Lang</th>
              <th>+Lang</th>
              <th>Url</th>
            
             
            </tr>
          </thead>
          <tbody>{mappedElement}</tbody>
         </Table>
        
       
       
         </>
     
    )}
  </div>} 
    </>
   

  );




  
}

export default FilterComponent