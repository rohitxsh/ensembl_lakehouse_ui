import { Dispatch, SetStateAction } from "react";

import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useMemo } from "react";

import { filter } from "../stepsManager/interfaces";

type props = {
  data: filter[];
  setFields: Dispatch<SetStateAction<string>>;
};

const columns: GridColDef[] = [
  {
    field: "Name",
    headerName: "Filter",
    width: 130,
    sortable: false,
    valueGetter: (params: GridValueGetterParams) => `${params.row.Name}`,
  },
  {
    field: "Type",
    headerName: "Data type",
    width: 130,
    sortable: false,
  },
];

const ShowFilters = ({ data, setFields }: props) => {
  const availableFilters = useMemo(() => {
    return data.map((filter) => ({
      ...filter,
      id: filter["Name"],
    }));
  }, [data]);

  return (
    <Paper sx={{ width: "auto" }} elevation={4}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={availableFilters}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            setFields(ids.toString());
          }}
        />
      </div>
    </Paper>
  );
};
export default ShowFilters;
