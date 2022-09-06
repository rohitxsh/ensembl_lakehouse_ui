import { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { statusResponse } from "./";
import ExportStatus from "../exportStatus";

const ExportQuery = () => {
  const [queryID, setQueryID] = useState(localStorage.getItem("queryID"));
  const [fileFormat, setFileFormat] = useState("csv");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const [exportError, setExportError] = useState(null);
  const [exportIsLoading, setExportIsLoading] = useState(false);
  const [response, setResponse] = useState<statusResponse>();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/result_file_formats`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then((result) => {
        setIsLoading(false);
        setItems(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setFileFormat(event.target.value as string);
  };

  const fetchExportStatus = () => {
    let url = new URL(
      `${process.env.REACT_APP_BACKEND}/query/${queryID}/export`
    );
    url.searchParams.append("file_format", fileFormat);
    setExportIsLoading(true);
    setExportError(null);
    fetch(url.toString())
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((result) => {
        setExportIsLoading(false);
        setResponse(result);
      })
      .catch((error) => {
        setExportIsLoading(false);
        try {
          error.json().then((err: any) => {
            setExportError(err["detail"]);
          });
        } catch (err) {
          setExportError(error);
        }
      });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center mt-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Alert severity="error">
          Encountered some technical difficulties while fetching available
          custom file formats for export, please try again after some time!
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <Card elevation={5} sx={{ m: 2, p: 4, minWidth: 350, maxWidth: 400 }}>
        <div className="flex flex-col">
          <div>
            <TextField
              required
              id="query-id"
              label="Query ID"
              variant="outlined"
              defaultValue={localStorage.getItem("queryID")}
              onChange={(event) => setQueryID(event.target.value)}
              sx={{ minWidth: 350 }}
            />
          </div>
          <div>
            <FormControl sx={{ mt: 2, minWidth: 120, maxWidth: 200 }}>
              <InputLabel id="file-format-select-label">File format</InputLabel>
              <Select
                labelId="file-format-select-label"
                id="file-format-select"
                value={fileFormat}
                label="File format"
                onChange={handleChange}
              >
                {items.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button
              onClick={fetchExportStatus}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
      {(response || exportError || exportIsLoading) && (
        <>
          <ExportStatus
            response={response || { status: "", result: "" }}
            error={exportError}
            isLoading={exportIsLoading}
            queryID={queryID || ""}
            fileFormat={fileFormat}
          />
        </>
      )}
    </div>
  );
};

export default ExportQuery;
