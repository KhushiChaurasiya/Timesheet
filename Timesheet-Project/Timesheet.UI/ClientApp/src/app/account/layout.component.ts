import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  constructor( private router: Router,
    private employeeService: EmployeeService) { 
       this.router.navigate(['/account/login']);
    
    }

  ngOnInit(): void {
  }

}
