import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheettracker',
  templateUrl: './timesheettracker.component.html'
})
export class TimesheettrackerComponent implements OnInit {
   weekDays: any = [];
   
  constructor() { }

  ngOnInit(): void {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf('week');
    for (let i = 0; i <= 6; i++) {
        this.weekDays.push(moment(weekStart).add(i, 'days').format("ddd DD - MMM"));
    };
    console.log(this.weekDays);
  }
}
