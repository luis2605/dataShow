import React from 'react'
import { Button } from 'react-bootstrap'
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import classes from './customSelectedData.module.css' 
//translation
import { useTranslation } from 'react-i18next';
const CustomSelectedData = ({onMultipleFilterData,onCustomSelectedData, onUserName}) => {

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
  
  

  
  const handleTableExport = () => {
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
      const price = parseFloat(row['Price/Night']); // Assuming the column name is 'Price' in your data
      const commission = price * 0.15; // Calculate commission as 15% of price
      const priceWithCommission = price + commission;
   
      return {
        ...row,
        'Price + Commission': priceWithCommission.toFixed(2),
      };
    });
   // use a translation for the userName tag 
    const translatedUserName = t('Metadata.ReportCreatedBy');
    // Include onUserName prop as the first row
    const userNameRow = {
      [translatedUserName]: onUserName, // Modify this according to the actual key in your data
    
    };
  
  // Create excel file
let wb = XLSX.utils.book_new();
let ws = XLSX.utils.json_to_sheet(updatedData, { header: headers });

// Add userNameRow to the sheet at a specific position (for example, starting at A1)
const userNameRowData = [userNameRow]; // Wrap userNameRow in an array
XLSX.utils.sheet_add_json(ws, userNameRowData, { origin: { r: updatedData.length +2 , c: 1 } }); // Start at B2 (0-indexed)

XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
XLSX.writeFile(wb, 'TableToExcel.xlsx');

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
    const { PublicData, publicData1, ...rest } = item; // Extract PublicData and publicData1

    // Divide the PriceAmount by 100
    const priceAmount = parseFloat(item.PriceAmount) / 100;

    return { ...rest, ...publicData1, PriceAmount: priceAmount }; // Merge remaining properties with publicData1 and update PriceAmount
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

 
  return (
    <div className={classes["secondary-btn-container"]}>
     <Button id="step4" onClick={handleTableExport} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('customSelectedData.ExportTable')}</Button>
     <Button id="step5" onClick={handleRawDataExport} style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('customSelectedData.ExportRaw')}</Button>
  
     {onCustomSelectedData &&  onCustomSelectedData.length===0? "" : <Button onClick={handleSelectionExport}style={{ marginRight:'1em',background:"#1C7881", border:"none"  }}>{t('customSelectedData.ExportSelection')}</Button>}

    </div>
  )
}

export default CustomSelectedData