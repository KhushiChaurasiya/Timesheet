import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../_models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  register(employee: Employee) {  
    return this.http.post(`${environment.apiUrl}/api/Auth/AddEmployee`, employee);
}
}
