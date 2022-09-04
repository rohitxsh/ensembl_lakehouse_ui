import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { condition } from "../stepsManager";

type props = {
  dataType: string;
  species: string;
  fields: string;
  conditions: condition[];
  customCondition: string;
  handleBack: () => void;
};

const ReviewQuery = ({
  dataType,
  species,
  fields,
  conditions,
  customCondition,
  handleBack,
}: props) => {
  return (
    <Paper square elevation={0} sx={{ p: 3 }}>
      <Typography>
        {`SELECT ${fields || "*"} FROM ${dataType} WHERE species='${species}' ${
          customCondition && `AND ${customCondition}`
        };`}
      </Typography>
      <Button variant="contained" onClick={handleBack} sx={{ mt: 1 }}>
        Back
      </Button>
    </Paper>
  );
};
export default ReviewQuery;
