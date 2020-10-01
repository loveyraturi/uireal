/**
 * Created by andrew.yang on 2/6/2017.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Login } from "../../models/login";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class Navigation implements OnInit {
    @Input() loginInfo: Login;
    @Input() username: string;
    
    private pageName=localStorage.getItem("pageName")
    private modelType;
    private registerMessage = "Login"
    public modelClass4 = "modal4";
    public loginMessage = "Signup/Login"
    public isLogin = false
    public showMain=true;
    public showMenuBar=""
    private screenHeight=screen.height
    // public username = localStorage.getItem("username")==undefined?"":localStorage.getItem("username");
    public type = localStorage.getItem("type")==undefined?"":localStorage.getItem("type");
    constructor(private router: Router) {
        console.log("PAGAAGUIGAUIGA#############",this.pageName);
        this.showMain=this.pageName=="main"?false:true
        this.username=localStorage.getItem("name")==undefined?"":localStorage.getItem("name");
        console.log(this.username != undefined,this.username , "###########EEhhhhEEEEEEEELOGININININI#####@@@###", this.isLogin)

     }

    ngOnInit() {
        this.username=localStorage.getItem("name")==undefined?"":localStorage.getItem("name");
        console.log(this.username != undefined,this.username , "###########EEEEEEEEEELOGININININI#####@@@###", this.isLogin)
        if (this.username == "") {
            console.log("EEEEETRUE#EEEEEEEEEEEEEEEEE$#$#$")
            this.registerMessage = "Login"
            this.isLogin = false
        } else {
            this.loginMessage = this.username
            console.log("EEEEE############TRUE#$#$#$")
            this.registerMessage = this.username
            this.isLogin = true

        }
        
    }
    showMenu(value){
        console.log(value)
        if(value=="showMenuBar"){
            this.showMenuBar=""

        }else{
            this.showMenuBar="showMenuBar"

        }
    }
    closeModal4() {
        this.modelClass4 = "modal4"
    }
    modelClick4(value) {
        console.log(value)
        console.log(this.pageName,"#@@@#########################")
        this.modelType = value
        this.modelClass4 = "modalDisplay4"
    }
    activeRoute(routename: string): boolean {
        return this.router.url.indexOf(routename) > -1;
    }
    signup() {
        this.router.navigateByUrl('/registration');
    }
    login() {
        this.router.navigateByUrl('/login');
    }
    logout() {
        console.log("############@@@@@@@@@@")
        localStorage.setItem("name", "");
        localStorage.setItem("email", "");
        this.router.navigateByUrl('/login');
    }
    navigateTo(url) {
        this.router.navigateByUrl('/' + url);
    }
    subscribe(plan,price){
        console.log("############@@@@@@@@@@",plan)
        // localStorage.setItem("paymentType", type);
        localStorage.setItem("paymentPlan", plan);
        localStorage.setItem("paymentPrice", price);
        this.router.navigateByUrl('/payment');

    }
}