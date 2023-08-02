import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { first } from 'rxjs';
import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-timesheettracker',
  templateUrl: './timesheettracker.component.html'
})
export class TimesheettrackerComponent implements OnInit {
   weekDays: any = [];
   projectList: any;
   lastkeydown: number = 0;
   projectData: any[] = [];
   reasonData : any[] =[];
   workplaceData:any[]=[];
   ProjectName : any ;
   timesheetform!: FormGroup;
   timesheetTracker : TimesheetTracker[]=[];
   workplaceId : any;
   reasonId : any;
   submitted = false;
   HeaderDate : any;
   isSubmitted : boolean = false;
   taskId: any;
   matchesTaskDetails : TaskResponse[] =[];
   username :any;
   trackerList: any[]=[];
   idFieldValue : any;
   estimationHrs : any;
   dateVal : any;

  constructor(private formBuilder: FormBuilder, private projectServices:ProjectService, private alertService : AlertService,private router: Router, private route: ActivatedRoute, private trackerService : TrackerService) { 
  }

  ngOnInit() {
    this.username =localStorage.getItem('username');
    this.ProjectName = this.route.snapshot.queryParamMap.get('ProjectName');

    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
        this.weekDays.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));
    };

    this.timesheetform = this.formBuilder.group({
      taskId: ['', Validators.required],
      taskDescription: ['', Validators.required],
      times: ['',Validators.required],
      workplaceId : ['', Validators.required],
      reasonId: ['',Validators.required],
    });

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
    //Get all task name
    this.projectServices.getAllTaskName(this.ProjectName).subscribe(data => {
      debugger;
      Object.assign(this.projectData, data);
    },
    error => {
      console.log("Something wrong here");
    });

    // Get all timesheet tracker data by date and time
   this.BindAllData();
    
  }
  get f() { return this.timesheetform.controls; }

  getTaskNamesSearch(event: any) {
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
          id : arr[i].id,
          esthrs : arr[i].esthrs
        };
        this.estimationHrs = setResponce.esthrs;
        this.matchesTaskDetails.push(setResponce);
      }
    }
    return this.matchesTaskDetails;
  };
  
  pre(dt : any) {
    this.weekDays = this.fnWeekDays(moment(dt, "ddd DD - MMM").subtract(1, 'days'));
    this.BindAllData();
  };

  next(dt: any)
  {
    this.weekDays = this.fnWeekDays(moment(dt, "ddd DD - MM").add(1, 'days'));
    this.BindAllData();
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
    this.submitted = true;
    this.alertService.clear();
    if (this.timesheetform.invalid) {
      return; 
    }

    if(this.timesheetTracker.length >0){
      this.trackerService.CreatedTracker(this.timesheetTracker).subscribe({
        next:(emp) => {
          this.alertService.success('tracker details saved', { keepAfterRouteChange: true });
          this.BindAllData();
        },
        error: (error: any) => {
          this.alertService.error(error);
        }
      });
    }
    else{
      this.alertService.error("Something went wrong. not found any data!");
    }
}

  getHeaderName(e : any, Index : any)
  {
    var table = document.getElementById("tblTimesheettracker") as HTMLTableElement;
    this.dateVal = table.tHead?.rows[0].cells[Index].innerHTML;
    this.HeaderDate = moment(this.dateVal, 'ddd DD - MMM').format('YYYY-MM-DD');  
  }

  Save()
  {
    var TaskIddata;
    this.submitted = true;
    this.alertService.clear();
    if (this.timesheetform.invalid) {
      return; 
    }

   for(let i =0; i<= this.projectData.length; i++)
   {
    var taskvalue = this.timesheetform.value.taskId.toLocaleLowerCase()
    var d = this.projectData[i].taskname == taskvalue;
    if(d)
    {
      TaskIddata = this.projectData[i].id;
     
      this.timesheetTracker.push({
        times: this.timesheetform.value.times,
        taskDescription: this.timesheetform.value.taskDescription,
        dates : this.HeaderDate,
        isSubmitted : this.submitted,
        taskId: TaskIddata,
        workplaceId: this.timesheetform.value.workplaceId,
        reasonId : this.timesheetform.value.reasonId,
        createdBy: this.username,
        projectId: 2
      });
      return;
    }
   }
  }

  BindAllData()
  {
    this.trackerService.GetAll().pipe(first()).subscribe({
      next:(x) => {
       let a = x.dateAndTimeDTOs;
       let b = x.projectTaskDTOs;
       let c = x.workplaceDTOs;
       let d = x.reasonDTOs;
       if(this.ProjectName == x.projectDTOs.name){
          for(let i =0; i<= this.weekDays.length; i++){
            const htmlElement = document.getElementById("time_"+i) as HTMLElement;
            const htmldescriptionEle = document.getElementById("description_"+i) as HTMLElement;
            const htmlestimationhrs = document.getElementById("estimationhrs") as HTMLElement;
            var dt = moment(this.weekDays[i], 'ddd DD - MMM').format('YYYY-MM-DD');
            for(let j=0; j< a.length; j++)
            {
              var getdate = moment(a[j].dates).format('YYYY-MM-DD');
              if(dt == getdate )
              {
                this.idFieldValue =htmlElement?.id;
                var esthrs= htmlestimationhrs?.id;
                $("#"+ this.idFieldValue).val(a[j].times);
                $("#"+htmldescriptionEle.id).val(a[j].description);
                $("#"+esthrs).val(b.estimationhrs)
            
                this.timesheetform.get("workplaceId")?.setValue(x.workplaceDTOs.id);
                this.timesheetform.get("reasonId")?.setValue(x.reasonDTOs.id);
                this.timesheetform.get("taskId")?.setValue(x.projectTaskDTOs.taskName);
              }
            }
          }
        }
      },
      error: (error: any) => {
        this.alertService.error(error);
      }
    });
  }
}


 $(document).ready(function () {
       $(document).on("click", ".times", function(event){
      $("#times").val(event.currentTarget.value);
      $("#description").val(event.currentTarget.nextElementSibling.value);
  });
 });

 $(document).ready(function () {
  $(document).on("click", "#modalSave", function(event){
    $('#exampleModal').removeClass('show');
    $(this).addClass('hide');
 });
});


