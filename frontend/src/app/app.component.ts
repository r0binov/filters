import {Component, Injectable} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {FilterCriteriaService} from "../service/filterCriteriaService";
import {FilterValuesService} from "../service/filterValueService";
import {DatePipe} from "@angular/common";
import {FilterService} from "../service/filterService";
import {ValuesComponent} from "../components/values/values.component";
import {HomeComponent} from "../components/home/home.component";
import {ValueFilteringService} from "../service/valueFilteringService";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [FilterCriteriaService, FilterValuesService, DatePipe, FilterService, ValuesComponent, ValueFilteringService]
})
@Injectable({providedIn: "root"})
export class AppComponent {
  title = 'frontend';
}
