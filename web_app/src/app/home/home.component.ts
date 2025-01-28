
import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { CreditService } from '../Services/credit.service';

@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent
{
  constructor(private _creditService: CreditService,  private _router: Router) {}

  public scoreForm = new FormGroup
  ({
    loan_amnt: new FormControl("", [ Validators.required ] ),
    term: new FormControl("", [ Validators.required ] ),
    int_rate: new FormControl("", [ Validators.required ] ),
    installment: new FormControl("", [ Validators.required ] ),
    grade: new FormControl("", [ Validators.required ] ),
    sub: new FormControl("", [ Validators.required ] ),
    home_ownership: new FormControl("", [ Validators.required ] ),
    annual_inc: new FormControl("", [ Validators.required ] ),
    purpose: new FormControl("", [ Validators.required ] ),
    dti: new FormControl("", [ Validators.required ] ),
    delinq_2yrs: new FormControl("", [ Validators.required ] ),
    inq_last_6mths: new FormControl("", [ Validators.required ] ),
    open_acc: new FormControl("", [ Validators.required ] ),
    pub_rec: new FormControl("", [ Validators.required ] ),
    revol_bal: new FormControl("", [ Validators.required ] ),
    total_acc: new FormControl("", [ Validators.required ] ),
    last_pymnt_amnt: new FormControl("", [ Validators.required ] ),
    policy_code: new FormControl("", [ Validators.required ] ),
    application_type: new FormControl("", [ Validators.required ] ),
    acc_now_delinq: new FormControl("", [ Validators.required ] ),
    rlst_cr: new FormControl("", [ Validators.required ] ),
  });

  async calculate()
  { 

    // Verify form was correctly filled
    if(this.scoreForm.valid)
      {
        // First we concatenate Grade and Subgrade
        const grade = String( this.scoreForm.value.grade )
        const sub = String( this.scoreForm.value.sub )
        
        const sub_grade = grade + sub;

        // Then we convert rlst_cr to month and year
        const rlst_cr_date = new Date( String( this.scoreForm.value.rlst_cr ) );

        const month = rlst_cr_date.getMonth() + 1;
        const year = rlst_cr_date.getFullYear();

        this._creditService.send_user_data(
          Number( this.scoreForm.value.loan_amnt ),
          Number( this.scoreForm.value.term ),
          Number( this.scoreForm.value.int_rate ),
          Number( this.scoreForm.value.installment ),
          String( sub_grade ),
          String( this.scoreForm.value.home_ownership ),
          Number( this.scoreForm.value.annual_inc ),
          String( this.scoreForm.value.purpose ),
          Number( this.scoreForm.value.dti ),
          Number( this.scoreForm.value.delinq_2yrs ),
          Number( this.scoreForm.value.inq_last_6mths ),
          Number( this.scoreForm.value.open_acc ),
          Number( this.scoreForm.value.pub_rec ),
          Number( this.scoreForm.value.revol_bal ),
          Number( this.scoreForm.value.total_acc ),
          Number( this.scoreForm.value.last_pymnt_amnt ),
          Number( this.scoreForm.value.policy_code ),
          Number( this.scoreForm.value.application_type ),
          Number( this.scoreForm.value.acc_now_delinq ),
          Number( month ),
          Number( year )
        );

        alert("Calculando, por favor espere");

        // Intentionally delay the routing while waiting for the prediction
        await new Promise( (resolve) => setTimeout(resolve, 5000));

        this._router.navigate(["/score"]);
      }
    else
    {
      alert("Llene todos los campos primero");
    }
  }
}