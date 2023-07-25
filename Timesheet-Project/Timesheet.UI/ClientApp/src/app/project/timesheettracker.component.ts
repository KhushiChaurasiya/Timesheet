import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ProjectService } from '../_services/project.service';
import { AlertService } from '../_services/alert.service';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetTracker } from '../_models/timesheettracker';
declare var jQuery: any;
import * as $ from 'jquery'
import 'jquery';
import { TrackerService } from '../_services/tracker.service';
import { TaskResponse } from '../_models/taskresponse';

@Component({
  selector: 'app-timesheettracker',
  templateUrl: './timesheettracker.component.html'
})
export class TimesheettrackerComponent implements OnInit {
   weekDays: any = [];
   flag: boolean = true;
   projectList: any;
   lastkeydown: number = 0;
   projectData: any[] = [];
   reasonData : any[] =[];
   workplaceData:any[]=[];
   ProjectName : any ;
   form!: FormGroup;
   timesheetTracker : TimesheetTracker[]=[];
   workplaceId : any;
   reasonId : any;
   submitting = false;
   submitted = false;
   HeaderDate : any;
   isSaved : boolean = false;
   isSubmitted : boolean = false;
   taskId: any;
   matchesTaskDetails : TaskResponse[] =[];
   username :any;

   

  constructor(private formBuilder: FormBuilder, private projectServices:ProjectService, private alertService : AlertService,private router: Router, private route: ActivatedRoute, private trackerService : TrackerService) { 
    
  }

  ngOnInit() {
    this.username =localStorage.getItem('username');
    this.ProjectName = this.route.snapshot.queryParamMap.get('ProjectName');
    //Get all task name
    this.projectServices.getAllTaskName(this.ProjectName).subscribe(data => {
      Object.assign(this.projectData, data);
    },
    error => {
      console.log("Something wrong here");
    });
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
        this.weekDays.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));
    };
    console.log(this.weekDays);
    this.form = this.formBuilder.group({
      taskId: ['', Validators.required],
      taskDescription: ['', Validators.required],
      times: ['',Validators.required],
      workplaceId : ['', Validators.required],
      reasonId: ['',Validators.required],
  });
  }

  get f() { return this.form.controls; }
  closeModalDialog(){

  }

  openModalDialog()
  {

  }

  getTaskNamesSearch(event: any) {
    debugger;
    var taskNamesSearch = (<HTMLInputElement>document.getElementById('taskId')).value;
    this.projectList = [];
    var findtask = taskNamesSearch.toLowerCase();
    if (taskNamesSearch.length > 2) {
      if (event.timeStamp - this.lastkeydown > 200) {
        this.projectList = this.searchFromArray(this.projectData, findtask);
      }
    }
  }

  searchFromArray(arr : any, regex : any) {
    let i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].taskname.match(regex)) {
        var setResponce = { 
          taskname : arr[i].taskname,
          id : arr[i].id
        };
        
        this.matchesTaskDetails.push(setResponce);

        this.projectServices.getAllReason().subscribe((res)=>{
          this.reasonData = res
        },
        (error) => {
         this.alertService.error(error);
        });

        this.projectServices.getAllWorkplace().subscribe((response)=>{
          this.workplaceData = response
        },
        (error) => {
         this.alertService.error(error);
        });
      }
    }
    return this.matchesTaskDetails;
  };
  
  pre(dt : any) {
    this.weekDays = this.fnWeekDays(moment(dt, "ddd DD - MMM").subtract(1, 'days'));
    console.log("Pre date" +this.weekDays);
  };

  next(dt: any)
  {
    this.weekDays = this.fnWeekDays(moment(dt, "dd DD - MM").add(1, 'days'));
  }

  fnWeekDays(dt : any) {

      var currentDate = dt;
      var weekStart = currentDate.clone().startOf('week');
      var weekEnd = currentDate.clone().endOf('week');

      var days = [];
      for (let i = 0; i <= 6; i++) {

          days.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));

      };
      return days;
  }
  

  onWorkplaceSelected(event : any)
  {
      this.workplaceId = event.target.value;
  }
  onReasonSelected(event:any)
  {
    this.reasonId = event.target.value;
  }

  onSubmit()
  {
    debugger;
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return; 
    }

  }

  getHeaderName(e : any, Index : any)
  {
      var table = document.getElementById("tblTimesheettracker") as HTMLTableElement;
      var data = table.tHead?.rows[0].cells[Index].innerHTML;
      this.HeaderDate = moment(data, 'ddd DD - MMM').format('YYYY-MM-DD');  
  }

  Save()
  {
    debugger;
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return; 
    }
    this.isSaved = true;
    this.isSubmitted = false;
    const filedata = new FormData();
    filedata.append('TaskId',this.form.value.taskId);
    filedata.append('WorkplaceId',this.form.value.workplaceId);
    filedata.append('ReasonId',this.form.value.reasonId);
    filedata.append('Times',this.form.value.times);
    filedata.append('TaskDescription',this.form.value.taskDescription);
    filedata.append('Dates',this.HeaderDate);
    filedata.append('ProjectId', "2");
    filedata.append('isSaved',new Boolean(this.isSaved).toString());
    filedata.append("CreatedBy", this.username);
    filedata.append('IsSubmitted',new Boolean(this.isSubmitted).toString());
    

    this.trackerService.CreatedTracker(filedata).subscribe({
      next:(emp) => {
        this.alertService.success('tracker details saved', { keepAfterRouteChange: true });
      },
      error: (error: any) => {
        this.alertService.error(error);
      }
    });
    

  }
}
