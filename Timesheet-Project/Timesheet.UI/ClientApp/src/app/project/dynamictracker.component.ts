import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TimesheetTracker } from '../_models/timesheettracker';
import { TaskResponse } from '../_models/taskresponse';
import * as moment from 'moment';
import { TrackerService } from '../_services/tracker.service';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-dynamictracker',
  templateUrl: './dynamictracker.component.html'
})
export class DynamictrackerComponent implements OnInit {
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

  constructor(private fb:FormBuilder, private trackerService : TrackerService, private alertService : AlertService, private projectServices : ProjectService) {  
    this.timesheetform = this.fb.group({  
      taskId: '',  
      estimationhrs:'',
      workplaceId:'',
      reasonId:'',
      times:'',
      timesheets: this.fb.array([]) ,  
    });  
  }
  
  ngOnInit() {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
        this.weekDays.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));
    };

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
      Object.assign(this.projectData, data);
    },
    error => {
      console.log("Something wrong here");
    });
    this.BindAllData();
    this.addTimesheet();
  }
  
  timesheets() : FormArray {  
    return this.timesheetform.get("timesheets") as FormArray  
  }  
     
  newTimesheet(): FormGroup {  
    return this.fb.group({  
      taskId: '',  
      estimationhrs:'',
      workplaceId:'',
      reasonId:'',
      times:'',
    })  
  }  
     
  addTimesheet() {  
    debugger;
    this.timesheets().push(this.newTimesheet());  
  }  
     
  onSubmit() {  
    console.log(this.timesheetform.value);  
  }  


  // ------------------ Timesheet Form
  get f() { return this.timesheetform.controls; }
  onWorkplaceSelected(event : any)
  {
      this.workplaceId = event.target.value;
  }

  onReasonSelected(event:any)
  {
    this.reasonId = event.target.value;
  }

  
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

  BindAllData()
  {
    debugger;
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

        this.timesheetform.patchValue(x.workplaceDTOs.id)
        this.timesheetform.get("workplaceId")?.setValue(x.workplaceDTOs.id);
        this.timesheetform.get("reasonId")?.setValue(x.reasonDTOs.id);
        this.timesheetform.get("taskId")?.setValue(x.projectTaskDTOs.taskName);
      },
      error: (error: any) => {
        this.alertService.error(error);
      }
    });
  }
  getHeaderName(e : any, Index : any)
  {
    var table = document.getElementById("tblTimesheettracker") as HTMLTableElement;
    this.dateVal = table.tHead?.rows[0].cells[Index].innerHTML;
    this.HeaderDate = moment(this.dateVal, 'ddd DD - MMM').format('YYYY-MM-DD');  
  }
}
