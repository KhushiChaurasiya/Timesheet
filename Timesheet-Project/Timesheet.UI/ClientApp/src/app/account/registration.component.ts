import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  employee : any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(  private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]]
  });
  }

  get f() { return this.form.controls; }
  get emailId() {
    return this.form.get('emailId');
}

  onSubmit() {
    debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.employeeService.register(this.form.value)
    .pipe(first())
    .subscribe({
        next: (data : any) => {
            this.employee = data;
            this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
        }
    });
}

}
