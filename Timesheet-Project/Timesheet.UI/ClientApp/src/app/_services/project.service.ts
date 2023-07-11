import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../_models/project';
import { Observable } from 'rxjs';

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
    debugger;
    return this.http.put<any>(`${environment.apiUrl}/api/Project/${id}`,pro);
  }

  public delete(id: number) {
    return this.http.delete<Project[]>(`${environment.apiUrl}/api/Project/${id}`);
  }
}
