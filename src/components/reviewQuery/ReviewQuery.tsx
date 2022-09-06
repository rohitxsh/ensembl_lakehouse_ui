import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { ICondition } from "../stepsManager";

type props = {
  dataType: string;
  species: string;
  fields: string;
  conditions: ICondition;
  customCondition: string;
  condition: string;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
  handleBack: () => void;
};

const ReviewQuery = ({
  dataType,
  species,
  fields,
  conditions,
  customCondition,
  condition,
  setCondition,
  handleBack,
}: props) => {
  let formattedCondition = "";

  if (customCondition) {
    formattedCondition += customCondition;
  }

  for (var key of Object.keys(conditions)) {
    let formattedQuery = conditions[key]["query"];
    for (const input of conditions[key]["inputs"]) {
      formattedQuery = formattedQuery.replaceAll(
        `{${input}}`,
        conditions[key]["values"][input]
      );
    }
    formattedCondition += formattedCondition
      ? " AND " + formattedQuery
      : formattedQuery;
  }
  setCondition(formattedCondition);

  return (
    <Paper square elevation={0} sx={{ p: 3 }}>
      <Typography>
        {`SELECT ${fields || "*"} FROM ${dataType} WHERE species='${species}' ${
          condition && `AND ${condition}`
        };`}
      </Typography>
      <Button variant="contained" onClick={handleBack} sx={{ mt: 1 }}>
        Back
      </Button>
    </Paper>
  );
};
export default ReviewQuery;
