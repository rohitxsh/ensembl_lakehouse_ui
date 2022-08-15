import { Dispatch, SetStateAction, useState } from "react";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

type props = {
  dataType: string;
  species: string;
  fields: string;
  setCondition: Dispatch<SetStateAction<string>>;
};

const CreateQuery = ({ dataType, species, fields, setCondition }: props) => {
  const [showConditionInput, setShowConditionInput] = useState(false);

  const handleShowConditionInput = () => {
    setShowConditionInput(true);
  };

  const saveCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(event.target.value);
  };

  return (
    <div className="flex justify-center mt-5">
      <Card elevation={5}>
        <div className="flex flex-wrap gap-2.5 m-2">
          <div>
            <Chip label={"SELECT"} />
          </div>
          <div>
            <Chip label={fields || "*"} />
          </div>
          <div>
            <Chip label={"FROM"} />
          </div>
          <div>
            <Chip label={dataType} />
          </div>
          <div>
            <Chip label={"WHERE"} />
          </div>
          <div>
            <Chip label={`species = '${species}'`} />
          </div>
          {showConditionInput ? (
            <>
              <div>
                <Chip label={"AND"} />
              </div>
              <div className="mt-2">
                <TextField
                  id="condition"
                  label="Condition"
                  helperText={
                    <>
                      example: gene_id=554 AND gene_stable_id='ENSG00000210049'{" "}
                      <br />
                      [Make sure to wrap string data type with single quotes]
                    </>
                  }
                  onChange={saveCondition}
                />
              </div>
            </>
          ) : (
            <div className="ml-2">
              <Chip
                label={<b>+</b>}
                variant="outlined"
                onClick={handleShowConditionInput}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
export default CreateQuery;
