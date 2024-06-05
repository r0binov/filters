import {FilterCriteriaDTO} from "./FilterCriteriaDTO";

export class FilterDTO {
  constructor(
    public name: string,
    public criteria: FilterCriteriaDTO[]
  ) {
  }

}
