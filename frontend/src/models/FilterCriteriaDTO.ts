import {ComparisonType, CriteriaType} from "./filterCriteria";

export class FilterCriteriaDTO {
  constructor(
    public type: CriteriaType,
    public comparisonType: ComparisonType,
    public value: string,
    public id?: number,
  ) {}
}
