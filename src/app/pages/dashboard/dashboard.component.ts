import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  private menuDiv = "hide";
  adminUser=localStorage.getItem("admin_username");

  constructor(private router: Router) { 
if(this.adminUser==undefined || this.adminUser==""){
  this.router.navigateByUrl("adminLogin");
}
    
  }

  ngOnInit() {
  }
  showDiv(event) {
    console.log(event,"#####################")
    this.menuDiv = event
  }
  redirectTo(url){
    this.router.navigateByUrl(url)
  }
}
