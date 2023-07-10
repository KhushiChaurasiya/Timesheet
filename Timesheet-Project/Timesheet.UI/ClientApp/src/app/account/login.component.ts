import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { ActivatedRoute } from '@angular/router';
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
  employee : Employee[] =[];
  // employee : Employee | undefined;

  constructor(private formBuilder: FormBuilder, private employeeServices : EmployeeService, private alertService : AlertService) { }

  ngOnInit() {
    debugger;
    this.form = this.formBuilder.group({
      emailId: ['', Validators.required]
  });

  
  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  search(value : string){
    debugger;
    this.employeeServices.GetEmpInfoByEmail(value).subscribe(emp => this.employee = emp);

  }

  onSubmit()
  {
    debugger;
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return; 
    }
    this.employeeServices.GetEmpInfoByEmail(this.form.value.emailId)
    .pipe(first())
    .subscribe({
      next:(emp) => {
        this.employee = emp
      },
      error: (error: any) => {
        this.alertService.error(error);
      }
    });
    // this.alertService.error(error)
  }
}
