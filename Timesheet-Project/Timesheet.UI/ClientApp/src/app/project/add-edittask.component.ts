import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/project';

@Component({
  selector: 'app-add-edittask',
  templateUrl: './add-edittask.component.html'
})
export class AddEdittaskComponent implements OnInit {
  form!: FormGroup;
  private returnUrl!: string;
  submitted = false;
  id?: any;
  username : any;
  title!: string;
  submitting = false;
  proDetails : any =[];
  projectDetails : Project[] =[];
  dateValid : boolean =true;

  checkDates(group: FormGroup) {
    if(group.controls['endDate'].value <= group.controls['startDate'].value) {
    return { notValid:true }
    }
    return null;
 }

  constructor(private formBuilder: FormBuilder, private projectService : ProjectService, private alertService : AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.username =localStorage.getItem('username');
    this.id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      taskName: ['', Validators.required],
      taskDescription: ['',Validators.required],
      startDate : ['', Validators.required],
      endDate: ['',Validators.required],
      projectId : ['', Validators.required],
      estimationhrs :['',Validators.required]
     },{validators:this.checkDates});

 this.projectService.getAll().subscribe((data) => { 
            this.projectDetails = data;
        }, error => this.alertService.error(error))

  }

  get f() { return this.form.controls; }

  
  onSubmit()
  {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return; 
    }
    this.saveTask().subscribe({
      next:(emp) => {
        this.alertService.success('Task details saved', { keepAfterRouteChange: true });
        if(this.id != null){
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tasklist';
          this.router.navigateByUrl(returnUrl);
        }else{
          this.router.navigate(['../tasklist'], { relativeTo: this.route });
        }
      },
      error: (error: any) => {
        this.alertService.error(error);
      }
    });
    // this.alertService.error(error)
  }

  private saveTask() {
    debugger;
      const filedata = new FormData();
      if( this.id != null){
        filedata.append('Id', this.id);
      }
      filedata.append('taskName',this.form.value.taskName);
      filedata.append('taskDescription',this.form.value.taskDescription);
      filedata.append('startDate',this.form.value.startDate);
      filedata.append('endDate',this.form.value.endDate);
      filedata.append('createdBy',this.username);
      filedata.append('projectId', this.form.value.projectId);
      filedata.append('estimationhrs', this.form.value.estimationhrs);
      return this.id
          ? this.projectService.putTask(this.id, filedata)
          : this.projectService.CreateTask(filedata)
  }

}
