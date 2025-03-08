import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { RootState } from "../store";
import { addSKU, removeSKU, updateSKU } from "../features/skuSlice";
import { FaTrash } from "react-icons/fa";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SKUs = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus);
  const [skuName, setSkuName] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");

  const addNewSKU = () => {
    if (skuName && price && cost) {
      dispatch(
        addSKU({
          id: Date.now().toString(),
          name: skuName,
          price: parseFloat(price),
          cost: parseFloat(cost),
        })
      );
      setSkuName("");
      setPrice("");
      setCost("");
    }
  };

  const columnDefs = [
    { field: "name", headerName: "SKU Name", editable: true },
    {
      field: "price",
      headerName: "Price",
      editable: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "cost",
      headerName: "Cost",
      editable: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        // <button className="">
        <FaTrash
          className="text-red-500"
          size={20}
          onClick={() => dispatch(removeSKU(params.data.id))}
        />
        // </button>
      ),
    },
  ];

  const onCellEdit = (params: any) => {
    dispatch(
      updateSKU({ ...params.data, [params.colDef.field]: params.newValue })
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">SKU Management</h2>
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex space-x-3">
        <input
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="SKU Name"
          value={skuName}
          onChange={(e) => setSkuName(e.target.value)}
        />
        <input
          className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          onClick={addNewSKU}
        >
          Add SKU
        </button>
      </div>

      {/* AG-Grid Table */}
      <div
        className="ag-theme-alpine rounded-lg shadow-md"
        style={{ height: 450, width: "100%" }}
      >
        <AgGridReact
          rowData={skus}
          columnDefs={columnDefs}
          onCellValueChanged={onCellEdit}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
            sortable: true,
            filter: true,
          }}
        />
      </div>
    </div>
  );
};

export default SKUs;
