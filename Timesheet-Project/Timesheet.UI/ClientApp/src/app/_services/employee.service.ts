import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  register(employee: Employee) : Observable<any>{  
    return this.http.post<any>(`${environment.apiUrl}/api/Auth/AddEmployee`, employee);
  }

  GetEmpInfoByEmail(EmailId : string)
  {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/Auth/GetEmpInfoByEmail?EmailId=${EmailId}`);
  }

}
