import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation_admin',
  templateUrl: './navigation_admin.component.html',
  styleUrls: ['./navigation_admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationAdminComponent implements OnInit {
  private menuDiv = "hide";
  constructor(private router: Router) { }

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
