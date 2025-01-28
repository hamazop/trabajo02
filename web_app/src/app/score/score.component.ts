
import { Component, OnInit } from '@angular/core';

import { CreditService } from "../Services/credit.service";

import { Score } from "../Interfaces/score";

import { DecimalPipe } from "@angular/common";

@Component({
  selector: 'app-score',
  imports: [DecimalPipe],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit
{
  constructor (private _creditService: CreditService) {}

  public user_score: Score = {user_score: 0};

  ngOnInit(): void
  {
    this._creditService.get_user_score().subscribe({
      next: (response) => { this.user_score = response as Score; },
      error: (error) => {}
    })
  }

}
