
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
import enImg from "../../assets/img/en.png"
import deImg from "../../assets/img/de.png"
import esImg from "../../assets/img/es.png"
/* import for the pop up on continent */

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import BarChart from '../Charts/BarChart.jsx';

//translation
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

// tutorial
import FilterComponentTutorial from '../tutorials/FilterComponentTutorial.jsx';

const FilterComponent = ({jsonData , fileMetadata, jsonUserData , fileUserMetadata ,onUserName }) => {

  const { t } = useTranslation();
//tutorial

const [stepsEnabled, setStepsEnabled] = useState(false);
const toggleSteps = () => {
  setStepsEnabled((prevStepsEnabled) => !prevStepsEnabled);

};
const onStepsExit = () => {
  setStepsEnabled(false);
  
};
 /* related to listings */
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
/* state of country count for charts initialised already with dummy data*/

  const [countryCount, setCountryCount] = useState({
    labels :['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: 2,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })
  
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

    /*filter by hasVideoOnSocialbnb */

    const [hasVideoOnSocialbnb, setHasVideoOnSocialbnb] = useState('');

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

  // dymically renden img based on language
  const getLanguageImage = () => {
    const currentLanguage = i18n.language || window.localStorage.i18nextLng;
    switch (currentLanguage) {
      case 'de':
        return deImg;
      case 'es':
        return esImg;
      // Add more cases for other languages as needed
      default:
        return enImg;
    }
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
    setHasVideoOnSocialbnb('')
  };
/* count projects */
const [projectTitleCounts, setProjectTitleCounts] = useState({ });
const counts = {};
/* comparing the projects to themselves for knowing if they are unique and not repeated  */
let prevProjectTitle = null;
let prevProjectLocation = null;
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
/*youtube btn  and not allowed youtube btn styles */
  const youtubeLinkButtonStyle = {
    padding: '10px 9px 6px 9px',
    backgroundColor: '#ff0000',
   borderRadius:'50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    fontSize: '16px',
     color: 'white'
  };
  const youtubeLinkButtonNA = {
    display: 'none ',
    
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
  const popupTextContinent =   t('popupTextContinent') 
 
 
  /* related to users.csv*/

 const [hosts , setHosts] = useState(null)

    useEffect(() => {

    

      if (jsonData) {

        let filteredData = jsonData;
        
   
    
        if(jsonData && jsonUserData){
          
          const hostUsers = jsonUserData.filter(entry => entry.NumOfOpenListings > 0);
           setHosts(hostUsers)
           filteredData = jsonData.map((data) => {
             const matchingUser = jsonUserData.find((user) => user.Id === data.AuthorId
  
             
             );
             
             if (matchingUser) {
          
               return {
                 ...data,
                 actividades_nuevas: matchingUser.PrivateData, // Replace 'additionalInfo' with the desired key from jsonUserData
                 hasVideoOnSocialbnb: matchingUser.PrivateData,
                 projectTitle: matchingUser.publicData1


               };
             }
          
             return data;
           });
         
           // Use filteredData containing information from both jsonData and jsonUserData
     
           // filtered data includes now the new activities i linked jsonData & jsonUserData on the ID of the user
       } 
       
       if (hasVideoOnSocialbnb || actualState||selectedCountry || selectedRoomtype ||hasPrivateBathroom || selectedCity||offerActivities || impact || searchQuery|| filteredData) {
       
       
        filteredData = filteredData.filter((item) => {
     
          const publicData = item.publicData1;
         
        const stateMatch= !actualState || item.State === actualState;
        const countryMatch = !selectedCountry || publicData.country === selectedCountry;
        const roomtypeMatch = !selectedRoomtype || publicData.roomtype === selectedRoomtype;
        const bathroomMatch=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('privat_bathroom')? "yes":"no"  == hasPrivateBathroom 
        const bathroomMatchNot=!hasPrivateBathroom ||  publicData && publicData.amenities && publicData.amenities.includes('shared_bathroom')? "no":"yes" == hasPrivateBathroom 
        const hasVideoOnSocialbnbMatch = !hasVideoOnSocialbnb || hosts && hosts.length > 0 && item.hasVideoOnSocialbnb.includes("video\":\"ja")? "ja" :"nein" ==hasVideoOnSocialbnb

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
    
 
   
 
          return  stateMatch && countryMatch && roomtypeMatch && cityMatch  && bathroomMatch && bathroomMatchNot && activitiesMatch && impactMatch && continentMatch && searchQueryMatch && hasVideoOnSocialbnbMatch ;
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

            /* extra activities on single activities */
         
            const singleExtraActivity = jsonUserData && item.actividades_nuevas ? JSON.parse(item.actividades_nuevas) : null;
            let activitiesArray = [];
            
            if (singleExtraActivity) {
              activitiesArray = Object.entries(singleExtraActivity).reduce((acc, [key, value]) => {
                const match = key.match(/^(.*?)(\d+)$/); // Match keys ending with a number
                if (match) {
                  const [, baseKey, index] = match;
                  if (!acc[index]) {
                    acc[index] = {};
                  }
                  acc[index][baseKey] = value;
                } else {
                  acc.push({ key, value });
                }
                return acc;
              }, []);
            } else {
              activitiesArray = [{ key: "K/A", value: "K/A" }];
            }
            
           console.log(activitiesArray)
            


  // Extracting the "video" value if it exists
  let videoValue =jsonUserData && item.hasVideoOnSocialbnb.includes("video\":\"ja")? t('filterCanvas.videoOnSocialbnbOption1') :t('filterCanvas.videoOnSocialbnbOption2') 
  
   /*map the listings  */  

            return (
              <tr  key={index} className={classes.card}>
                {/* <td>{index}</td> */}
                <td className={classes["small"]}>{item.Id}</td>
                <td className={stateClasses}>{item.State}</td>
                <td>{updatedTitle}</td>
                {/* {jsonUserData && item.projectTitle && <td>{item.projectTitle.projectTitle
}</td>} */}
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
              <td>
    {activitiesArray.map((activity, index) => (
     <div className={jsonUserData && activitiesArray.length > 0 && !activitiesArray.some(item => item.key === 'K/A' && item.value === 'K/A') ? classes.activitiesDisplayTable : ""}>
      <p key={index}>{activity.activity}</p>
      <p key={index +1}>{activity.activitycategory}</p>
      <p key={index +3}>{activity.activitycosts}</p>
      </div>

    ))}
  </td>
               { item.publicData1.category &&  <td>{Array.isArray(item.publicData1.category) ? item.publicData1.category.join(' ') : item.publicData1.category}</td>

}
                <td>{Array.isArray(item.publicData1.languages) ? item.publicData1.languages.join(' ') : (item.publicData1.languages ? item.publicData1.languages : 'N/A')}</td>

                {showExtraCategories &&   <td><a href={url} target='_blank'> {url}</a> </td>}
                {jsonUserData &&   <td>{videoValue }</td>}
                {showExtraCategories &&   <td><a href={item.publicData1.youtubeLink} target='_blank'><i className="fa-brands fa-youtube" style={item.publicData1.youtubeLink && item.publicData1.youtubeLink.length > 0 ? youtubeLinkButtonStyle : youtubeLinkButtonNA} onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}  >  </i></a> </td>}
                {multipleFilterData && <td id='step9'  onClick={(e) => addCustomElement(e, index)}> <i className="fas fa-solid fa-plus"  style={buttonStyle} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}></i></td>}
               
              </tr>
          
            );
          });
          setMultipleFilterData(filteredData);
          setMappedElements(mapped);
          

        
 
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


setCountryCount({
  labels:countriesArray.map((data)=>data.country),
  datasets:[{
    label:t('chartsLabel'),
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
    
    <Card.Body  style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }} >
      <Card.Title>{item.Title}</Card.Title>
      <Card.Text>
        
      </Card.Text>
      
      <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} data-index={index}  onClick={removeCustomElement} variant="primary" style={{background:"#1C7881", border:"none", margin:'0  .5em ',padding:'.5em' }}> <i onClick={removeCustomElement} className="fas fa-duotone fa-house-circle-xmark" style={{ fontSize: '16px', color: 'white' }}></i></Button> {/* Pass the index of the element */}
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
     
    
      }, [jsonData,jsonUserData,actualState, selectedCountry,selectedRoomtype,hasPrivateBathroom,selectedCity,selectedCustomData,offerActivities, actExpanded,impact,selectedContinent,showExtraCategories,searchQuery,percent,hasVideoOnSocialbnb]);

      useEffect(()=>{
        console.log(multipleFilterData)
        {multipleFilterData &&   multipleFilterData.forEach(item => {
          const projectTitle = item.projectTitle;
          const projectLocation = item.publicData1.city
       

          if (projectTitle !== prevProjectTitle && projectLocation !==prevProjectLocation) {
            counts[projectTitle] = (counts[projectTitle] || 0) + 1;
            prevProjectTitle = projectTitle;
            prevProjectLocation = projectLocation
          }
        });
    
        setProjectTitleCounts(counts);}
      },[multipleFilterData])
    
      const uniqueProjectTitles = Object.keys(projectTitleCounts);
  
  
   
   
  return (
    <>
     <FilterComponentTutorial onStepsEnabled={stepsEnabled}  onStepsExit={onStepsExit}  />
     {jsonData && <div key={"mxps"} className={classes["mega-container"]}>
       <Modal isOpen={isOpenHelp} onClose={closeModalHelp}>
        <h2 >{t('help')} </h2>
        <div>

      
        </div>
      </Modal>
      <Modal isOpen={isOpenCharts} onClose={closeModalCharts}>
        <h2 >{t('charts')}</h2>
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
           <h2>{t('selection.SelectedItems')}</h2>
          {selection}
          </>
         
        )}
      </div>
      <div className={classes["selection-btn-container"]}>
     
      <Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={clearSelection} style={{ background:"#1C7881", border:"none"  }}> {selection && selection.length === 0? 
          <span>OK</span>
         : 
         <span>{t('selection.ClearSelection')}</span>
        }

      </Button>

      </div>
   
    </Modal>
  
   
   {jsonData && <div className={dataHasBeenFiltered ? `${classes["utilities-bar"]} ${classes["utilities-bar-single"]}`: classes["utilities-bar"]}>

     {!dataHasBeenFiltered && <img className={classes["select-filter-img"]} src={getLanguageImage()} alt="" /> }
    <div className={classes["main-btn-container"]} >
      
    <Button id="step1"  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} variant="primary" onClick={handleShow} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>
        {t('filters.FilterName')}
      </Button>
    
     {selection && <Button id="step2"   onMouseDown={handleMouseDown}
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
  {t('selection.SelectionName')}
</Button>}

<Button id="step3"  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={showHideMore} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{showExtraCategories ?   <i className="fa-solid fa-eye-slash" style={{ fontSize: '16px', color: 'white' }}></i> : <i className="fa-solid fa-eye" style={{ fontSize: '16px', color: 'white' }}></i>}</Button>
    <span id="hint1"><Button  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}   onClick={toggleSteps} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>  <i  className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i></Button></span>
     <h4 style={{ margin:'1em 0' }}> {t('listingMetadata.DownloadedOn')} {fileMetadata.lastModifiedDate.toLocaleString()}</h4>
    {fileUserMetadata && <h4 style={{ margin:'1em 0' }}> {t('usersMetadata.DownloadedOn')}  {fileUserMetadata.lastModifiedDate.toLocaleString()}</h4>} 
    <h4 style={{ margin:'1em 0' }}>  {t('Metadata.ReportCreatedBy')}  {onUserName}</h4>
     <CustomSelectedData   onMultipleFilterData={multipleFilterData} onCustomSelectedData={selectedCustomData} onUserName={onUserName} onAmountProjects={projectTitleCounts[uniqueProjectTitles[0]]}  />
     {!selectedCountry && <Button  id="step6"  onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp} onClick={openModalCharts}  style={{ marginTop:'1em', marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('showCharts')}</Button>}
  
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
            <label htmlFor="stateFilter">{t('filterCanvas.Status')}</label>
            <select
              id="stateFilter"
              value={actualState}
              onChange={(e) => setActualState(e.target.value)}
            >
              <option value="">{t('filterCanvas.StatusOption1')}</option>
              {/* the values are not available on json data*/}
          
                <option key={1} value={"draft"}>
                {t('filterCanvas.StatusOption2')}
                </option>
                <option key={2} value={"published"}>
                {t('filterCanvas.StatusOption3')}
                </option>
                <option key={3} value={"closed"}>
                {t('filterCanvas.StatusOption4')}
                </option>
                <option key={4} value={"pendingApproval"}>
                {t('filterCanvas.StatusOption5')}
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
            <label htmlFor="selectedContinent">{t('filterCanvas.Continents')}</label>
            <select
              id="selectedContinent"
              value={selectedContinent}
              onChange={(e) => {setSelectedContinent(e.target.value)} }
            >
                <option value="">{t('filterCanvas.ContinentsOption1')}</option>
                <option key={1} value={"Africa"}>{t('filterCanvas.ContinentsOption2')}</option>
                <option key={2} value={"Antarctica"}>{t('filterCanvas.ContinentsOption3')}</option>
                <option key={3} value={"Asia"}>{t('filterCanvas.ContinentsOption4')}</option>
                <option key={4} value={"Europe"}>{t('filterCanvas.ContinentsOption5')}</option>
                <option key={5} value={"North America"}>{t('filterCanvas.ContinentsOption6')}</option>
                <option key={6} value={"Oceania"}>{t('filterCanvas.ContinentsOption7')}</option>
                <option key={7} value={"South America"}>{t('filterCanvas.ContinentsOption8')}</option>
            </select>
          </div>
        </OverlayTrigger>
      }
    {/* filtering by hasVideoOnSocialbnb*/}
   {jsonUserData && <div  className={classes["filter-element"]} >
            <label htmlFor="hasVideoOnSocialbnb">socialbnb Video</label>
            <select
              id="hasVideoOnSocialbnb"
              value={hasVideoOnSocialbnb}
              onChange={(e) => setHasVideoOnSocialbnb(e.target.value)}
            >
                <option value="">{t('filterCanvas.BathroomOption1')}</option>
              <option key={1} value={"ja"}>yes</option>
            
              <option key={2} value={"nein"}>no</option>
            </select>
          </div>}
        
         {/* filtering by country*/}
        <div  className={classes["filter-element"]} >
            <label htmlFor="countryFilter">{t('filterCanvas.Countries')}</label>
            <select
              id="countryFilter"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">{t('filterCanvas.CountriesOption1')}</option>
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
            <label htmlFor="roomtype">{t('filterCanvas.RoomType')}</label>
            <select
              id="roomtype"
              value={selectedRoomtype}
              onChange={(e) => setSelectedRoomtype(e.target.value)}
            >
              <option value="">{t('filterCanvas.RoomTypeOption1')}</option>
              {/* the roomtype values are available in the multipleFilterData but not on a stylish way */}
              <option key={1} value={"entire_accomodation"}>
              {t('filterCanvas.RoomTypeOption2')}
                </option>
              <option key={2} value={'singlebedroom'}>
              {t('filterCanvas.RoomTypeOption3')}
              </option>
              <option key={3} value={"doublebedroom"}>
              {t('filterCanvas.RoomTypeOption4')}
              </option>
              <option key={4} value={"shared_bedroom"}>
              {t('filterCanvas.RoomTypeOption5')}
              </option>
              <option key={5} value={"multi_bedroom"}>
              {t('filterCanvas.RoomTypeOption6')}
              </option>
              <option key={6} value={"twobedroom"}>
              {t('filterCanvas.RoomTypeOption7')}
              </option>
              <option key={7} value={"tent"}>
              {t('filterCanvas.RoomTypeOption8')}
              </option>
           
            </select>
          </div>

          <div  className={classes["filter-element"]}>
            <label htmlFor="impact">{t('filterCanvas.Impact')}</label>
            <select
              id="impact"
              value={impact}
              onChange={(e) =>  setImpact(e.target.value)}
            >
              <option value="">{t('filterCanvas.ImpactOption1')}</option>
              {/* the impact  values are in denglisch in original */}
              <option key={1} value={"Bildung"}>
              {t('filterCanvas.ImpactOption2')}
                </option>
                <option key={2} value={"Equality"}>
              {t('filterCanvas.ImpactOption3')}
                </option>
                <option key={4} value={"Health"}>
              {t('filterCanvas.ImpactOption4')}
                </option>
              <option key={5} value={'Naturschutz'}>
              {t('filterCanvas.ImpactOption5')}
              </option>
              <option key={6} value={"Sports"}>
              {t('filterCanvas.ImpactOption6')}
              </option>
              <option key={7} value={"Tierschutz"}>
              {t('filterCanvas.ImpactOption7')}
              </option>
             
           
            </select>
          </div>

            {/* filtering by hasPrivateBathroom*/}
        <div  className={classes["filter-element"]}>
            <label htmlFor="bathroomFilter">{t('filterCanvas.Bathroom')}</label>
            <select
              id="bathroomFilter"
              value={hasPrivateBathroom}
              onChange={(e) => setHasPrivateBathroom(e.target.value)}
            >
              <option value="">{t('filterCanvas.BathroomOption1')}</option>
              {/* the values are not available on json data*/}
          
                <option key={1} value={"yes"}>
                {t('filterCanvas.BathroomOption2')}
                </option>
                <option key={2} value={"no"}>
                {t('filterCanvas.BathroomOption3')} 
                </option>
                <option key={3} value={"both"}>
                {t('filterCanvas.BathroomOption4')}
                </option>
            </select>
          </div>
              {/* filtering by city*/}
        <div  className={classes["filter-element"]}>
            <label htmlFor="cityFilter">{t('filterCanvas.Cities')}</label>
            <select
              id="cityFilter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">{t('filterCanvas.CitiesOption1')}</option>
              {/* Assuming the city values are available in the multipleFilterData */}
              {[...new Set(multipleFilterData.map((item) => item.publicData1.city))].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div  className={classes["filter-element"]}>
            <label htmlFor="activitiesFilter">{t('filterCanvas.Activities')}</label>
            <select
              id="activitiesFilter"
              value={offerActivities}
              onChange={(e) => setOfferActivities(e.target.value)}
            >
              <option value="">{t('filterCanvas.ActivitiesOption1')}</option>
              {/* the values are not available on json data*/}
          
                <option key={1} value={"yes"}>
                {t('filterCanvas.ActivitiesOption2')}
                </option>
                <option key={2} value={"no"}>
                {t('filterCanvas.ActivitiesOption3')} 
                </option>
              
            </select>
          </div>
          </div>
          <div className={classes["btn-container"]}>
            <div  className={classes["search-container"]}>
          

      <FloatingLabel
        controlId="floatingInput"
        label={t('filterCanvas.SearchFielLabel')}
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

           <div className={classes["total-bar-listings-projects"]}>
           <h2 > {multipleFilterData.length} Listings</h2>
           <h3>from</h3>
           {jsonUserData && uniqueProjectTitles.length > 0 && (
              <h2>
              {projectTitleCounts[uniqueProjectTitles[0]]} Projects
            
            </h2>
          
            )}
           
         </div>

            <div  className={classes["total-bar-elements"]}>
          

           <h2 > {t('totalPerCent')}</h2>
           <ProgressBar className={classes["bar"]} now={percent} label={`${percent}%`} />
            </div>
          
           </div>
           <div className={classes["table-container"]}>
           <Table striped bordered hover   id="filteredTable" >
         <thead>
            <tr>
              {/* <th>Index</th> */}
              <th>{t('table.ID')}</th>
              <th>{t('table.State')}</th>
              <th>{t('table.Title')}</th>
              {/* <th>{t('table.ProjectTitle')}</th> */}
              <th>{t('table.RoomType')}</th>
            
             {showExtraCategories && <th>{t('table.RoomAmount')}</th>}
             {showExtraCategories && <th>{t('table.RoomOccupancy')}</th>}
               {showExtraCategories &&<th>{t('table.MaxAmount')}</th>}
               {showExtraCategories &&<th>{t('table.Price/Night')}</th>}
               {showExtraCategories && <th>{t('table.Currency')}</th>}
               {showExtraCategories && <th>{t('table.Meals')}</th>}
                <th>{t('table.PrivateBathroom')}</th>
              <th>{t('table.Continent')}</th>
              <th>{t('table.Country')}</th>
              <th>{t('table.City')}</th>
              <th>{t('table.Activities')}</th>
              <th>{t('table.ActivitiesDescription')} {actExpanded ? (
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
                     <th>{t('table.ExtraActivities')} </th>
              <th>{t('table.Impact')}</th>
              <th>{t('table.Lang')}</th>
         
              {showExtraCategories &&  <th>{t('table.Url')}</th>}
              {jsonUserData &&  <th>has socialbnbVideo</th>}
              {showExtraCategories &&  <th>youtube</th>}
              {multipleFilterData > 0 &&  <th></th>}
             
            </tr>
          </thead>
          <tbody>{mappedElement}</tbody>
         </Table>
       
           </div>
       
      
        
       
       
         </>
     
    )}
  </div>} 
    </>
   

  );




  
}

export default FilterComponent