/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from 'src/app/_services';
@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    private username = localStorage.getItem("username");
    private email;
    private uuid;
    private password;
    private confpassword;
    constructor(private alertService: AlertService,private router: Router, private _activatedRoute: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) {
        console.log(window.location.hostname);
        this.email = this._activatedRoute.snapshot.params.email
        this.uuid = this._activatedRoute.snapshot.params.uuid

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
    resetPassword() {
        var request = {
            email: this.email,
            password: this.password,
            uuid: this.uuid
        }
        this.userService.resetPassword(request).subscribe(response => {
            if (response.status == "true") {
                this.success("SuccessFully updated password")
                setTimeout(() =>  this.router.navigateByUrl('/login'),2500);                       
            } else {
                this.error(response.message)
            }
        })
    }
}

