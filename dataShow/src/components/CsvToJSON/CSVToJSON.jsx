import React, { useState , useEffect, useRef  } from 'react';
import csvtojson from 'csvtojson';

import classes from "./csvToJson.module.css"


import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../../assets/img/logo_tuerkis_schrift-04.png"
import logoText from "../../assets/img/logo_tuerkis_schrift-02.png"

import sharetribe from "../../assets/img/tutorial/0.png"

import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

import FilterComponent from '../FilterComponent/FilterComponent';
import Modal from '../Modal/Modal.jsx';

const CSVToJSON = () => {
  const [jsonData, setJsonData] = useState(null);
  const [openHelpInitial,setOpenHelpInitial]=useState(false)


  const openHelpInitialModal = () => {
    setOpenHelpInitial(true);
  };
 
  const closeHelpInitialModal = () => {
    setOpenHelpInitial(false);
  };

 /* csv file metadata */
 const [fileMetadata, setFileMetadata] = useState(null);
 const inputFileRef = useRef(null); // Ref for the input element




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

const removeCsvFile =()=>{
   setJsonData(null);
    setFileMetadata(null);
    inputFileRef.current.value = null; // Reset the input value
}

return(
  <div className={!jsonData? ` ${classes["centered"]}` : ""}>
  {!jsonData &&  <div className={classes["logo-title"]}>
    <img className={classes["logo"]} src={logo}></img>
    <h1>Please select the CSV file to be read</h1></div>}
  <div className={classes["topBar-container"]}>
  {jsonData && <img className={classes["logoText"]} src={ logoText}></img>}
    <div className={classes["input-container"]}>
    <input ref={inputFileRef}  type="file" accept=".csv" onChange={handleFileUpload} />
  <div className={classes["btn-container"]}>
  <Button onClick={removeCsvFile} style={{ margin:'0 1em',background:"#1C7881", border:"none" }}><i className="fas fa-trash" style={{ fontSize: '16px', color: 'white'  }}></i></Button>

{!jsonData && <Button    onClick={openHelpInitialModal} style={{ margin:'0 1em',background:"#1C7881", border:"none"  }}>  <i className="fas fa-question-circle" style={{ fontSize: '16px', color: 'white' }}></i></Button>}
  </div>
 
 <Modal isOpen={openHelpInitial} onClose={closeHelpInitialModal}>
        <h2 >How to get the CSV file from Sharetribe Flex Console ? </h2>
       <div className={classes["help-container"]}>
        <img className={classes["help-container-img"]} src={sharetribe}></img>
        <div>
        <h3>Please log in on you Sharetribe Flex Console Account</h3>
        <h3>Go to Listings</h3>
        <h3>Click on Download .csv</h3>
        <h3>The .csv file will land on your Downloads usual folder</h3>
        </div>
      
       </div>
       
      </Modal>
   
    </div>

  </div>

 <FilterComponent jsonData={jsonData} fileMetadata={fileMetadata}/>
  </div>
)
};

export default CSVToJSON;
