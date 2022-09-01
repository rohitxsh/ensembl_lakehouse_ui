import { Dispatch, SetStateAction, useState } from "react";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

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

  const gene_filters = {
    $id: "https://www.ensembl.org/lakehouse.gene.schema.json",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    description:
      "A representation of a gene held in Ensembl's lakehouse querying tool",
    type: "object",
    properties: {
      gene_id: {
        type: "int",
        minimum: 0,
        description: "Internal gene_id",
        lakehouse: {
          queriable: false,
          retreivable: false,
        },
      },
      gene_stable_id: {
        type: "string",
        description: "Gene stable identifier",
        lakehouse: {
          queriable: true,
          retreivable: true,
        },
      },
      gene_stable_id_version: {
        type: "int",
        description: "Gene stable identifier version",
        lakehouse: {
          queriable: true,
          retreivable: false,
        },
      },
      gene_chr: {
        type: "string",
        description: "Chromosome name gene is located on",
        lakehouse: {
          queriable: true,
          retreivable: true,
        },
      },
      gene_location: {
        type: "string",
        description: "Location of a gene formatted as chr:start-end",
        pattern: "^\\s+(?:\\d+-\\d+)?",
        lakehouse: {
          composite: true,
          composite_fields: ["gene_start", "gene_end"],
          queriable: true,
          retreivable: false,
        },
      },
      gene_start: {
        type: "int",
        minimum: 1,
        description: "Chromosome start coordinate (in 1-based coordinate)",
        lakehouse: {
          queriable: false,
          retreivable: true,
        },
      },
      gene_end: {
        type: "int",
        minimum: 1,
        description: "Chromosome end coordinate (in 1-based coordinate)",
        lakehouse: {
          queriable: false,
          retreivable: true,
        },
      },
      gene_biotype: {
        type: "string",
        description: "Gene type e.g. protein_coding",
        lakehouse: {
          queriable: true,
          retreivable: true,
        },
      },
      gene_symbol_id: {
        type: "string",
        description:
          "Symbol identifier assigned. Usually used as a more stable way of referring to a gene symbol.",
        lakehouse: {
          queriable: true,
          retreivable: true,
        },
      },
      gene_symbol: {
        type: "string",
        description: "Symbol assigned",
        lakehouse: {
          queriable: true,
          retreivable: true,
        },
      },
      canonical_transcript_stable_id: {
        type: "string",
        description: "Canonical transcript's stable identifier",
        lakehouse: {
          queriable: false,
          retreivable: true,
        },
      },
      canonical_transcript_stable_id_version: {
        type: "int",
        minimum: 0,
        description: "Canonical transcript's stable identifier version",
        lakehouse: {
          queriable: false,
          retreivable: true,
        },
      },
      canonical_transcript_biotype: {
        type: "string",
        minimum: 0,
        description: "Type of the canonical transcript e.g. protein_coding",
        lakehouse: {
          queriable: false,
          retreivable: true,
        },
      },
      species: {
        type: "string",
        description: "Species this data is linked to",
        lakehouse: {
          queriable: true,
          retreivable: true,
        },
      },
    },
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
        {showConditionInput ? (
          <div className="m-2">
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
                multiline
              />
            </div>
          </div>
        ) : (
          <div className="m-2">
            <Chip
              label={<b>+</b>}
              variant="outlined"
              onClick={handleShowConditionInput}
            />
          </div>
        )}
      </Card>
    </div>
  );
};
export default CreateQuery;
