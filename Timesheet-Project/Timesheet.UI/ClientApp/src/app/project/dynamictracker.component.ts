import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TimesheetTracker } from '../_models/timesheettracker';
import { TaskResponse } from '../_models/taskresponse';
import * as moment from 'moment';
import { TrackerService } from '../_services/tracker.service';
import { first } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { ProjectService } from '../_services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  timesheetTrackerData : TimesheetTracker[]=[];

 constructor(private formBuilder: FormBuilder, private projectServices:ProjectService, private alertService : AlertService,private router: Router, private route: ActivatedRoute, private trackerService : TrackerService) { 
 }

 ngOnInit() {
   this.username =localStorage.getItem('username');
   this.ProjectName = 'Greenpath';

   var currentDate = moment();
   var weekStart = currentDate.clone().startOf('week');
   for (let i = 0; i <= 6; i++) {
       this.weekDays.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));
   };

   this.timesheetform = this.formBuilder.group({
     taskId: '',
     taskDescription: '',
     times: '',
     workplaceId : '',
     reasonId:'',
     timesheets: this.formBuilder.array([]) ,  
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
  this.addTimesheet();
   
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
   this.weekDays = this.fnWeekDays(moment(dt, "ddd DD - MMM").add(1, 'days'));
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

    if(this.timesheetTracker.length >0){
      for(let i =0; i<= this.timesheetTracker.length; i++)
      {
        this.timesheetTrackerData =[];
        if(this.timesheetTracker[i].id)
        {
          this.timesheetTracker[i].isSubmitted = this.submitted;
          this.timesheetTrackerData.push(this.timesheetTracker[i]);
          this.trackerService.updateTracker(this.timesheetTracker[i].id,this.timesheetTrackerData).subscribe({
            next:(emp) => {
              this.alertService.success('tracker details saved', { keepAfterRouteChange: true });
              // this.BindAllData();
            },
            error: (error: any) => {
              this.alertService.error(error);
            }
          });
        }
        else
        {
          this.timesheetTracker[i].isSubmitted = this.submitted;
          this.timesheetTrackerData.push(this.timesheetTracker[i]);
          this.trackerService.CreatedTracker(this.timesheetTrackerData).subscribe({
            next:(emp) => {
              this.alertService.success('tracker details saved', { keepAfterRouteChange: true });
              this.BindAllData();
            },
            error: (error: any) => {
              this.alertService.error(error);
            }
          });
        }
      }
     
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

  SaveAll()
 {
   this.submitted = true;
   this.alertService.clear();
   if (this.timesheetform.invalid) {
     return; 
   }

   if(this.timesheetTracker.length >0){
     for(let i =0; i<= this.timesheetTracker.length; i++)
     {
       this.timesheetTrackerData =[];
       if(this.timesheetTracker[i].id)
       {
         this.timesheetTrackerData.push(this.timesheetTracker[i]);
         this.trackerService.updateTracker(this.timesheetTracker[i].id,this.timesheetTrackerData).subscribe({
           next:(emp) => {
             this.alertService.success('tracker details saved', { keepAfterRouteChange: true });
             // this.BindAllData();
           },
           error: (error: any) => {
             this.alertService.error(error);
           }
         });
       }
       else
       {
         this.timesheetTrackerData.push(this.timesheetTracker[i]);
         this.trackerService.CreatedTracker(this.timesheetTrackerData).subscribe({
           next:(emp) => {
             this.alertService.success('tracker details saved', { keepAfterRouteChange: true });
             this.BindAllData();
           },
           error: (error: any) => {
             this.alertService.error(error);
           }
         });
       }
     }
    
   }
   else{
     this.alertService.error("Something went wrong. not found any data!");
   }
  }

  Save()
    {
      var TaskIddata;
      this.submitted = false;
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
            
              if(this.timesheetTracker.find(e=> e.dates === this.HeaderDate))
              {
                for(let j=0; j< this.timesheetTracker.length; j++)
                {
                  if(this.timesheetTracker[j].dates == this.HeaderDate){
                    this.timesheetTracker[j].times= this.timesheetform.value.times,
                    this.timesheetTracker[j].taskDescription = this.timesheetform.value.taskDescription,
                    this.timesheetTracker[j].dates = this.HeaderDate,
                    this.timesheetTracker[j].isSubmitted = this.submitted,
                    this.timesheetTracker[j].taskId = TaskIddata,
                    this.timesheetTracker[j].workplaceId = this.timesheetform.value.workplaceId,
                    this.timesheetTracker[j].reasonId = this.timesheetform.value.reasonId,
                    this.timesheetTracker[j].createdBy = this.username,
                    this.timesheetTracker[j].projectId = 2
                  }
                }
              }
              else{
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
              }
            return;
          }
      }
  }

  BindAllData()
    {
      debugger;
      this.trackerService.GetAll(this.username).pipe(first()).subscribe({
        next:(x) => {
        let a = x.dateAndTimeDTOs;
        let b = x.projectTaskDTOs;
        if(this.ProjectName == x.projectDTOs.name){
            for(let i =0; i<= this.weekDays.length; i++){
              const htmlElement = document.getElementById("time_"+i) as HTMLElement;
              const htmlTimesElement = document.getElementById("times_"+i) as HTMLElement;
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
                  $("#"+ htmlTimesElement.id).val(a[j].times);
                  $("#"+htmldescriptionEle.id).val(a[j].description);
                  $("#"+esthrs).val(b.estimationhrs);

                  if(a[j].isSubmitted){
                    $("#"+ this.idFieldValue).prop('disabled', true);
                    $("#"+ this.idFieldValue).removeAttr('data-bs-toggle');
                  }
                  else{
                    this.HeaderDate = moment(a[j].dates).format('YYYY-MM-DD');
                    this.trackerService.GetByDate(this.HeaderDate).subscribe({
                      next:(res) =>{
                        this.HeaderDate = moment(res[0].dates).format('YYYY-MM-DD');
                        this.timesheetTracker.push({
                          id : res[0].id,
                          times: res[0].times,
                          taskDescription: res[0].taskDescription,
                          dates : this.HeaderDate,
                          isSubmitted : res[0].isSubmitted,
                          taskId: res[0].taskId,
                          workplaceId: res[0].workplaceId,
                          reasonId : res[0].reasonId,
                          createdBy: res[0].createdBy,
                          projectId: res[0].projectId
                        });
                      }
                    });
                  }
              
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

  newTimeshhetForm(): FormGroup {  
    return this.formBuilder.group({  
      taskId: '',
      taskDescription: '',
      times: '',
      workplaceId : '',
      reasonId: '', 
    })  
  }  

  timesheets() : FormArray {  
    return this.timesheetform.get("timesheets") as FormArray  
  }  

  addTimesheet()
  {
    this.timesheets().push(this.newTimeshhetForm());  
    this.BindAllData();
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

