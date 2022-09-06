import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type props = {
  dataType: string;
  species: string;
  fields: string;
  condition: string;
};

type response = {
  query_id: string;
  _links: any;
};

const SubmitQuery = ({ dataType, species, fields, condition }: props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<response>({
    query_id: "",
    _links: [],
  });

  useEffect(() => {
    let url = new URL(
      `${process.env.REACT_APP_BACKEND}/query/${dataType}/${species}`
    );
    if (fields) {
      url.searchParams.append("fields", fields);
    }

    if (condition) {
      url.searchParams.append("condition", condition);
    }

    setIsLoading(true);
    fetch(url.toString())
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then((result) => {
        setIsLoading(false);
        setItems(result);
        localStorage.setItem("queryID", result.query_id);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="m-4">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-4">
        <Alert severity="error">
          {error === "Internal Server Error"
            ? "Encountered some error, please re-verify your query and try again!"
            : "Encountered some technical difficulties, please try again later!"}
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="m-5">
        <Alert severity="success" variant="filled">
          <AlertTitle>Query ID:</AlertTitle>
          {items.query_id}
        </Alert>
        <Alert severity="info" className="mt-2" variant="outlined">
          Make sure to save the <b>query ID</b> to check status and export
          result to different file formats.
        </Alert>
      </div>
      <Button sx={{ mt: 1, ml: 2 }} variant="contained">
        <Link to="/status">Check query status</Link>
      </Button>
    </>
  );
};
export default SubmitQuery;
