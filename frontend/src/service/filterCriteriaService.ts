import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FilterCriteriaModel} from "../models/filterCriteria";
import {Observable} from "rxjs";
import {FilterCriteriaDTO} from "../models/FilterCriteriaDTO";

@Injectable()
export class FilterCriteriaService {
  private apiUrl = "http://localhost:8080/api/criteria";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });

  constructor(private http: HttpClient) {
  }

  getAllFilterCriteria(): Observable<FilterCriteriaModel[]> {
    return this.http.get<FilterCriteriaModel[]>(this.apiUrl);
  }

  postFilterToApi(filterCriteria: FilterCriteriaDTO): Observable<FilterCriteriaModel> {
    return this.http.post<FilterCriteriaModel>(`${this.apiUrl}/addCriteria`, filterCriteria, {headers: this.headers});
  }

  updateFilterInApi(filterCriteria: FilterCriteriaDTO): Observable<FilterCriteriaModel> {
    return this.http.put<FilterCriteriaModel>(`${this.apiUrl}/updateCriteria/${filterCriteria.id}`, filterCriteria, {headers: this.headers});
  }

  deleteFilterInApi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteCriteria/${id}`);
  }
}
