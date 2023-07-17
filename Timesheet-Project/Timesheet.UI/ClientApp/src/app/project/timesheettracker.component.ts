import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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
   
  constructor() { }

  ngOnInit(): void {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
        this.weekDays.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));
    };
    console.log(this.weekDays);
  }
  closeModalDialog(){

  }

  openModalDialog()
  {
    
  }
  getProjectIds(event: any) {
    let userId = (<HTMLInputElement>document.getElementById('projectIds')).value;
    this.projectList = [];

    if (userId.length > 2) {
      if (event.timeStamp - this.lastkeydown > 200) {
        this.projectList = this.searchFromArray(this.projectData, userId);
      }
    }
  }  
  searchFromArray(arr : any, regex : any) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };
}
