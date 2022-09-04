import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

type props = {
  handleShowConditionInput: any;
  id: string;
  label: string;
  defaultValue: string;
  helperText: JSX.Element;
  saveCondition: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputCondition = ({
  handleShowConditionInput,
  id,
  label,
  defaultValue,
  helperText,
  saveCondition,
}: props) => {
  return (
    <div className="m-2 p-2 border-2 rounded">
      <div>
        <Chip
          label={"AND"}
          onClick={handleShowConditionInput}
          variant="outlined"
        />
      </div>
      <div className="mt-4">
        <TextField
          id={id}
          label={label}
          defaultValue={defaultValue}
          helperText={helperText}
          onChange={saveCondition}
          multiline
        />
      </div>
    </div>
  );
};
export default InputCondition;
