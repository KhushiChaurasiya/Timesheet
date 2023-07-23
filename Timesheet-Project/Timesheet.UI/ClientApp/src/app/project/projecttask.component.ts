import { Component, OnInit } from '@angular/core';
import { ProjectTask } from '../_models/projecttask';
import { ProjectService } from '../_services/project.service';
import { AlertService } from '../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projecttask',
  templateUrl: './projecttask.component.html',
})
export class ProjecttaskComponent implements OnInit {
  username : any;
  taskDetails: ProjectTask[] = [];

  constructor(private projectServices: ProjectService, private alertService: AlertService,private router: Router) 
  { 
    this.getAllProjectTaskDetails();
  }

  ngOnInit(): void {
    
  }

  getAllProjectTaskDetails()
  {
    this.projectServices.getAllTask().subscribe((res)=>{
      this.taskDetails = res
    },
    (error) => {     
     this.alertService.error(error);
    });
  }
  logout()
  {
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    this.router.navigate(['/account/login']);
  }
  delete(id: number) { 
    var ans = confirm("Do you want to delete app with Id: " + id);  
    if (ans) {  
        this.projectServices.deleteTask(id).subscribe((data) => {  
            this.getAllProjectTaskDetails();
        }, error => this.alertService.error(error))  
    }  
}  
}
