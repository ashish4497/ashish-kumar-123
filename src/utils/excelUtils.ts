import * as XLSX from "xlsx";
import { FaTrash } from "react-icons/fa";
/**
 * Fetch and parse a local XLSX file.
 * @param filePath - Path to the XLSX file (inside `public/` folder).
 * @returns Promise resolving to JSON data.
 */
export const fetchAndReadExcelFile = async (filePath: string): Promise<any[]> => {
  try {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer(); // Convert to binary
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: "array" });

    // ✅ Read the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(sheet);
  } catch (error) {
    console.error("Error fetching XLSX file:", error);
    return [];
  }
};
 // Import delete icon

 export const processExcelDataForAgGrid = (data: any[]) => {
  if (!data || data.length === 0) {
    return { rowData: [], columnDefs: [] };
  }

  // Ensure Seq No. has a proper key
  const rowData = data.map((item) => {
    const { ["Seq No."]: _, ...rest } = item; // Remove "Seq No."
    return { seq_no: item["Seq No."], ...rest };
  });

  // Extract column headers dynamically
  const columnDefs = Object.keys(rowData[0]).map((key) => ({
    field: key,
    headerName: key.replace(/_/g, " "), // Format header names
    sortable: true,
    filter: true,
    flex: 1,
  }));

  return { rowData, columnDefs };
};



