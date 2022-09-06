import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import { filters } from "./filters";
import { ICondition } from "../stepsManager";
import InputCondition from "../inputCondition";

type props = {
  dataType: string;
  species: string;
  fields: string;
  conditions: ICondition;
  setConditions: Dispatch<SetStateAction<ICondition>>;
  customCondition: string;
  setCustomCondition: Dispatch<SetStateAction<string>>;
};

const CreateQuery = ({
  dataType,
  species,
  fields,
  conditions,
  setConditions,
  customCondition,
  setCustomCondition,
}: props) => {
  const [showCustomConditionalInput, setShowCustomConditionalInput] = useState(
    !!customCondition || false
  );

  const handleShowConditionInput =
    (id: string, property: any = {}) =>
    (event: any) => {
      if (id in conditions) {
        const { [id]: value, ...tempObj } = conditions;
        setConditions(tempObj);
      } else {
        setConditions({
          ...conditions,
          [id]: {
            property: property["name"],
            query: property["query"],
            inputs: property["input"],
            description: property["description"],
            values: {},
          },
        });
      }
      handleClose();
    };

  const saveCondition =
    (id: string, input: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let temp = { ...conditions };
      temp[id]["values"][input] = event.target.value;
      setConditions(temp);
    };

  const handleShowCustomConditionInput = () => {
    setCustomCondition("");
    setShowCustomConditionalInput(!showCustomConditionalInput);
    handleClose();
  };

  const saveCustomCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCondition(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    padding: 1,
    width: "100%",
    minWidth: 250,
    maxWidth: 500,
    bgcolor: "background.paper",
  };

  return (
    <div className="flex justify-center mt-5">
      <Card elevation={5}>
        <div className="flex flex-wrap gap-2.5 m-2">
          <div>
            <Chip label={"SELECT"} />
          </div>
          <div>
            <Tooltip title="Filters">
              <Chip label={fields || "*"} variant="outlined" />
            </Tooltip>
          </div>
          <div>
            <Chip label={"FROM"} />
          </div>
          <div>
            <Tooltip title="Datatype">
              <Chip label={dataType} variant="outlined" />
            </Tooltip>
          </div>
          <div>
            <Chip label={"WHERE"} />
          </div>
          <div>
            <Chip label={"species="} />
          </div>
          <div>
            <Tooltip title="Species">
              <Chip label={`'${species}'`} variant="outlined" />
            </Tooltip>
          </div>
        </div>
        {Object.keys(conditions).map((key) => {
          return (
            <InputCondition
              handleShowConditionInput={handleShowConditionInput}
              description={conditions[key].description}
              id={key}
              key={key}
              values={conditions[key].values}
              inputs={conditions[key].inputs}
              saveCondition={saveCondition}
            />
          );
        })}
        {showCustomConditionalInput && (
          <div className="m-2 p-2 border-2 rounded">
            <div>
              <Chip
                label={"AND"}
                onDelete={handleShowCustomConditionInput}
                variant="outlined"
              />
            </div>
            <div className="mt-4">
              <TextField
                id="customCondition"
                label="Custom condition"
                defaultValue={customCondition}
                helperText={
                  <>
                    example: gene_id=554 AND gene_stable_id='ENSG00000210049'{" "}
                    <br />
                    [Make sure to wrap string data type with single quotes]
                  </>
                }
                onChange={saveCustomCondition}
                multiline
              />
            </div>
          </div>
        )}
        <div className="m-2">
          <Chip label={<b>+</b>} variant="outlined" onClick={handleClickOpen} />
        </div>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <List sx={style} component="nav">
          {filters.map(
            (filter) =>
              filter["filter"] === dataType &&
              filter["properties"].map((property, index) =>
                index !== filters.length ? (
                  <ListItem
                    button
                    divider
                    onClick={handleShowConditionInput(uuidv4(), property)}
                    key={property["name"]}
                  >
                    <ListItemText primary={property["name"]} />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    onClick={handleShowConditionInput(uuidv4(), property)}
                    key={property["name"]}
                  >
                    <ListItemText primary={property["name"]} />
                  </ListItem>
                )
              )
          )}
          <Divider style={{ color: "darkgrey" }}> - - - </Divider>
          <ListItem
            button
            disabled={showCustomConditionalInput}
            onClick={handleShowCustomConditionInput}
            key={"customFilter"}
          >
            <ListItemText primary={"Custom filter"} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};
export default CreateQuery;
