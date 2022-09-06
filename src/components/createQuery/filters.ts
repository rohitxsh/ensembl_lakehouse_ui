export const filters = [
  {
    filter: "gene",
    $id: "https://www.ensembl.org/lakehouse.gene.schema.json",
    $schema: "https://json-schema.org/draft/2020-12/schema",
    description:
      "A representation of a gene held in Ensembl's lakehouse querying tool",
    type: "object",
    properties: [
      {
        name: "gene_stable_id",
        description: "Gene stable identifier",
        input: ["gene_stable_id"],
        query: "gene_stable_id='{gene_stable_id}'",
      },
      {
        name: "gene_location",
        description: "Location of a gene formatted as chr:start-end",
        input: ["gene_chr", "start", "end"],
        query:
          "gene_chr='{gene_chr}' AND ((gene_start >= {start} AND gene_start <= {end}) OR (gene_end >= {start} AND gene_end <= {end}) OR (gene_start <= {end} AND gene_end >= {start}))",
      },
    ],
  },
];
