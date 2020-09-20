import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tenantDetails',
  templateUrl: './tenantDetails.component.html',
  styleUrls: ['./tenantDetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TenantDetailsComponent implements OnInit {
  private menuDiv = "hide";
  private searchType;
  private tenants=[]
  private id;
  constructor(private _activatedRoute: ActivatedRoute, private userService: UserService,private router: Router) {
    this.id = this._activatedRoute.snapshot.params.id

    this.fetchTenantsDetailsById(this.id)
   }

  ngOnInit() {
  }
  showDiv(event) {
    console.log(event,"#####################")
    this.menuDiv = event
  }
  fetchTenantsDetailsById(id){
    this.tenants=[]
    this.userService.fetchTenantsDetailsById(id).subscribe(item=>{
      this.tenants=item
      console.log(this.tenants)
  })
  }
  search(){
    var reponse={
      type: this.searchType
    }
    this.tenants=[]
    this.userService.searchUser(reponse).subscribe(item=>{
        this.tenants.push(item)
        console.log(this.tenants)
    })
  }
  redirectTo(url){
    this.router.navigateByUrl(url)
  }
  downloadFile(fileName){
    window.open("./assets/cid/"+fileName)
  }
}
