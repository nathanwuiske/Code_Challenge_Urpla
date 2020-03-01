import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Hero } from "../models/hero";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GetHeroesService {
  API_HOST: string =
    "https://k68rijwq86s.execute-api.us-east-1.amazonaws.com/prod/heroes/";
  constructor(private httpClient: HttpClient) {}

  /* Retrieve all heroes */
  getHeroes(): Observable<Hero> {
    return this.httpClient
      .get<Hero>(`${this.API_HOST}`)
      .pipe(catchError(this.handleError));
  }

  /* Retrieve hero by ID */
  getHeroByID(id): Observable<Hero> {
    return this.httpClient
      .get<Hero>(`${this.API_HOST}${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    /* Throw simple error message if unable to connect to endpoint */
    return throwError(`Error: ${error.message}`);
  }
}
