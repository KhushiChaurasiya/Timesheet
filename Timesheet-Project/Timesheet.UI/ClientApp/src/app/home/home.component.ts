import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
 username : any;
  constructor(private router: Router) { }

  ngOnInit() {
   this.username = localStorage.getItem('username');  
  }
  logout()
  {
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    this.router.navigate(['/account/login']);
  }
}
