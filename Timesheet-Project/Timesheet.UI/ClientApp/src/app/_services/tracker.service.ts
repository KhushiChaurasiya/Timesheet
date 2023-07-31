import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimesheetTracker } from '../_models/timesheettracker';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private http: HttpClient) { }

  CreatedTracker(tracker: any) : Observable<any>{  
    debugger;
    return this.http.post<any>(`${environment.apiUrl}/api/TimesheetTracker`, tracker);
  }

  GetAll()
  {
    return this.http.get<any>(`${environment.apiUrl}/api/TimesheetTracker`);
  }
}
