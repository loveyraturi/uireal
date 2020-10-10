/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from '@angular/router';
import { AlertService } from "src/app/_services";

import { AdminUserService } from "src/app/services/admin_user.service";
// import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'admin_login',
    templateUrl: './admin_login.component.html',
    styleUrls: ['./admin_login.component.css']
})
export class AdminLoginComponent implements OnInit {
    private password
    private userName;
    private isValid
    private message;


    constructor(private adminUserService: AdminUserService, private alertService: AlertService, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    }

    ngOnInit() {

    }
    success(message: string) {
        this.alertService.success(message);
    }

    error(message: string) {
        this.alertService.error(message);
    }

    info(message: string) {
        this.alertService.info(message);
    }

    warn(message: string) {
        this.alertService.warn(message);
    }

    clear() {
        this.alertService.clear();
    }
    submit() {
        var request = {
            username: this.userName,
            password: this.password,
        }
        this.adminUserService.validate(request).subscribe(
            data => {
                this.isValid = data.status == "true" ? "valid" : "invalid"
                console.log("status#######", data)
                if (data.status == "true") {
                    localStorage.setItem("admin_username", request.username);
                    this.success("Sucessfully logged in")
                    setTimeout(() => this.router.navigateByUrl('/report'), 1500);
                } else {
                    this.warn("Incorrect username and password")
                }
            })
    }
}

