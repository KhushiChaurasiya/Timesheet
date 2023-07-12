import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private empSubject!: BehaviorSubject<Employee | null>;

  constructor(private http: HttpClient) { }

  
  public get userValue() {
    return this.empSubject.value;
}


  register(employee: Employee) : Observable<any>{  
    return this.http.post<any>(`${environment.apiUrl}/api/Auth/AddEmployee`, employee);
  }

  GetEmpInfoByEmail(EmailId : string)
  {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/Auth/GetEmpInfoByEmail?EmailId=${EmailId}`);
  }

}
