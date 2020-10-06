/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef, Output,EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services";

@Component({
    selector: 'userRegistration',
    templateUrl: './userRegistration.component.html',
    styleUrls: ['./userRegistration.component.css']
})
export class UserRegistrationComponent implements OnInit {
    @Output() registrationDetails: EventEmitter<any> = new EventEmitter<any>();

    private name
    private email
    private phoneNumber
    private password
    private userName;
    private userNameIsValid = ""
    public modelClass1 = "modal1"
    private emailIsValid = ""
    private confirmPasswordIsValid = ""
    private message;
    private format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    private messageUserName = "Please Enter Username";
    private messageResponse;
    private spinner = false;
    constructor(private alertService: AlertService, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        localStorage.setItem("pageName", "registration")
    }

    ngOnInit() {

    }
    success(message: string) {
        this.alertService.success(message);
        setTimeout(() => this.router.navigateByUrl('/login'), 1500);
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
    validateEmail() {
        console.log(this.email)
        if (this.email != undefined) {
            var request = {
                email: this.email
            }
            this.userService.validateEmail(request).subscribe(resp => {
                if (resp.status == "true") {
                    this.messageUserName = "Email already occupied"
                    this.userNameIsValid = "invalid"
                } else {
                    this.messageUserName = "Username is available"
                    this.userNameIsValid = "valid"

                }
                console.log(this.messageUserName, "resp@@@@@@@@@@@@@", resp)
            })
        }
    }
    focusout(type, event: KeyboardEvent) {
        if (type == "userName") {
            if (this.format.test(this.userName)) {
                this.messageUserName = "Username cannot contain special character"
                this.userNameIsValid = "invalid"
            }
            console.log(this.userNameIsValid)
        } else if (type == "email") {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.emailIsValid = re.test(String(this.email).toLowerCase()) ? "valid" : "invalid"
        } 
    }
    closeModal1() {
        this.modelClass1 = "modal1"
        this.router.navigateByUrl('/login');
    }
    modelClick1(value) {
        this.modelClass1 = "modalDisplay1"
        this.messageResponse = value
    }
    submit() {
        this.spinner = true
        var request = {
            name: this.name,
            password: this.password,
            email: this.email,
            deviceId: "",
            status: "active",
            phoneNumber: this.phoneNumber
        }
        this.userService.createUser(request).subscribe(
            data => {
                this.spinner = false;
                console.log("groupdata#######", data)
                if (data.status == "true") {
                    this.message = "Successfully registered"
                    var requestLogin = {
                        email: this.email,
                        password: this.password,
                    }
                    this.userService.validate(requestLogin).subscribe(
                        data => {
                            console.log("status#######", data)
                            if (data.status == "true") {
                                localStorage.setItem("email", request.email);
                                localStorage.setItem("name", data.name);
                                data["email"] = request.email
                                this.registrationDetails.emit(data);
            
                            }
                            else {
                                this.error(data.message)
                            }
                        })
                    this.success(data.message)
                } else {
                    this.message = "Unable to register User"
                    this.error(data.message)
                }


            })
    }
}

