import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { filter } from "../stepsManager";

type props = {
  dataType: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<filter[]>>;
  goNext: () => void;
};

const SpeciesSelector = ({
  dataType,
  value,
  setValue,
  setFilters,
  goNext,
}: props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    goNext();
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/filters/${dataType}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      })
      .then((result) => {
        setIsLoading(false);
        setItems(result["species"]);
        setFilters(result["columns"]);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [dataType]);

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
    <div className="m-2 ml-0">
      <FormControl sx={{ m: 1, minWidth: 240, maxWidth: 500 }}>
        <InputLabel id="species-select-label">
          {"species" ? "Species" : "Select species"}
        </InputLabel>
        <Select
          labelId="species-select-label"
          id="species-select"
          value={value}
          label="Species"
          onChange={handleChange}
        >
          {items.map((item: string) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SpeciesSelector;
