import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { HeroDetailsComponent } from "./components/hero-details/hero-details.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "details/:id", component: HeroDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
