import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import DatatypeSelector from "../datatypeSelector";
import SpeciesSelector from "../speciesSelector";
import CreateQuery from "../createQuery";
import ShowFilters from "../showFilters";
import SubmitQuery from "../submitQuery";

import { filter } from "./interfaces";

const StepsManager = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [dataType, setDataType] = useState("");
  const [species, setSpecies] = useState("");
  const [fields, setFields] = useState("");
  const [condition, setCondition] = useState("");

  const [filters, setFilters] = useState<filter[]>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setDataType("");
    setSpecies("");
    setFields("");
    setCondition("");
    setFilters([]);
  };

  const steps = [
    {
      label: dataType ? `Data type: ${dataType}` : "Select data type",
      description: <DatatypeSelector value={dataType} setValue={setDataType} />,
      value: dataType,
    },
    {
      label: species ? `Species: ${species}` : "Select species",
      description: (
        <SpeciesSelector
          dataType={dataType}
          value={species}
          setValue={setSpecies}
          setFilters={setFilters}
        />
      ),
      value: species,
    },
    {
      label: "Build your query",
      description: (
        <>
          <CreateQuery
            dataType={dataType}
            species={species}
            fields={fields}
            setCondition={setCondition}
          />
          <div className="mb-5 mt-5">
            <ShowFilters data={filters} setFields={setFields} />
          </div>
        </>
      ),
      value: true,
    },
    {
      label: "Review your query",
      description: (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            {`SELECT ${
              fields || "*"
            } FROM ${dataType} WHERE species='${species}' ${
              condition && `AND ${condition}`
            };`}
          </Typography>
          <Button variant="contained" onClick={handleBack} sx={{ mt: 1 }}>
            Back
          </Button>
        </Paper>
      ),
      value: true,
    },
  ];

  return (
    <div className="flex justify-center m-5 mt-8">
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <div>
                    {index !== steps.length - 1 ? (
                      <Button
                        disabled={!step.value}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        disabled={!step.value}
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Submit query
                      </Button>
                    )}
                    {index !== 0 && index !== steps.length - 1 && (
                      <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        Back
                      </Button>
                    )}
                    {index === steps.length - 1 && (
                      <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <>
            <SubmitQuery
              dataType={dataType}
              species={species}
              fields={fields}
              condition={condition}
            />
            <Button
              onClick={handleReset}
              sx={{ mt: 1, ml: 2 }}
              variant="contained"
            >
              Reset
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default StepsManager;
