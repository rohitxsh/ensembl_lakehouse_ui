import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const DatatypeSelector = ({ value, setValue }: props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/data_types`)
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
          Encountered some technical difficulties, please try again later!
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="m-2 ml-0">
        <FormControl sx={{ m: 1, minWidth: 240, maxWidth: 500 }}>
          <InputLabel id="data-type-select-label">Datatype</InputLabel>
          <Select
            labelId="data-type-select-label"
            id="data-type-select"
            value={value}
            label="Data type"
            onChange={handleChange}
          >
            {items.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};
export default DatatypeSelector;
