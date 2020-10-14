import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public loggedInUserName=localStorage.getItem("name");
  public loggedInEmailId=localStorage.getItem("email");
  public loggedPhoneNo=localStorage.getItem("phoneNumber");


  constructor() { }

  ngOnInit() {

  }

}
