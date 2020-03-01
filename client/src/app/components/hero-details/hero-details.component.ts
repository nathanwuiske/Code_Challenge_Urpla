import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetHeroesService } from "../../services/get-heroes.service";
import { Hero } from "../../models/hero";

@Component({
  selector: "app-hero-details",
  templateUrl: "./hero-details.component.html",
  styleUrls: ["./hero-details.component.scss"]
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero;
  error = null;

  constructor(
    public route: ActivatedRoute,
    private heroService: GetHeroesService
  ) {}

  ngOnInit(): void {
    const heroID = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHeroByID(heroID).subscribe(
      data => (this.hero = data),
      error => (this.error = error)
    );
  }
}
