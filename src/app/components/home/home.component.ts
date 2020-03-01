import { Component, OnInit } from "@angular/core";
import { GetHeroesService } from "../../services/get-heroes.service";
import { Hero } from "../../models/hero";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  marvelHeroes: Hero;
  /* Conditionally render the error message within the template */
  error = null;

  constructor(private apiService: GetHeroesService) {}

  ngOnInit(): void {
    this.apiService.getHeroes().subscribe(
      data => (this.marvelHeroes = data),
      error => (this.error = error)
    );
  }
}
