import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
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
