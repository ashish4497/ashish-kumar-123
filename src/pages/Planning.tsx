import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { updateSalesUnits } from "../features/planningSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const weeks = ["W1", "W2", "W3", "W4"];
const months = [
  { name: "January", weeks: ["W1", "W2"] },
  { name: "February", weeks: ["W3", "W4"] },
];

const Planning = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores);
  const skus = useSelector((state: RootState) => state.skus);
  const planningData = useSelector((state: RootState) => state.planning);

  const getSalesUnits = (storeId: string, skuId: string, week: string) => {
    return (
      planningData.find(
        (p) => p.storeId === storeId && p.skuId === skuId && p.week === week
      )?.salesUnits || 0
    );
  };

  const onCellEdit = (params: any) => {
    dispatch(
      updateSalesUnits({
        storeId: params.data.storeId,
        skuId: params.data.skuId,
        week: params.colDef.field,
        salesUnits: parseInt(params.newValue, 10) || 0,
      })
    );
  };

  const rowData = stores.flatMap((store) =>
    skus.map((sku) => ({
      storeId: store.id,
      skuId: sku.id,
      storeName: store.name,
      skuName: sku.name,
      ...Object.fromEntries(
        weeks.map((week) => [week, getSalesUnits(store.id, sku.id, week)])
      ),
    }))
  );

  const columnDefs = [
    { field: "storeName", headerName: "Store", pinned: "left" },
    { field: "skuName", headerName: "SKU", pinned: "left" },
    ...months.flatMap((month) =>
      month.weeks.map((week) => ({
        field: week,
        headerName: `${week} (${month.name})`,
        editable: true,
        valueFormatter: (params) => params.value || "0",
      }))
    ),
    {
      headerName: "Sales $",
      valueGetter: (params) => {
        const sku = skus.find((s) => s.id === params.data.skuId);
        return sku
          ? (params.data.W1 +
              params.data.W2 +
              params.data.W3 +
              params.data.W4) *
              sku.price
          : 0;
      },
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: "GM $",
      valueGetter: (params) => {
        const sku = skus.find((s) => s.id === params.data.skuId);
        return sku
          ? params.getValue("Sales $") -
              (params.data.W1 +
                params.data.W2 +
                params.data.W3 +
                params.data.W4) *
                sku.cost
          : 0;
      },
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: "GM %",
      valueGetter: (params) => {
        const sales = params.getValue("Sales $");
        const gm = params.getValue("GM $");
        return sales > 0 ? (gm / sales) * 100 : 0;
      },
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
      cellStyle: (params) => {
        const value = params.value;
        if (value >= 40) return { backgroundColor: "#16A34A", color: "white" }; // Green
        if (value >= 10) return { backgroundColor: "#FACC15", color: "black" }; // Yellow
        if (value > 5) return { backgroundColor: "#FB923C", color: "white" }; // Orange
        return { backgroundColor: "#DC2626", color: "white" }; // Red
      },
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Planning</h2>
      <div className="overflow-auto border border-gray-300 rounded-lg">
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onCellValueChanged={onCellEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Planning;
