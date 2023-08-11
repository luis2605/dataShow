import React from 'react'
import { Button } from 'react-bootstrap'
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import classes from './customSelectedData.module.css' 
//translation
import { useTranslation } from 'react-i18next';
const CustomSelectedData = ({onMultipleFilterData,onCustomSelectedData, onUserName,onAmountProjects}) => {

  const { t } = useTranslation();
  /*this is used to extract the arrays of data inside the main data */
  const convertArraysToStrings = (array) => {
    return array.map((object) => {
      const convertedObject = {};
      for (let key in object) {
        if (Array.isArray(object[key])) {
          convertedObject[key] = JSON.stringify(object[key]);
        } else {
          convertedObject[key] = object[key];
        }
      }
      return convertedObject;
    });
  };
  
  


  
 const handleRawDataExport = () => {
  /*modify original array into one with usable properties */
  const modifiedArray = onMultipleFilterData.map((item) => {
    const { PublicData, publicData1, ...rest } = item; // Extract PublicData and publicData1

    // Divide the PriceAmount by 100
    const priceAmount = parseFloat(item.PriceAmount) / 100;

    return { ...rest, ...publicData1, PriceAmount: priceAmount }; // Merge remaining properties with publicData1 and update PriceAmount
  });

  /* this function extract all properties like food:[a,b,c] as strings to the main array  */
  const convertedData = convertArraysToStrings(modifiedArray);

  /* Create excel file */
  let wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(convertedData);

  XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
  XLSX.writeFile(wb, 'RawDataToExcel.xlsx');
};


 const handleSelectionExport = () => {
  /*modify original array into one with usable properties */
  const modifiedArray = onCustomSelectedData.map((item) => {
   
    let parsedHasVideo = "";

    // Check if the "video" key has a value of "ja "
    console.log("Original hasVideoOnSocialbnb:", item.hasVideoOnSocialbnb);
    console.log("parsedHasVideo before:", parsedHasVideo);
    
    if (item.hasVideoOnSocialbnb.includes("video\":\"ja")) {
      // Update the "video" value to "Ja"
      parsedHasVideo = "ja";
    } else {
      // Update the "video" value to "nein"
      parsedHasVideo = "nein";
    }
    console.log("parsedHasVideo after:", parsedHasVideo);
    // Convert the updated object back to JSON string
    // const updatedHasVideo = JSON.stringify(parsedHasVideo);
    const { PublicData, publicData1, ...rest } = item;
    const updatedItem = {
      ...rest,
      hasVideoOnSocialbnb: parsedHasVideo,
      ...publicData1,
      PriceAmount: parseFloat(item.PriceAmount) / 100
    };
  
    return updatedItem;
  });
// use a translation for the userName tag 
const translatedUserName = t('Metadata.ReportCreatedBy');
// Include onUserName prop as the first row
const userNameRow = {
  [translatedUserName]: onUserName, // Modify this according to the actual key in your data

};
  /* this function extract all properties like food:[a,b,c] as strings to the main array  */
  const convertedData = convertArraysToStrings(modifiedArray);

  /* Create excel file */
  let wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(convertedData);
  // Add userNameRow to the sheet at a specific position (for example, starting at A1)
const userNameRowData = [userNameRow]; // Wrap userNameRow in an array
XLSX.utils.sheet_add_json(ws, userNameRowData, { origin: { r: convertedData.length +2 , c: 1 } }); // Start at B2 (0-indexed)


  XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
  XLSX.writeFile(wb, 'SelectedDataToExcel.xlsx');
};

  
const handleTableExport = () => {
  console.log(onMultipleFilterData)

  /* Convert table content to json */
  const table = document.getElementById('filteredTable');
  const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());

  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const data = rows.map(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    return headers.reduce((rowData, header, index) => {
      rowData[header] = cells[index].textContent.trim();
      return rowData;
    }, {});
  });

  /* Add formula to calculate 'Price + Commission' */
  const updatedData = data.map((row) => {
    const currency = row.PriceCurrency === "Dollar" ? "Euro" : "USD";
      
    const price = parseFloat(row['Price/Night']);
    const commission = price * 0.15;
    const priceWithCommission = price + commission;
      
    const formattedRow = {
      ...row,
      'Price + Commission': priceWithCommission.toFixed(2),
    };
      
    // Format nested JSON strings like 'actividades_nuevas'
    const nestedKeysToFormat = ['actividades_nuevas', 'hasVideoOnSocialbnb'];
    nestedKeysToFormat.forEach((key) => {
      if (formattedRow[key]) {
        const nestedObject = JSON.parse(formattedRow[key]);
        const nestedKeys = Object.keys(nestedObject);
        formattedRow[key] = nestedKeys.map(nestedKey => `${nestedKey}: ${nestedObject[nestedKey]}`).join(', ');
      }
    });
      
    // Extract and format individual activities from "Extra Activities"
    if (formattedRow['Extra Activities']) {
      const extraActivities = formattedRow['Extra Activities'].split(currency);
      formattedRow['Extra Activities'] = extraActivities
        .filter(activity => activity.trim() !== '') // Exclude empty entries
        .map(activity => `${activity}${currency}`)
        .join('\n');
      console.log(row);
    }
        
    return formattedRow;
  });
  
  
 // use a translation for the userName tag 
  const translatedUserName = t('Metadata.ReportCreatedBy');
  const projects = t('Metadata.AmountProjects')
  // Include onUserName prop as the first row
  const userNameRow = {
    [translatedUserName]: onUserName, // Modify this according to the actual key in your data
  
  };
  const projectAmountRow = {
    [projects]: onAmountProjects, // Modify this according to the actual key in your data
  
  };

// Create excel file
let wb = XLSX.utils.book_new();
let ws = XLSX.utils.json_to_sheet(updatedData, { header: headers });

// Add userNameRow to the sheet at a specific position (for example, starting at A1)
const userNameRowData = [userNameRow]; // Wrap userNameRow in an array
XLSX.utils.sheet_add_json(ws, userNameRowData, { origin: { r: updatedData.length +2 , c: 1 } }); // Start at B2 (0-indexed)
const amounProjectsData = [projectAmountRow]; // Wrap userNameRow in an array
XLSX.utils.sheet_add_json(ws, amounProjectsData, { origin: { r: updatedData.length +4 , c: 1 } }); // Start at B2 (0-indexed)

XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
XLSX.writeFile(wb, 'TableToExcel.xlsx');

}; 
  return (
    <div className={classes["secondary-btn-container"]}>
     <Button id="step4" onClick={handleTableExport} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('customSelectedData.ExportTable')}</Button>
     <Button id="step5" onClick={handleRawDataExport} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('customSelectedData.ExportRaw')}</Button>
  
     {onCustomSelectedData &&  onCustomSelectedData.length===0? "" : <Button onClick={handleSelectionExport}style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('customSelectedData.ExportSelection')}</Button>}

    </div>
  )
}

export default CustomSelectedData