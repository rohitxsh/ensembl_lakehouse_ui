import { useLayoutEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";


type props = {
  queryID: string;
};

type previewResponse = {
  Rows: { Data: { VarCharValue: string }[] }[];
};

const ShowPreview = ({ queryID }: props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<previewResponse>();

  useLayoutEffect(() => {
    setError(null);
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/query/${queryID}/preview`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then((result) => {
        setIsLoading(false);
        setResponse(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
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
          Encountered some technical difficulties in loading the result preview,
          please try again later!
        </Alert>
      </div>
    );
  }

  return (
    <Card elevation={5} sx={{ m: 1, p: 4, minWidth: 350, maxWidth: 1000 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {response &&
                    response.Rows[0].Data.map((columns) => {
                      return <TableCell>{columns.VarCharValue}</TableCell>;
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {response &&
                  response.Rows.slice(1).map((row) => (
                    <TableRow
                      key={row.Data[0].VarCharValue}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {row.Data.map((rowData) => {
                        return (
                          <TableCell component="th" scope="row">
                            {rowData.VarCharValue}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default ShowPreview;
