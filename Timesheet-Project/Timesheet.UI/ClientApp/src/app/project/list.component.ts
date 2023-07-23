import { Component, OnInit } from '@angular/core';
import { Project } from '../_models/project';
import { AlertService } from '../_services/alert.service';
import { ProjectService } from '../_services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  username : any;
  projectDetails: Project[] = [];

  constructor(private projectServices: ProjectService, private alertService: AlertService,private router: Router) { this.getAllProjectDetails();}

  ngOnInit() {
    this.getAllProjectDetails();
  }

  getAllProjectDetails()
  {
    this.projectServices.getAll().subscribe((res)=>{
       this.projectDetails = res
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
        this.projectServices.delete(id).subscribe((data) => {  
            this.getAllProjectDetails();
        }, error => this.alertService.error(error))  
    }  
}  

}
