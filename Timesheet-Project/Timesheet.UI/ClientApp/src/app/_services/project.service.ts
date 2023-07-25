import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';
import { Observable } from 'rxjs';
import { ProjectTask } from '../_models/projecttask';
import { Reason } from '../_models/reason';
import { Workplace } from '../_models/workplace';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  public getAll()
  {
    return this.http.get<Project[]>(`${environment.apiUrl}/api/Project`);
  }

  public getById(id: number) {
    return this.http.get<object>(`${environment.apiUrl}/api/Project/${id}`);
  }
  public CreateProject(pro: any) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Project`, pro);
  }

  public put(id: number,pro: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/Project/${id}`,pro);
  }

  public delete(id: number) {
    return this.http.delete<Project[]>(`${environment.apiUrl}/api/Project/${id}`);
  }

  // Project Task Services

  public getAllTask()
  {
    return this.http.get<ProjectTask[]>(`${environment.apiUrl}/api/Task`);
  }

  public deleteTask(id: number) {
    return this.http.delete<ProjectTask[]>(`${environment.apiUrl}/api/Task/${id}`);
  }

  public CreateTask(task: any) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/Task/PostProjectTask`, task);
  }
  
  public putTask(id: number,task: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/Task/${id}`,task);
  }
  public getAllTaskName(ProjectName : any)
  {
    return this.http.get<ProjectTask[]>(`${environment.apiUrl}/api/Task/GetAllTaskName?ProjectName=${ProjectName}`);
  }


  // Reason Services Details
  public getAllReason()
  {
    return this.http.get<Reason[]>(`${environment.apiUrl}/api/Reason`);
  }

  //Workplace Services Details
  public getAllWorkplace()
  {
    return this.http.get<Workplace[]>(`${environment.apiUrl}/api/Workplace`);
  }
}
