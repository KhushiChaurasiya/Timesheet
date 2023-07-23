import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../_models/employee';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private returnUrl!: string;
  submitted = false;
  emailId = '';
  Erorrmessage! : string;
  IsError: boolean = false;
  empDetails : any;


  constructor(private formBuilder: FormBuilder, private employeeServices : EmployeeService, private alertService : AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      emailId: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }

  onSubmit()
  {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return; 
    }
    this.employeeServices.GetEmpInfoByEmail(this.form.value.emailId)
    .pipe(first())
    .subscribe({
      next:(emp) => {
        if(emp != null){
        this.empDetails = emp;
        localStorage.setItem('email', this.empDetails.emailId);  
        localStorage.setItem('username', this.empDetails.firstName);  
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/projectlist';
        this.router.navigateByUrl(returnUrl);
        }
        else{
          this.IsError = true;
          if(this.IsError)
          {
            this.router.navigate(['../register'], { relativeTo: this.route });
          }
        }
      },
      error: (error: any) => {
        this.IsError = true;

        if(this.IsError)
        {
          this.Erorrmessage = error;
        }

        // this.alertService.error(error);
      }
    });
    // this.alertService.error(error)
  }
}
