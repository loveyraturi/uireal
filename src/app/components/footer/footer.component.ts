/**
 * Created by andrew.yang on 2/6/2017.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { Login } from "../../models/login";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']

})
export class Footer implements OnInit {
    constructor(private router: Router, public userService: UserService) { }
    public name;
    public mobile;
    public message;
    public email;
	public modelClass = "modal";
    private modelClass6 = "modal6"

    popupMessage ="Message Successfully sent";

    ngOnInit() {
        
    }
    navigateTo(url) {
        this.router.navigateByUrl('/' + url);
    }
    modelClick6() {
		this.modelClass6 = "modalDisplay6"
    }
    closeModal6() {
		this.modelClass6 = "modal6"
		// this.router.navigateByUrl("/main")
	}
    modelClick() {
		this.modelClass = "modalDisplay"
	}
	closeModal() {
		this.modelClass = "modal"
		// this.router.navigateByUrl("/main")
	}
    submit() {
        this.modelClick6()
        if (this.email == undefined) {
            this.popupMessage = " please enter email"
        } else {
            if (this.message == null) {
                this.popupMessage = " please enter some message"
            }
            else {
                let data = {
                    subject: "Enquiry",
                    name: this.name,
                    content: "From " + this.name + " \n Mob." + this.mobile + " \n " + this.message,
                    to: this.email,
                    type: "Enquiry"
                }
                this.userService.sendEmail(data).subscribe(resp => {
                    this.closeModal6()
                    if (resp.status == "true") {
                        this.modelClick()
                    } else {
                        this.modelClick()
                        this.popupMessage=resp.message
                    }
                },
                err => {
                    this.closeModal6()
                })
            }
        }
    }
}