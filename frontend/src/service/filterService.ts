import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilterDTO} from "../models/FilterDTO";
import {FilterModel} from "../models/filter";
import {FilterCriteriaDTO} from "../models/FilterCriteriaDTO";

@Injectable()
export class FilterService {
  private apiUrl = "http://localhost:8080/api/filter";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });

  constructor(private http: HttpClient) {
  }

  getAllFilters(): Observable<FilterModel[]> {
    return this.http.get<FilterModel[]>(`${this.apiUrl}/`);
  }

  getFilterById(id: number): Observable<FilterModel> {
    return this.http.get<FilterModel>(`${this.apiUrl}/${id}`);
  }

  createFilter(filterDTO: FilterDTO): Observable<FilterModel> {
    return this.http.post<FilterModel>(`${this.apiUrl}/addFilter`, filterDTO);
  }

  updateFilter(id: number, filterDTO: FilterDTO): Observable<FilterModel> {
    return this.http.put<FilterModel>(`${this.apiUrl}/updateFilter/${id}`, filterDTO);
  }

  deleteFilter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteFilter/${id}`);
  }
}
