import React, { useState , useEffect, useRef  } from 'react';
import csvtojson from 'csvtojson';

import classes from "./csvToJson.module.css"


import '@fortawesome/fontawesome-free/css/all.min.css';

import CloseButton from 'react-bootstrap/CloseButton';

import FilterComponent from '../FilterComponent/FilterComponent';

const CSVToJSON = () => {
  const [jsonData, setJsonData] = useState(null);
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
  {!jsonData && <h1>Please select the CSV file to be read</h1>}
  <div>
  <input ref={inputFileRef}  type="file" accept=".csv" onChange={handleFileUpload} />
 <CloseButton  onClick={removeCsvFile}/>
  </div>

 <FilterComponent jsonData={jsonData} fileMetadata={fileMetadata}/>
  </div>
)
};

export default CSVToJSON;
