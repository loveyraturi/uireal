/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services";

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    private firstName
    private lastName
    private email
    private phoneNumber
    private password
    private confirmPassword
    private userName;
    private userType;
    private userNameIsValid = ""
    public modelClass1 = "modal1"
    private emailIsValid = ""
    private confirmPasswordIsValid = ""
    private message;
    private format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    private messageUserName = "Please Enter Username";
    private messageResponse;
    private spinner=false;
    constructor(private alertService: AlertService,private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        localStorage.setItem("pageName","registration")
    }

    ngOnInit() {

    }
    success(message: string) { 
        this.alertService.success(message);
        this.router.navigateByUrl('/login');
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
    typeSelected(event){
        this.userType=event
        console.log(this.userType)
    }
    validateUsername() {
        console.log(this.userName)
        if (this.userName != undefined){
            var request = {
                username: this.userName
            }
            this.userService.validateUserName(request).subscribe(resp => {
                if (resp.status == "true") {
                    this.messageUserName = "Username already occupied"
                    this.userNameIsValid="invalid"
                } else{
                    console.log("@#@#@#@@@",this.format.test(this.userName))
                    if(this.format.test(this.userName)){
                        this.messageUserName = "Username cannot contain special character"
                        this.userNameIsValid="invalid"
                    }else{
                        this.messageUserName = "Username is available"
                        this.userNameIsValid="valid"
                    }
                }
                console.log(this.messageUserName,"resp@@@@@@@@@@@@@", resp)
            })
        }
    }
    focusout(type, event: KeyboardEvent) {
        if (type == "userName") {
            if(this.format.test(this.userName)){
                this.messageUserName = "Username cannot contain special character"
                this.userNameIsValid="invalid"
            }
            // console.log(type, this.userName);
            // var regex = /^[A-Za-z0-9 ]+$/
            // //Validate TextBox value against the Regex.
            // var username = this.userName
            // var isValid = regex.test(this.userName);
            // this.userNameIsValid = isValid ? "invalid" : "valid"
            console.log(this.userNameIsValid)
        } else if (type == "email") {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.emailIsValid = re.test(String(this.email).toLowerCase()) ? "valid" : "invalid"
        } else if (type == "confirmPassword") {
            this.confirmPasswordIsValid = this.password == this.confirmPassword ? "valid" : "invalid"
        }

    }
    closeModal1() {
        this.modelClass1 = "modal1"
        this.router.navigateByUrl('/login');
    }
    modelClick1(value) {
        this.modelClass1 = "modalDisplay1"
        this.messageResponse=value
    }
    submit() {
        this.spinner=true
        var request = {
            fullName: this.firstName + " " + this.lastName,
            username: this.userName,
            password: this.password,
            email: this.email,
            deviceId: "",
            status: "active",
            type: this.userType,
            phoneNumber: this.phoneNumber
        }
        this.userService.createUser(request).subscribe(
            data => {
                this.spinner=false;
                console.log("groupdata#######", data)
                if (data.status == "true") {
                    this.message = "Successfully registered"
                    this.success(data.message)
                } else {
                    this.message = "Unable to register User"
                    this.error(data.message)
                }
            })
    }
}
