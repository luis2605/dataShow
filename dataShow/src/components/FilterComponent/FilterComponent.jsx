
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
import ProgressBar from 'react-bootstrap/ProgressBar';
/* export final table to json  */
import { saveAs } from 'file-saver';  

/*impor for checkin countries to continents for filtering */
import { getContinentCode, getContinentName } from '@brixtol/country-continent';

/*assets */
import dataShowLogo from "../../assets/img/dataShowLogo.png"
import sorry from "../../assets/img/sorry.png"
import selectfilter from "../../assets/img/selectFilter.png"
/* import for the pop up on continent */

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import BarChart from '../Charts/BarChart.jsx';

const FilterComponent = ({jsonData , fileMetadata}) => {
 
   /*mapped elements for rendering table */
    const[mappedElement,setMappedElements] = useState(null);
 /*json data after filters applied*/
    const [multipleFilterData, setMultipleFilterData] = useState(null);
 /*json data after filters applied and specific data selected*/  
    const [selectedCustomData, setSelectedCustomData] = useState([]);
/* display selected json data from selectedCustomData */  
   const [selection, setSelection] = useState(null);

 

// used to show hide the extra categories
const [showExtraCategories, setShowExtraCategories] = useState(false)

    
   /*boolean for displaying help modal*/ 
    const [isOpenHelp, setIsOpenHelp] = useState(false);
  /*boolean for displaying charts modal*/ 
    const [isOpenCharts, setIsOpenCharts] = useState(false);
/* state of country count for charts */

  const [countryCount, setCountryCount] = useState({})
    
   /*boolean for displaying selection modal*/ 
   const [isOpenSelection, setIsOPenSelection] = useState(false);
  
    /* selection modal open/close */
    const openModalSelection = () => {
      setIsOPenSelection(true);
    };
   
    const closeModalSelection = () => {
      setIsOPenSelection(false);
    };

     /* show more categories  show/hide */
     const showHideMore = () => {
      setShowExtraCategories(!showExtraCategories);
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
      /* charts modal open/close */
      const openModalCharts = () => {
        setIsOpenCharts(true);
      };
     
      const closeModalCharts = () => {
        setIsOpenCharts(false);
      };

    /*filters */
  // Search bar state
  const [searchQuery, setSearchQuery] = useState('');
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

      /* state for the % */

      const [percent, setPercent] = useState(0)

      /* identify if the data has been filtered */

      const [dataHasBeenFiltered, setDataHasBeenFiltered] = useState(false)
   
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
    setSearchQuery('')
  };

    /*Reset query text*/
    
    const resetQueryText = () => {
      setSearchQuery('')
    }

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

  /*calculate percent  */

  const calculatePercent =(total,percent) => {
  return  ( percent*100) /total

  }

  /* text for pop-up on continent */
  const popupTextContinent = "Continent cannot be selected as first filter due to the fact that continent data is not present on the original source. Please select one of the other filters before filtering by continent "
 

    useEffect(() => {

      

      if (jsonData) {
        let filteredData = jsonData;

       
    
        if ( actualState||selectedCountry || selectedRoomtype ||hasPrivateBathroom || selectedCity||offerActivities || impact || searchQuery) {
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

          const searchQueryMatch =!searchQuery || item.Title && item.Title.toLowerCase().includes(searchQuery.toLowerCase()) 
 
    // Check if publicData and publicData.country are defined before getting the continent
    const continent = publicData && publicData.country && getContinentName(publicData.country);
// la pinga esta no funciona tratar manana de nuevo
    // Perform continent match only if the continent is defined and selectedContinent is not empty para 
    const continentMatch = !selectedContinent || (continent && continent === selectedContinent);
      
   
     
   
            return  stateMatch && countryMatch && roomtypeMatch && cityMatch  && bathroomMatch && bathroomMatchNot && activitiesMatch && impactMatch && continentMatch && searchQueryMatch ;
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
                {showExtraCategories &&   <td>{item.publicData1.roomamount}</td>}
                {showExtraCategories &&    <td>{item.publicData1.bedamount}</td>}
               {showExtraCategories &&    <td>{item.publicData1.bedamount && item.publicData1.roomamount ? item.publicData1.bedamount * item.publicData1.roomamount : ""}</td>}
               {showExtraCategories &&     <td>{item.PriceAmount / 100}</td>}
               {showExtraCategories &&    <td>{item.publicData1.customCurrency}</td>}
               {showExtraCategories &&    <td>{ meals}</td>}
               { item.publicData1 && item.publicData1.amenities && item.publicData1.amenities.includes('privat_bathroom') ? (
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
                {showExtraCategories &&   <td>{item.publicData1.otherLanguages}</td>}
                {showExtraCategories &&   <td><a href={url} target='_blank'> {url}</a> </td>}
                {multipleFilterData && <td   onClick={(e) => addCustomElement(e, index)}> <i className="fas fa-solid fa-plus" style={buttonStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}></i></td>}
               
              </tr>
          
            );
          });
          setMultipleFilterData(filteredData);
          setMappedElements(mapped);

 console.log(filteredData)
 
 /*county the amount of listings per country for charts */
const countryCounts = {};

for (const data of filteredData) {
  const country = data.publicData1.country;
  if (country in countryCounts) {
    countryCounts[country] += 1;
  } else {
    countryCounts[country] = 1;
  }
}

const countriesArray = Object.entries(countryCounts).map(([country, count]) => ({ country, count }));

console.log(countriesArray);
setCountryCount({
  labels:countriesArray.map((data)=>data.country),
  datasets:[{
    label:"Amount of Listings per country",
    data:countriesArray.map((data)=>data.count)
  }]
 
})

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
 
  

     setPercent(()=>{
     
      return calculatePercent(jsonData.length , filteredData.length).toFixed(2)
     })


    
       if(multipleFilterData && jsonData && multipleFilterData.length < jsonData.length){

        setDataHasBeenFiltered(true)
       }else setDataHasBeenFiltered(false)

     

        }
      }, [jsonData,actualState, selectedCountry,selectedRoomtype,hasPrivateBathroom,selectedCity,selectedCustomData,offerActivities, actExpanded,impact,selectedContinent,showExtraCategories,searchQuery,percent]);


    

  
     
   
   
  return (
    <>
     {jsonData && <div key={"mxps"} className={classes["mega-container"]}>
       <Modal isOpen={isOpenHelp} onClose={closeModalHelp}>
        <h2 >Help Modal</h2>
        <div>

      
        </div>
      </Modal>
      <Modal isOpen={isOpenCharts} onClose={closeModalCharts}>
        <h2 >Charts Modal</h2>
        <div>
<BarChart chartdata={countryCount} />
      
        </div>
      </Modal>
      
      <Modal isOpen={isOpenSelection} onClose={closeModalSelection} onSelection={selection} >

      <div className={classes["display-selection"]}>
        {selection && selection.length === 0 ? (
          <img src={sorry} className={classes["img-sorry"]} />
        ) : (
          <>
           <h2>Selected items</h2>
          {selection}
          </>
         
        )}
      </div>
      <div className={classes["selection-btn-container"]}>
     
      <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={clearSelection} style={{ background:"#1C7881", border:"none"  }}> {selection && selection.length === 0? 
          <span>OK</span>
         : 
         <span>Clear selection</span>
        }

      </Button>

      </div>
   
    </Modal>
  
   
   {jsonData && <div className={dataHasBeenFiltered ? `${classes["utilities-bar"]} ${classes["utilities-bar-single"]}`: classes["utilities-bar"]}>

     {!dataHasBeenFiltered && <img className={classes["select-filter-img"]} src={selectfilter} alt="" /> }
    <div>
    <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} variant="primary" onClick={handleShow} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>
        Filters
      </Button>
    
     {selection && <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={openModalSelection} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>


  <i className="fa-solid fa-arrows-to-eye" style={{ fontSize: '16px', color: 'white',marginRight:'.5em' }}></i>
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

<Button onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={showHideMore} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{showExtraCategories ?   <i className="fa-solid fa-eye-slash" style={{ fontSize: '16px', color: 'white' }}></i> : <i className="fa-solid fa-eye" style={{ fontSize: '16px', color: 'white' }}></i>}</Button>
    <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}   onClick={openModalHelp} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>  <i className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i></Button>
     <h3 style={{ margin:'1em 0' }}>File downloaded on: {fileMetadata.lastModifiedDate.toLocaleString()}</h3>
     <CustomSelectedData onMultipleFilterData={multipleFilterData} onCustomSelectedData={selectedCustomData} />
     <Button onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={openModalCharts}  style={{ marginTop:'1em', marginRight:'1em',background:"#1C7881", border:"none"  }}>Show Charts</Button>
   </div> 
   </div>
   }
    <Offcanvas show={show} onHide={handleClose}  
         >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img className={classes["img-logo"]} src={dataShowLogo} /></Offcanvas.Title>
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
          {
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id={`tooltip-continent`}>
               <strong>{popupTextContinent}</strong>.
            </Tooltip>
          }
        >
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
        </OverlayTrigger>
      }

        
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
              <option key={7} value={"tent"}>
                 Tent
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
            <div  className={classes["search-container"]}>
          

      <FloatingLabel
        controlId="floatingInput"
        label="Listing name here..."
        className="mb-3"
      >
        <Form.Control type="text"   value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title" />
      </FloatingLabel>
            </div>
         <div>
            <button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} className={classes["reset-btn"]} onClick={resetQueryText}><i className="fa  fa-delete-left" style={{fontSize:"16px"}}></i></button>   
          <button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} className={classes["reset-btn"]} onClick={resetFilters}><i className="fa fa-refresh" style={{fontSize:"16px"}}></i></button>
       </div>
    
          </div>
 
        </div>}
        <div className={classes["custom-shape-divider-bottom-1685701521"]}>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className={classes["shape-fill"]}></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className={classes["shape-fill"]}></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className={classes["shape-fill"]}></path>
    </svg>
</div>
        </Offcanvas.Body>
      
      </Offcanvas>

  {!multipleFilterData && <div className={classes["spinner"]}></div>}
    { multipleFilterData && (
           <>
           <div className={classes["total-bar"]}>
             <h2 > {multipleFilterData.length}/{jsonData.length}</h2>
            <div  className={classes["total-bar-elements"]}>
           
           <h2 > % from Total</h2>
           <ProgressBar className={classes["bar"]} now={percent} label={`${percent}%`} />
            </div>
          
           </div>
          
         <Table striped bordered hover   id="filteredTable" >
         <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>State</th>
              <th>Title</th>
              <th>Room Type</th>
            
             {showExtraCategories && <th>Room Amount</th>}
             {showExtraCategories && <th>Room Occupancy</th>}
               {showExtraCategories &&<th>Max Amount</th>}
               {showExtraCategories &&<th>Price/Night</th>}
               {showExtraCategories && <th>Currency</th>}
               {showExtraCategories && <th>Meals</th>}
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
              {showExtraCategories &&   <th>+Lang</th>}
              {showExtraCategories &&  <th>Url</th>}
              {multipleFilterData > 0 &&  <th></th>}
             
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