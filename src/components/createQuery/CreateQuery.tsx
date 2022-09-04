import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import { filters } from "./filters";
import { condition } from "../stepsManager";
import InputCondition from "../inputCondition";

type props = {
  dataType: string;
  species: string;
  fields: string;
  conditions: condition[];
  setConditions: Dispatch<SetStateAction<condition[]>>;
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

  // const handleShowConditionInput = () => {
  //   handleClose();
  // };

  // const saveCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setConditions([
  //     ...conditions,
  //     { id: event.target.id, value: event.target.value },
  //   ]);
  // };

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
        {showCustomConditionalInput && (
          <InputCondition
            handleShowConditionInput={() => handleShowCustomConditionInput}
            id="customCondition"
            label="Custom condition"
            defaultValue={customCondition}
            helperText={
              <>
                example: gene_id=554 AND gene_stable_id='ENSG00000210049' <br />
                [Make sure to wrap string data type with single quotes]
              </>
            }
            saveCondition={saveCustomCondition}
          />
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
                  <ListItem button divider>
                    <ListItemText primary={property["name"]} />
                  </ListItem>
                ) : (
                  <ListItem button>
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
          >
            <ListItemText primary={"Custom filter"} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};
export default CreateQuery;
