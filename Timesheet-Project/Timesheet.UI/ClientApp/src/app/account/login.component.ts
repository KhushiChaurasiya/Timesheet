import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private returnUrl!: string;
  submitted = false;
  employee : Employee | undefined;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, employeeServices : EmployeeService) { }

  ngOnInit() {
    debugger;
    this.form = this.formBuilder.group({
      emailId: ['', Validators.required]
  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  onSubmit()
  {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
  }
}
