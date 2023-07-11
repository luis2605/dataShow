import React, { useState , useEffect, useRef  } from 'react';
import csvtojson from 'csvtojson';

import classes from "./csvToJson.module.css"


import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../../assets/img/logo_tuerkis_schrift-04.png"
import logoText from "../../assets/img/logo_tuerkis_schrift-02.png"

import sharetribe from "../../assets/img/tutorial/0.png"

import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

import FilterComponent from '../FilterComponent/FilterComponent';
import Modal from '../Modal/Modal.jsx';

const CSVToJSON = () => {
  /* listings data */
  const [jsonData, setJsonData] = useState(null);

  /*user data */
  const [jsonUserData, setJsonUserData]=useState(null)
/*overlay  */

  const [overlay ,setOverlay] = useState(true)
  /*help modal listings*/
  const [openHelpInitial,setOpenHelpInitial]=useState(false)
  /*help modal users*/
  const [openHelpUsersInitial,setOpenHelpUserInitial]=useState(false)


  const [drawerVisible, setDrawerVisible] = useState(false); // State for drawer visibility


  const openHelpInitialListingModal = () => {
    setOpenHelpInitial(true);
  };
 
  const closeHelpInitialListingModal = () => {
    setOpenHelpInitial(false);
  };
  const openHelpInitialUserModal = () => {
    setOpenHelpUserInitial(true);
  };
 
  const closeHelpInitialListingUserModal = () => {
    setOpenHelpUserInitial(false);
  };
 /* csv listing file metadata */
 const [fileMetadata, setFileMetadata] = useState(null);
 const [fileUserMetadata, setUserFileMetadata] = useState(null);

 const inputFileRef = useRef(null); // Ref for the input listing element
 const inputUserFileRef = useRef(null); // Ref for the input user element



const handleListingsFileUpload = async (e) => {
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
    setOverlay(false);
    setDrawerVisible(true);
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


const handleUserFileUpload = async (e) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();

  fileReader.onload = async (event) => {
    const csvData = event.target.result;
    const jsonArray = await csvtojson().fromString(csvData);

    const modifiedData = jsonArray.map((item) => {
      const publicData1 = JSON.parse(item.PublicData);
      return { ...item, publicData1 };
    });

    setJsonUserData(modifiedData);
   
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
  setUserFileMetadata(fileMetadata);
  setOverlay(false);
  setDrawerVisible(true);
};


const removeListingCsvFile =()=>{
   setJsonData(null);
    setFileMetadata(null);
    inputFileRef.current.value = null; // Reset the input value
    setOverlay(true);
    setDrawerVisible(false);
}

const removeUserCsvFile =()=>{
  setJsonUserData(null);
  setUserFileMetadata(null);
   inputUserFileRef.current.value = null; // Reset the input value
   setOverlay(true);
   setDrawerVisible(false);
}
const toggleDrawer = () => {
  setOverlay((prevState)=> !prevState);
  setDrawerVisible((prevState) => !prevState);
};

return (
  <div className={classes["csvToJson-container"]}>
   {jsonData && <button className={classes["drawer-toggle-button"]} onClick={toggleDrawer}>
      {!drawerVisible ? <i className="fas fa-chevron-right"></i> : <i className="fas fa-chevron-left"></i>}
    </button>}
   {overlay && <div className={classes["drawer-overlay"]} >
    <div className={`${classes["drawer"]} ${drawerVisible ? classes["visible"] : ""}`}>
      {!jsonData && (
        <div className={classes["logo-title"]}>
          <img className={classes["logo"]} src={logo} alt="Logo" />
          <h1>Please select the CSV file to be read</h1>
        </div>
      )}
      <div className={classes["topBar-container"]}>
        {jsonData && <img className={classes["logoText"]} src={logoText} alt="Logo Text" />}
        <div className={classes["input-container"]}>
          <h3>Please introduce the listings file here :</h3>
          <input ref={inputFileRef} type="file" accept=".csv" onChange={handleListingsFileUpload} />
          <div className={classes["btn-container"]}>
            <Button onClick={removeListingCsvFile} style={{ margin: '0 1em', background: "#1C7881", border: "none" }}>
              <i className="fas fa-trash" style={{ fontSize: '16px', color: 'white' }}></i>
            </Button>
            {!jsonData && (
              <Button onClick={openHelpInitialListingModal} style={{ margin: '0 1em', background: "#1C7881", border: "none" }}>
                <i className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i>
              </Button>
            )}
          </div>
       
        </div>
        <div className={classes["input-container"]}>
          <h3>Please introduce the users file here for additional data :</h3>
          <input ref={inputUserFileRef} type="file" accept=".csv" onChange={handleUserFileUpload} />
          <div className={classes["btn-container"]}>
            <Button onClick={removeUserCsvFile} style={{ margin: '0 1em', background: "#1C7881", border: "none" }}>
              <i className="fas fa-trash" style={{ fontSize: '16px', color: 'white' }}></i>
            </Button>
            {!jsonUserData && (
              <Button onClick={openHelpInitialUserModal} style={{ margin: '0 1em', background: "#1C7881", border: "none" }}>
                <i className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i>
              </Button>
            )}
          </div>
      
        </div>
      </div>
     
    </div>
    <Modal isOpen={openHelpInitial} onClose={closeHelpInitialListingModal}>
            <h2>How to get the CSV Listings file from Sharetribe Flex Console ?</h2>
            <div className={classes["help-container"]}>
              <img className={classes["help-container-img"]} src={sharetribe} alt="Sharetribe" />
              <div>
                <h3>Please log in on you Sharetribe Flex Console Account</h3>
                <h3>Go to Listings</h3>
                <h3>Click on Download .csv</h3>
                <h3>The .csv file will land in your Downloads folder</h3>
              </div>
            </div>
      </Modal>
              <Modal isOpen={openHelpUsersInitial} onClose={closeHelpInitialListingUserModal}>
            <h2>How to get the CSV Users file from Sharetribe Flex Console ?</h2>
            <div className={classes["help-container"]}>
              <img className={classes["help-container-img"]} src={sharetribe} alt="Sharetribe" />
              <div>
                <h3>Please log in on you Sharetribe Flex Console Account</h3>
                <h3>Go to Listings</h3>
                <h3>Click on Download .csv</h3>
                <h3>The .csv file will land in your Downloads folder</h3>
              </div>
            </div>
      </Modal>
    </div>}
  
    {jsonData && (
        <FilterComponent
          jsonData={jsonData}
          fileMetadata={fileMetadata}
          jsonUserData={jsonUserData}
          fileUserMetadata={fileUserMetadata}
        />
      )}
  </div>
);
};

export default CSVToJSON;
