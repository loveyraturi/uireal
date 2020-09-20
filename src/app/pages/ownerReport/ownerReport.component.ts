import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ownerReport-dashboard',
  templateUrl: './ownerReport.component.html',
  styleUrls: ['./ownerReport.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OwnerReportComponent implements OnInit {
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'yyyy-MM-dd HH:mm:ss',
    defaultOpen: false,
    closeOnSelect: true
  }

  fromDate: Date = new Date();
  toDate: Date = new Date();
  private menuDiv = "hide";
  constructor(private router: Router,private propertiesService: PropertiesService) { }

  ngOnInit() {
  }
  showDiv(event) {
    console.log(event,"#####################")
    this.menuDiv = event
  }
  redirectTo(url){
    this.router.navigateByUrl(url)
  }
  fromDateSelect(event) {
    console.log(event)
    this.fromDate = event
  }
  toDateSelect(event) {
    console.log(event)
    this.toDate = event
  }
  submit() {
    var request = {
      datefrom: this.formatDate(this.fromDate),
      dateto: this.formatDate(this.toDate),
      phone_number: ""
    }
    this.propertiesService.fetchreportdatabetweenpropertyadded(request).subscribe(
      data => {
        
        if (data.status = "true") {
          console.log("success##############")
          window.open("./assets/properties/PropertiesReport.xlsx");
        }
      })
    console.log(request)
  }
  formatDate(date) {
    console.log(date)
    // if(typeof date.getMonth() !== 'function'){
    date = new Date(date)
    // }
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 24;
    hours = hours ? hours : 24; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':00';
    var month = (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1
    console.log((date.getDate()).toString().length)
    var day = (date.getDate()).toString().length == 1 ? "0" + (date.getDate()).toString() : date.getDate()
    console.log(month, "############month", day)
    return (date.getFullYear() + "-" + month + "-" + day + " " + strTime);
  }

}
