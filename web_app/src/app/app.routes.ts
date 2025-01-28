
import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ScoreComponent } from "./score/score.component";

export const routes: Routes =
[
    {path: "", component: HomeComponent},
    {path: "score", component: ScoreComponent}
];
