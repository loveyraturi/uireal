import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  public active;
  public username;
  public currentElementIndex = 1;
  public hasAccess = false;
  public level;
  public group;
  loginInfo: Login = {
    user_name: null,
  }
  public users;
  constructor(private userService: UserService, private router: Router) {
    this.fetchUsers();

    // this.phonenumber=localStorage.getItem("phone_number")

  }
  ngOnInit() {

    this.username = localStorage.getItem("user_name")
    this.level = localStorage.getItem("level")
    this.group = localStorage.getItem("group")
    if (this.level == 9) {
      this.hasAccess = true;
    }
    this.loginInfo.user_name = this.username;
    console.log(this.username)

  }

  fetchUsers() {
    this.userService.fetchUser().subscribe(
      data => {
        console.log(data)
        this.users = data
        this.users = this.users.filter(item => {
          if (item.usergroup == this.group) {
            return item
          }
        })
        if (this.level == 7) {
          this.users = this.users.map(item => {
            if (item.status == "Active") {
              item.enable = true
            } else {
              item.enable = false
            }
            return item
          })
        } else {
          this.users = this.users.map(item => {
            if (item.status == "Active") {
              item.enable = true
            } else {
              item.enable = false
            }
            return item
          })
        }
        console.log(this.users)

      })
  }
  updateUser(fullName) {
    console.log(this.active, "%$#@%$@#$", fullName)
    localStorage.setItem("update_name", fullName);
    this.router.navigateByUrl("/updateUser")
  }
  onChange(event, id) {
    console.log("###############", event)
    if (event) {
      this.active = "Active"
    } else {
      this.active = "Inactive"
    }
  
    this.userService.updateUserStatus(id,this.active).subscribe(
      data => {
        this.fetchUsers()
      })

  }
  cloneUser(fullName) {
    console.log("%$#@%$@#$", fullName)
    localStorage.setItem("clone_name", fullName);
    this.router.navigateByUrl("/cloneUser")
  }
  addNew() {
    this.router.navigateByUrl("/createUser")
  }

}
