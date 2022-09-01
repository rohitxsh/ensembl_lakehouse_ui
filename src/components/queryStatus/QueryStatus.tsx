import { useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import ShowStatus from "../showStatus";
import ShowPreview from "../showPreview";

const QueryStatus = () => {
  const [temp, setTemp] = useState(localStorage.getItem("queryID"));
  const [queryID, setQueryID] = useState(localStorage.getItem("queryID"));
  const [showQueryStatus, setShowQueryStatus] = useState(false);
  const [statusFetchError, setStatusFetchError] = useState(null);
  const [fetchedQueryStatus, setFetchedQueryStatus] = useState("");

  return (
    <div className="flex flex-col items-center mt-10">
      <Card elevation={5} sx={{ m: 2, p: 4, minWidth: 420 }}>
        <div className="flex flex-col">
          <div>
            <TextField
              required
              id="query-id"
              label="Query ID"
              variant="outlined"
              defaultValue={localStorage.getItem("queryID")}
              onChange={(event) => setTemp(event.target.value)}
              sx={{ minWidth: 350 }}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                setQueryID(temp);
                setShowQueryStatus(true);
              }}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
      {showQueryStatus && queryID && (
        <>
          <ShowStatus
            queryID={queryID}
            error={statusFetchError}
            setError={setStatusFetchError}
            setFetchedQueryStatus={setFetchedQueryStatus}
          />
          {!statusFetchError && fetchedQueryStatus === "SUCCEEDED" && (
            <ShowPreview queryID={queryID} />
          )}
        </>
      )}
    </div>
  );
};

export default QueryStatus;
