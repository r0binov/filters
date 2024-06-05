import {Injectable} from "@angular/core";
import {FilterValuesModel} from "../models/filterValues";
import {FilterCriteriaDTO} from "../models/FilterCriteriaDTO";
import {ComparisonType, CriteriaType} from "../models/filterCriteria";
import {DatePipe} from "@angular/common";

@Injectable()
export class ValueFilteringService {

  applyFilters(values: FilterValuesModel[], selectedCriteria: FilterCriteriaDTO | null): FilterValuesModel[] {
    if (!selectedCriteria) return values;

    let criteriaArray = Array.isArray(selectedCriteria) ? selectedCriteria : [selectedCriteria];

    return values.filter(value => criteriaArray.some(criteria => this.meetsCriteria(criteria, value)));
  }

  private meetsCriteria(criteria: FilterCriteriaDTO, value: FilterValuesModel): boolean {
    switch (criteria.type) {
      case CriteriaType.AMOUNT:
        return this.applyAmountFilter(criteria, value, Number(criteria.value));
      case CriteriaType.DATE:
        return this.applyDateFilter(criteria, value, criteria.value);
      case CriteriaType.TITLE:
        return this.applyTitleFilter(criteria, value, criteria.value);
      default:
        return false;
    }
  }

  private applyAmountFilter(criteria: FilterCriteriaDTO, value: FilterValuesModel, comparisonValue: number): boolean {
    return {
      [ComparisonType.MORE_THAN]: value.amount >= comparisonValue,
      [ComparisonType.LESS_THAN]: value.amount <= comparisonValue,
      [ComparisonType.EQUAL_TO]: value.amount === comparisonValue,
    }[criteria.comparisonType] || false;
  }

  private applyTitleFilter(criteria: FilterCriteriaDTO, value: FilterValuesModel, comparisonText: string): boolean {
    return {
      [ComparisonType.STARTS_WITH]: value.title.startsWith(comparisonText),
      [ComparisonType.ENDS_WITH]: value.title.endsWith(comparisonText),
      [ComparisonType.CONTAINS]: value.title.includes(comparisonText),
      [ComparisonType.EQUAL_TO]: value.title === comparisonText,
    }[criteria.comparisonType] || false;
  }

  private applyDateFilter(criteria: FilterCriteriaDTO, value: FilterValuesModel, comparisonDate: string): boolean {
    const valueDate = new Date(value.date).getTime();
    const comparisonDateObj = new Date(comparisonDate).getTime();

    return {
      [ComparisonType.FROM]: valueDate >= comparisonDateObj,
      [ComparisonType.TO]: valueDate <= comparisonDateObj,
      [ComparisonType.EQUAL_TO]: valueDate === comparisonDateObj,
    }[criteria.comparisonType] || false;
  }

}
