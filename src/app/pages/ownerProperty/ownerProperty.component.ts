import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'ownerProperty',
  templateUrl: './ownerProperty.component.html',
  styleUrls: ['./ownerProperty.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerPropertyComponent implements OnInit {
  private menuDiv = "hide";
  private properties;
  private propertyId;
  constructor(private router: Router, private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.fetchProperties()
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
  fetchType(event) {
    console.log(event)
    if (event == "all") {
        this.fetchProperties();
    } else if (event == "unapproved") {
        this.fetchUnapprovedProperties();
    }
  }
  showOwnerDetails(id) {
    console.log(id, "$$$$$$$$$$$$$$$")
    this.router.navigateByUrl("/ownerPropertyDetailsComponent/" + id)
  }
  fetchUnapprovedProperties() {
    this.propertiesService.fetchUnapprovedProperties().subscribe(item => {
      console.log(item);
      this.properties = item.map(element => {
        if (element.isApproved == 1) {
          element.enable = true
        } else {
          element.enable = false
        }
        return element;
      });
    })
  }
  fetchPropertyById(){
    this.properties=[]
    this.propertiesService.fetchPropertiesById(this.propertyId).subscribe(item => {
      console.log(item, "############");
      
      if (item.isApproved == 1) {
        item.enable = true
      } else {
        item.enable = false
      }
      this.properties.push(item);
    })
  }
  fetchProperties() {
    this.propertiesService.fetchProperties().subscribe(item => {
      console.log(item);
      this.properties = item.map(element => {
        if (element.isApproved == 1) {
          element.enable = true
        } else {
          element.enable = false
        }
        return element;
      });
    })
  }
}
