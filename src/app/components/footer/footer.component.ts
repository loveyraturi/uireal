/**
 * Created by andrew.yang on 2/6/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import {Login} from "../../models/login";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']

})
export class Footer implements OnInit {
    constructor( private router: Router, public userService:UserService) { }
    public name;
    public mobile;
    public message;
  
    ngOnInit() { 
    }
    navigateTo(url) {
        this.router.navigateByUrl('/' + url);
    }

    submit(){
        let data={
            name:this.name,
            mobile: this.mobile,
            message:this.message

        }
        this.userService.validateMessage(data).subscribe(resp => {
            if (resp.status == "true") {
                this.message="message set successfully";
                setTimeout(function() {
                    this.message = false;
                    
                }, 3000);
               
            } else {
                

            }
        })

    }
}