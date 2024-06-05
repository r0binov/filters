import {FilterCriteriaModel} from "./filterCriteria";

export class FilterModel {
  constructor(
    public id: number,
    public name: string,
    public criteria: FilterCriteriaModel[] | null
  ) {
  }
}
