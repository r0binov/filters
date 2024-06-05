import {Component, EventEmitter, Output, TemplateRef} from '@angular/core';
import {FilterCriteriaDTO} from "../../models/FilterCriteriaDTO";
import {ComparisonType, CriteriaType} from "../../models/filterCriteria";
import {FilterDTO} from "../../models/FilterDTO";
import {FilterModel} from "../../models/filter";
import {FilterService} from "../../service/filterService";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {

  @Output() filterAdded = new EventEmitter<void>();
  @Output() newFilterAdded = new EventEmitter<FilterModel>();

  constructor(private filterService: FilterService,
              private modalService: NgbModal) {
  }

  filters: FilterModel[] = [];
  newFilter = new FilterDTO('', [new FilterCriteriaDTO(CriteriaType.AMOUNT, ComparisonType.MORE_THAN, '')]);

  criteriaTypes = Object.keys(CriteriaType);

  addCriteriaRowForPost(): void {
    this.newFilter.criteria.push(new FilterCriteriaDTO(CriteriaType.AMOUNT, ComparisonType.MORE_THAN, ''));
  }

  openAddModal(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true});
  }

  loadFilters(): void {
    this.filterService.getAllFilters().subscribe({
      next: value => {
        this.filters = value;
      },
      error: (error) => {
        console.error('Error loading filters:', error);
      }
    });
  }

  deleteCriteriaFromAdd(index: number): void {
    if (this.newFilter && this.newFilter.criteria.length > 0) {
      this.newFilter.criteria.splice(index, 1);
    }
  }

  createNewFilter(): void {
    this.filterService.createFilter(this.newFilter).subscribe({
      next: (newFilter) => {
        this.loadFilters();
        this.resetForm();
        this.newFilterAdded.emit(newFilter);
      },
      error: (error) => {
        console.error('Error creating filter:', error);
      }
    });
  }

  resetForm(): void {
    this.newFilter = new FilterDTO('', [new FilterCriteriaDTO(CriteriaType.AMOUNT, ComparisonType.MORE_THAN, '')]);
  }
}
