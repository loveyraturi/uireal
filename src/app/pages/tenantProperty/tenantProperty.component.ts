import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tenantProperty',
  templateUrl: './tenantProperty.component.html',
  styleUrls: ['./tenantProperty.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TenantPropertyComponent implements OnInit {
  private menuDiv = "hide";
  private searchType;
  private tenants = []
  constructor(private userService: UserService, private router: Router) {
    this.fetchAllTenants()
  }

  ngOnInit() {
  }
  showDiv(event) {
    console.log(event, "#####################")
    this.menuDiv = event
  }
  fetchAllTenants() {
    this.tenants = []
    this.userService.fetchAllTenants().subscribe(item => {
      this.tenants = item
      console.log(this.tenants)
    })
  }
  showTenantDetails(id) {
    console.log(id, "$$$$$$$$$$$$$$$")
    this.router.navigateByUrl("/tenantsDetails/" + id)
  }
  search() {
    var reponse = {
      type: this.searchType
    }
    this.tenants = []
    this.userService.searchUser(reponse).subscribe(item => {
      this.tenants.push(item)
      console.log(this.tenants)
    })
  }
  redirectTo(url) {
    this.router.navigateByUrl(url)
  }
}
