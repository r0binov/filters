import {FilterModel} from "./filter";

export enum CriteriaType {
  AMOUNT = "AMOUNT", TITLE = "TITLE", DATE = "DATE"
}

export enum ComparisonType {
  MORE_THAN = "MORE_THAN", LESS_THAN = "LESS_THAN",
  EQUAL_TO = "EQUAL_TO", FROM = "FROM",
  TO = "TO", STARTS_WITH = "STARTS_WITH", ENDS_WITH = "ENDS WITH",
  CONTAINS = "CONTAINS"
}

export class FilterCriteriaModel {
  constructor(
    public id: number,
    public type: CriteriaType,
    public comparisonType: ComparisonType,
    public value: string,
    public filter: FilterModel
  ) {
  }
}
