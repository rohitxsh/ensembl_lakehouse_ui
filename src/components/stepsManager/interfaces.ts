export interface filter {
  Name: string;
  Type: string;
}

export interface ICondition {
  [id: string]: Condition;
}

interface Condition {
  property: string;
  values: ConditionValues;
  inputs: string[];
  query: string;
  description: string;
}

export interface ConditionValues {
  [key: string]: string;
}