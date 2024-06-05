import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FilterValuesModel} from "../models/filterValues";

@Injectable()
export class FilterValuesService {
  private apiUrl = "http://localhost:8080/api/values"

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });

  constructor(private http: HttpClient) {
  }

  getAllFilterValues() {
    return this.http.get<FilterValuesModel[]>(this.apiUrl + "/")
  }

  postValuesToApi = (filterValuesModel: FilterValuesModel) => {
    return this.http.post<FilterValuesModel[]>(this.apiUrl + "/addValue", filterValuesModel, {headers: this.headers})
  }

  updateValuesInApi = (filterValuesModel: FilterValuesModel) => {
    return this.http.put((this.apiUrl + "/updateValue"), filterValuesModel, {headers: this.headers});
  }

  deleteValuesInApi = (id: number) => {
    return this.http.put((this.apiUrl + `/deleteValue/${id}`), {headers: this.headers})
  }
}
