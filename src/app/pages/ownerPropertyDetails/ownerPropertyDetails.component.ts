import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'ownerPropertyDetails',
  templateUrl: './ownerPropertyDetails.component.html',
  styleUrls: ['./ownerPropertyDetails.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerPropertyDetailsComponent implements OnInit {
  private menuDiv = "hide";
  private id;
  private property;
  constructor(private _activatedRoute: ActivatedRoute,private router: Router, private propertiesService: PropertiesService) {     this.id = this._activatedRoute.snapshot.params.id
    this.id = this._activatedRoute.snapshot.params.id
    this.fetchPropertiesById(this.id);
  }

  ngOnInit() {
    
  }
  showDiv(event) {
    console.log(event, "#####################")
    this.menuDiv = event
  }
  redirectTo(url) {
    this.router.navigateByUrl(url)
  }
  onChange(event, propertyId) {
    console.log(event, propertyId)
    var response = {
      propertyId: propertyId
    }
    if (event) {
      response["isApproved"] = 1
    } else {
      response["isApproved"] = 0
    }
    this.propertiesService.updatePropertyAvailability(response).subscribe(response => {
      console.log(response.status)
    })
  }
  fetchPropertiesById(id) {
    this.propertiesService.fetchPropertiesById(id).subscribe(item => {
      console.log(item,"############");
      this.property=item;
    })
  }
}
