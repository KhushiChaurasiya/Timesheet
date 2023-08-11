import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { AlertOptions } from '../_models/alert';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  employee : any;
  emailPattern = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";

  constructor(  private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private alertService : AlertService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailId: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }
//   get emailId() {
//     return this.form.get('emailId');
// }

  onSubmit() {
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
            this.alertService.success("Registration completed sucessfully", {keepAfterRouteChange:true});
            this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
        }
    });
}

}
