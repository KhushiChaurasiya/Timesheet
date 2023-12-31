import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../_services/project.service';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  private returnUrl!: string;
  submitted = false;
  id?: any;
  username : any;
  title!: string;
  submitting = false;
  proDetails : any =[];

  constructor(private formBuilder: FormBuilder, private projectService : ProjectService, private alertService : AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.username =localStorage.getItem('username');
    this.id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['',Validators.required],
      startDate : ['', Validators.required],
      endDate: ['',Validators.required]
  });

  this.title = 'Add Project';
  if (this.id) {
    debugger;
      // edit mode
      this.title = 'Edit Project';
      this.projectService.getById(this.id)
          .pipe(first())
          .subscribe({
            next:(x) => {
              this.proDetails = x;
             this.form.patchValue(x);
            //  this.form.controls['startDate'].setValue(formatDate(this.proDetails.startDate,'yyyy-mm-dd','en'));

            },
            error: (error: any) => {
              this.alertService.error(error);
              this.submitting = false;
          }
          });
  }
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
    const filedata = new FormData();

    this.saveApp().subscribe({
      next:(emp) => {
        this.alertService.success('Project detail saved', { keepAfterRouteChange: true });
        if(this.id != null){
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/list';
          this.router.navigateByUrl(returnUrl);
        }else{
          this.router.navigate(['../list'], { relativeTo: this.route });
        }
      },
      error: (error: any) => {
      
        this.alertService.error(error);
      }
    });
    // this.alertService.error(error)
  }

  private saveApp() {
    debugger;
      const filedata = new FormData();
      if( this.id != null){
        filedata.append('Id', this.id);
      }
      filedata.append('code',this.form.value.code);
      filedata.append('name',this.form.value.name);
      filedata.append('description',this.form.value.description);
      filedata.append('startDate',this.form.value.startDate);
      filedata.append('endDate',this.form.value.endDate);
      filedata.append('createdBy',this.username);
      return this.id
          ? this.projectService.put(this.id, filedata)
          : this.projectService.CreateProject(filedata)
    

  }

}
