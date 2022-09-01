import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

import { statusResponse } from "../exportQuery";

type props = {
  response: statusResponse;
  error: any;
  isLoading: boolean;
  queryID: string;
  fileFormat: string;
};

const alertSeverity = {
  ACCEPTED: "info",
  PROCESSING: "info",
  DONE: "success",
  "FAILED, you can try again after one minute interval!": "error",
};

const ExportStatus = ({
  response,
  error,
  isLoading,
  queryID,
  fileFormat,
}: props) => {
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
      {response.status === "ACCEPTED" ? (
        <Alert severity={(alertSeverity as any)[response.status] as AlertColor}>
          <AlertTitle>
            Status: <b>{response.status}</b>
          </AlertTitle>
          * Processing your request, try re-submitting your request in a few
          minutes.
        </Alert>
      ) : (
        <>
          <Alert
            severity={(alertSeverity as any)[response.status] as AlertColor}
          >
            Status: <b>{response.status}</b>
          </Alert>
        </>
      )}
      {response.status === "DONE" && (
        <Button sx={{ mt: 3 }} variant="contained">
          <a href={response.result} target="_blank" rel="noopener noreferrer">
            Download [.{fileFormat}]
          </a>
        </Button>
      )}
    </Card>
  );
};

export default ExportStatus;
