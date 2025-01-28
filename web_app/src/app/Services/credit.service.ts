
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

import { User_info } from "../Interfaces/user_info";
import { Score } from "../Interfaces/score";

@Injectable({
  providedIn: 'root'
})
export class CreditService
{
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "credit/";
  private user_score: Score = { user_score: 0};

  constructor(private http:HttpClient) { }

  send_user_data(new_ln_amnt: number,
                 new_term: number,
                 new_int_rate: number,
                 new_installment: number,
                 new_sub_grade: string,
                 new_hm_own: string,
                 new_an_inc: number,
                 new_purpose: string,
                 new_dti: number,
                 new_delinq_2yrs: number,
                 new_inq_last_6mths: number,
                 new_open_acc: number,
                 new_pub_rec: number,
                 new_revol_bal: number,
                 new_total_acc: number,
                 new_last_pymnt_amnt: number,
                 new_policy_code: number,
                 new_application_type: number,
                 new_acc_now_delinq: number,
                 new_month: number,
                 new_year: number)
  {
    const new_user_info: User_info =
    {
      loan_amnt: new_ln_amnt,
      term: new_term,
      int_rate: new_int_rate,
      installment: new_installment,
      sub_grade: new_sub_grade,
      home_ownership: new_hm_own,
      annual_inc: new_an_inc,
      purpose: new_purpose,
      dti: new_dti,
      delinq_2yrs: new_delinq_2yrs,
      inq_last_6mths: new_inq_last_6mths,
      open_acc: new_open_acc,
      pub_rec: new_pub_rec,
      revol_bal: new_revol_bal,
      total_acc: new_total_acc,
      last_pymnt_amnt: new_last_pymnt_amnt,
      policy_code: new_policy_code,
      application_type: new_application_type,
      acc_now_delinq: new_acc_now_delinq,
      month: new_month,
      year: new_year
    }
    this.http.post(`${this.apiUrl}calculate`, new_user_info).subscribe({
      next: (response) => {},
      error: (error) => {}
    })
  }

  get_user_score()
  {
    return this.http.get(`${this.apiUrl}get`);
  }
}