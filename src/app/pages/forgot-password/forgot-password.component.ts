/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AlertService } from 'src/app/_services';
@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    private username = localStorage.getItem("username");
    private email;
    constructor(private alertService: AlertService, private userService: UserService, private formBuilder: FormBuilder) {
        console.log(window.location.hostname);
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
            to: this.email,
            from: "loveyraturi@gmail.com",
            subject: "RESET PASSWORD OWNERTENANTS",
            type: "passwordReset",
            hostName: window.location.hostname
        }
        this.userService.sendEmail(request).subscribe(response => {
            if (response.status == "true") {
                this.success("Email has been sent to your email address.")
            } else {
                this.error(response.message)
            }
        })
    }
}

