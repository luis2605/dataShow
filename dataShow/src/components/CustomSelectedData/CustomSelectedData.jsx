import React from 'react'
import { Button } from 'react-bootstrap'
import XLSX from 'xlsx/dist/xlsx.full.min.js';

const CustomSelectedData = ({onMultipleFilterData,onCustomSelectedData}) => {

 
  

  console.log(onMultipleFilterData)
 const handleFullExport =()=>{
 /*convert table content to json */
  const table = document.getElementById('yourTableId');
  const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());

  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const data = rows.map(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    return headers.reduce((rowData, header, index) => {
      rowData[header] = cells[index].textContent.trim();
      return rowData;
    }, {});
  });

  const jsonData = JSON.stringify(data, null, 2);

  console.log(jsonData)
/*created excel file */
let wb =XLSX.utils.book_new(),
ws = XLSX.utils.json_to_sheet(data, { header: headers });

XLSX.utils.book_append_sheet(wb,ws, "MySheet1");
XLSX.writeFile(wb,"MyExcel.xlsx")


 }
 
  return (
    <div>
     <Button onClick={handleFullExport}>Export Table to Excel</Button>
     <Button>Export Selection to Excel</Button>

    </div>
  )
}

export default CustomSelectedData