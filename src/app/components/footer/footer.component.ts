/**
 * Created by andrew.yang on 2/6/2017.
 */
import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Login} from "../../models/login";

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html'
})
export class Footer implements OnInit {
    constructor( private router: Router) { }

    ngOnInit() { 
    }
    navigateTo(url) {
        this.router.navigateByUrl('/' + url);
    }
}