import { v4 as uuidv4 } from "uuid";

import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

import { ConditionValues } from "../stepsManager";

type props = {
  handleShowConditionInput: (
    id: string,
    property?: any
  ) => (event: any) => void;
  description: string;
  id: string;
  values: ConditionValues;
  inputs: string[];
  saveCondition: (
    id: string,
    input: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCondition = ({
  handleShowConditionInput,
  description,
  id,
  values,
  inputs,
  saveCondition,
}: props) => {
  return (
    <div className="m-3 mt-5 p-2 border-2 rounded">
      <div className="flex justify-between pl-1 pr-2">
        <div>
          <Chip
            label={"AND"}
            onDelete={handleShowConditionInput(id)}
            variant="outlined"
          />
        </div>
        <div>
          <Chip label={description} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {inputs.map((input) => (
          <TextField
            id={uuidv4()}
            label={input}
            defaultValue={input in values ? values[input] : ""}
            onChange={saveCondition(id, input)}
            multiline
            required
          />
        ))}
      </div>
    </div>
  );
};

export default InputCondition;
