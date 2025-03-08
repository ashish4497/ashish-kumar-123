import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import {
  fetchAndReadExcelFile,
  processExcelDataForAgGrid,
} from "../utils/excelUtils";
// Register Required AG-Grid Modules
ModuleRegistry.registerModules([AllCommunityModule]);

const Stores = () => {
  const [rowData, setRowData] = useState([]);
  const [colmnData, setColumnData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const jsonData = await fetchAndReadExcelFile("/store.xlsx");
      // setData(jsonData);
      const { rowData, columnDefs } = processExcelDataForAgGrid(jsonData);
      console.log(rowData);
      setRowData(rowData);
      setColumnData(columnDefs);
    };

    loadData();
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div
        className="ag-theme-legacy"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact rowData={rowData} columnDefs={colmnData} theme="legacy" />
      </div>
    </div>
  );
};

export default Stores;
