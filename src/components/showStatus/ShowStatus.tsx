import { useLayoutEffect, useState } from "react";

import Alert, { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

type props = {
  queryID: string;
  error: any;
  setError: any;
  setFetchedQueryStatus: React.Dispatch<React.SetStateAction<string>>;
};

export interface statusResponse {
  status: string;
  result: string;
}

const alertSeverity = {
  QUEUED: "info",
  RUNNING: "info",
  SUCCEEDED: "success",
  FAILED: "error",
  CANCELLED: "error",
};

const ShowStatus = ({
  queryID,
  error,
  setError,
  setFetchedQueryStatus,
}: props) => {
  const [response, setResponse] = useState<statusResponse>({
    status: "",
    result: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setError(null);
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/query/${queryID}/status`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((result) => {
        setIsLoading(false);
        setResponse(result);
        setFetchedQueryStatus(result.status);
      })
      .catch((error) => {
        setIsLoading(false);
        try {
          error.json().then((err: any) => {
            setError(err["detail"]);
          });
        } catch (err) {
          setError(error);
        }
      });
  }, [queryID]);

  if (isLoading) {
    return (
      <div className="m-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-8">
        <Alert severity="error">
          {typeof error === "string"
            ? error
            : `Encountered some technical difficulties in fetching the status for
          query ID: ${queryID}, please try again later!`}
        </Alert>
      </div>
    );
  }

  return (
    <Card elevation={5} sx={{ m: 2, p: 4, minWidth: 350, maxWidth: 400 }}>
      <Alert severity={(alertSeverity as any)[response.status] as AlertColor}>
        Status: <b>{response.status}</b>
      </Alert>
      {response.status === "SUCCEEDED" && (
        <Button sx={{ mt: 3 }} variant="contained">
          <a href={response.result} target="_blank" rel="noopener noreferrer">
            Download [.csv]
          </a>
        </Button>
      )}
    </Card>
  );
};

export default ShowStatus;
