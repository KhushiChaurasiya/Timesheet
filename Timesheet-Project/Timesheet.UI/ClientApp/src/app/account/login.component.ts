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
  employee : Employee[] =[];
  // employee : Employee | undefined;

  constructor(private formBuilder: FormBuilder, private employeeServices : EmployeeService, private alertService : AlertService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      emailId: ['', Validators.required]
  });

  
  // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

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
        this.employee = emp;
        if(emp != null){
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
        }
        else{
          this.alertService.error("Invalid email");
        }
      },
      error: (error: any) => {
        this.alertService.error(error);
      }
    });
    // this.alertService.error(error)
  }
}
