/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from '@angular/router';
import { AlertService } from "src/app/_services";
// import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private password
    private userName;
    private isValid
    private message;
    public modelClass = "modal";


    constructor(private alertService: AlertService,private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
        localStorage.setItem("pageName","login")
        const type="success"
        
        // this._service.success("title", "hi there",NotificationType.Success)
        // this._service.success(title?: any, content?: any, override?: any, context?: any);
    }

    ngOnInit() {

    }
    modelClick() {
        this.modelClass = "modalDisplay"
        
    }
    forgetPassword(){
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
    submit() {
        var request = {
            username: this.userName,
            password: this.password,
        }
        this.userService.validate(request).subscribe(
            data => {
                this.isValid = data.status == "true" ? "valid" : "invalid"
                console.log("status#######", data)
                // this.message = data.message
                
                localStorage.setItem("username", request.username);
                localStorage.setItem("type", data.type);
                if (this.isValid == "valid") {
                    this.success(data.message)
                    localStorage.setItem("username", this.userName);
                    if (data.type == "owner") {
                        setTimeout(() =>  this.router.navigateByUrl('/main'),1500);                       
                    } else {
                        setTimeout(() =>  this.router.navigateByUrl('/main'),1500);
                    }
                }else{
                    this.error(data.message)
                }
            })
    }
}

