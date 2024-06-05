import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FilterModel} from "../../models/filter";
import {FilterService} from "../../service/filterService";
import {FormsModule} from "@angular/forms";
import {ComparisonType, CriteriaType} from "../../models/filterCriteria";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FilterDTO} from "../../models/FilterDTO";
import {ValuesComponent} from "../values/values.component";
import {FilterCriteriaDTO} from "../../models/FilterCriteriaDTO";
import {FilterCriteriaService} from "../../service/filterCriteriaService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterModalComponent} from "../filter-modal/filter-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ValuesComponent,
    AsyncPipe,
    FilterModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Output() filterApplied = new EventEmitter<FilterCriteriaDTO>();
  @Output() resetEvent = new EventEmitter<void>();
  @ViewChild('editCriteriaModal') editCriteriaModal: TemplateRef<any>;
  @ViewChild(FilterModalComponent) filterModalComponent!: FilterModalComponent;

  filters: FilterModel[] = [];
  newFilter = new FilterDTO('', [new FilterCriteriaDTO(CriteriaType.AMOUNT, ComparisonType.MORE_THAN, '')]);
  editFilter: FilterDTO | null = null;

  criteriaDeleted: boolean = false;
  criteriaAdded: boolean = false;
  isChecked: boolean = false;

  criteriaTypes = Object.keys(CriteriaType);

  constructor(private filterService: FilterService,
              private filterCriteriaService: FilterCriteriaService,
              private modalService: NgbModal,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadFilters();
    this.filterModalComponent.newFilterAdded.subscribe((newFilter) => {
      this.filters.push(newFilter);
    });
  }

  applyFilter(criteria: FilterCriteriaDTO): void {
    this.filterApplied.emit(criteria);
  }

  resetFilter(): void {
    this.newFilter = new FilterDTO('', [new FilterCriteriaDTO(CriteriaType.AMOUNT, ComparisonType.MORE_THAN, '')]);
    this.resetEvent.emit();
  }

  criteriaTypeValueToKey(value: string): CriteriaType {
    return CriteriaType[value as keyof typeof CriteriaType];
  }

  comparisonTypeValueToKey(value: string): ComparisonType {
    return ComparisonType[value as keyof typeof ComparisonType];
  }


  editSelectedFilter(filter: FilterModel): void {
    const criteriaArray = Object.keys(filter.criteria).map(key => filter.criteria[key]);
    this.editFilter = {
      name: filter.name,
      criteria: criteriaArray.map(data => ({...data}))
    };

    this.modalService.open(this.editCriteriaModal, {size: 'lg'});
  }

  addCriteriaToEditFilter(): void {
    if (this.editFilter) {
      this.editFilter.criteria.push(new FilterCriteriaDTO(
        this.criteriaTypeValueToKey('AMOUNT'),
        this.comparisonTypeValueToKey('MORE_THAN'),
        ''));
      this.criteriaAdded = true;
    }
  }

  deleteCriteriaFromEdit(index: number): void {
    if (this.editFilter && this.editFilter.criteria.length > 0) {
      const criteriaId = this.editFilter.criteria[index].id;
      if (criteriaId) {
        if (confirm('Are you sure you want to delete this value?')) {
          this.filterCriteriaService.deleteFilterInApi(criteriaId).subscribe({
            next: () => {
              this.editFilter.criteria.splice(index, 1);
              this.loadFilters();
              this.criteriaDeleted = true;
            },
            error: (error) => {
              console.error('Error deleting criteria:', error);
            }
          })
        }
      } else {
        this.editFilter.criteria.splice(index, 1);
        this.criteriaDeleted = true;
      }
    }
  }

  loadFilters(): void {
    this.filterService.getAllFilters().subscribe({
      next: value => {
        this.filters = value;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error loading filters:', error);
      }
    });
  }

  updateFilter(): void {
    if (this.editFilter) {
      const filterId = this.filters.find(filter => filter.name === this.editFilter.name)?.id;
      if (filterId) {
        this.filterService.updateFilter(filterId, this.editFilter).subscribe({
          next: () => {
            this.loadFilters();
          },
          error: (error) => {
            console.error('Error updating filter:', error);
          }
        });
      }
    }
  }

  onFilterUpdated(): void {
    this.loadFilters();
  }

  deleteFilter(id: number): void {
    if (confirm('Are you sure you want to delete this filter?')) {
      this.filterService.deleteFilter(id).subscribe({
        next: () => {
          this.loadFilters();
        },
        error: (error) => {
          console.error('Error deleting filter:', error);
        }
      });
    }
  }
}
