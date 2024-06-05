import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FilterValuesModel} from "../../models/filterValues";
import {FilterValuesService} from "../../service/filterValueService";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {FilterCriteriaDTO} from "../../models/FilterCriteriaDTO";
import {map, Observable} from "rxjs";
import {ValueFilteringService} from "../../service/valueFilteringService";


@Component({
  selector: 'app-values',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './values.component.html',
  styleUrl: './values.component.css'
})
export class ValuesComponent implements OnInit, OnChanges {
  @Input() selectedCriteria: FilterCriteriaDTO | null = null;
  @Input() reset: Observable<void>

  values$: Observable<FilterValuesModel[]>;
  filteredValues$: Observable<FilterValuesModel[]>;

  constructor(
    private filterValuesService: FilterValuesService,
    private filteringService: ValueFilteringService,
    private datePipe: DatePipe,
  ) {
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd.MM.yyyy') || '';
  }

  ngOnInit() {
    this.values$ = this.filterValuesService.getAllFilterValues();
    this.filteredValues$ = this.values$;
    this.reset.subscribe(() => {
      this.filteredValues$ = this.values$;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCriteria'] && this.values$) {
      this.filteredValues$ = this.values$.pipe(
        map(values => {
          return this.filteringService.applyFilters(values, this.selectedCriteria);
        })
      );
    }

  }

  deleteValue = (id: number): void => {
    if (confirm('Are you sure you want to delete this value?')) {
      this.filterValuesService.deleteValuesInApi(id).subscribe({
        next: () => {
          this.values$ = this.filterValuesService.getAllFilterValues();
          this.filteredValues$ = this.values$.pipe(
            map(values => this.filteringService.applyFilters(values, this.selectedCriteria))
          );
        },
        error: (error) => {
          console.error('Error deleting value:', error);
        }
      });
    }
  }
}
