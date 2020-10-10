/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, EventEmitter, ViewContainerRef, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from '@angular/router';
import { AlertService } from "src/app/_services";
// import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'userLogin',
    templateUrl: './userLogin.component.html',
    styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent implements OnInit {
    @Output() loginDetails: EventEmitter<any> = new EventEmitter<any>();
    @Input() redirect: boolean;

    private password
    private email;
    private isValid
    private message;
    public modelClass = "modal";
	private modelClass3 = "modal3"


    constructor(private alertService: AlertService, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        localStorage.setItem("pageName", "login")
        const type = "success"

        // this._service.success("title", "hi there",NotificationType.Success)
        // this._service.success(title?: any, content?: any, override?: any, context?: any);
    }

    ngOnInit() {

    }
    modelClick() {
        this.modelClass = "modalDisplay"

    }
    forgetPassword() {
        this.router.navigateByUrl("/forgot-password")
    }
    closeModal() {
        this.modelClass = "modal"
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
    modelClick3() {
		this.modelClass3 = "modalDisplay3"
	}
	closeModal3() {
		this.modelClass3 = "modal3"
    }
    registrationDetailsReceived(data){
        this.loginDetails.emit(data);
    }
    submit() {
        this.clear()
        var request = {
            email: this.email,
            password: this.password,
        }
        this.userService.validate(request).subscribe(
            data => {
                this.isValid = data.status == "true" ? "valid" : "invalid"
                console.log("status#######", data)
                // this.message = data.message
                if (data.status == "true") {
                    localStorage.setItem("email", request.email);
                    localStorage.setItem("name", data.name);
                    data["email"]=request.email
                    this.loginDetails.emit(data);


                }
                console.log(this.isValid)
                if (this.isValid == "valid") {
                    this.success(data.message)
                    // if (data.type == "owner") {
                    if (this.redirect) {
                        setTimeout(() => this.router.navigateByUrl('/main'), 1500);
                    }
                    // } else {
                    // setTimeout(() =>  this.router.navigateByUrl('/main'),1500);
                    // }
                } else {
                    this.error(data.message)
                }
            })
    }
}

