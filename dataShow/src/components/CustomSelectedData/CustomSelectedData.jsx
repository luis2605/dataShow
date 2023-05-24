import React from 'react'
import { Button } from 'react-bootstrap'
import XLSX from 'xlsx/dist/xlsx.full.min.js';

const CustomSelectedData = ({onMultipleFilterData,onCustomSelectedData}) => {

 
  

  console.log(onMultipleFilterData)
 const handleTableExport =()=>{
 /*convert table content to json */
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

  /*Adding formulas to excel file */
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

const jsonData = JSON.stringify(updatedData, null, 2);

/* Create excel file */
let wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(updatedData, { header: headers });

XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
XLSX.writeFile(wb, 'TableToExcel.xlsx');

 }

 const handleRawDataExport=()=>{

  /*modify original array into one with usable properties */
  const modifiedArray = onMultipleFilterData.map((item) => {
    const { PublicData, publicData1, ...rest } = item; // Extract PublicData and publicData1
    return { ...rest, ...publicData1 }; // Merge remaining properties with publicData1
  });
  
  console.log(modifiedArray);

/* Create excel file */
let wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(modifiedArray);

XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
XLSX.writeFile(wb, 'RawDataToExcel.xlsx');
 }

 
  return (
    <div>
     <Button onClick={handleTableExport}>Export Table to Excel</Button>
     <Button onClick={handleRawDataExport}>Export raw Data to Excel</Button>
     <Button>Export Selection to Excel</Button>

    </div>
  )
}

export default CustomSelectedData