import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import ReviewQuery from "../reviewQuery";

import { filter, ICondition } from "./";

const StepsManager = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [dataType, setDataType] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [fields, setFields] = useState<string>("");
  const [conditions, setConditions] = useState<ICondition>({});
  const [customCondition, setCustomCondition] = useState<string>("");
  const [condition, setCondition] = useState<string>("");

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
    setConditions({});
    setCustomCondition("");
    setFilters([]);
  };

  const steps = [
    {
      label:
        dataType && species
          ? `Datatype: ${dataType}, Species: ${species}`
          : "Select datatype and species",
      description: (
        <>
          <DatatypeSelector value={dataType} setValue={setDataType} />
          {dataType && (
            <SpeciesSelector
              dataType={dataType}
              value={species}
              setValue={setSpecies}
              setFilters={setFilters}
              goNext={() => handleNext()}
            />
          )}
        </>
      ),
      value: dataType && species,
    },
    {
      label: "Build your query",
      description: (
        <>
          <CreateQuery
            dataType={dataType}
            species={species}
            fields={fields}
            conditions={conditions}
            setConditions={setConditions}
            customCondition={customCondition}
            setCustomCondition={setCustomCondition}
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
        <ReviewQuery
          dataType={dataType}
          species={species}
          fields={fields}
          conditions={conditions}
          customCondition={customCondition}
          condition={condition}
          setCondition={setCondition}
          handleBack={handleBack}
        />
      ),
      value: true,
    },
  ];

  return (
    <div className="flex justify-center m-5 mt-8">
      <Box sx={{ maxWidth: 1500, minWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <div>
                    {index !== steps.length - 1 ? (
                      index === 1 && (
                        <Button
                          disabled={!step.value}
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                      )
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
              variant="outlined"
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
