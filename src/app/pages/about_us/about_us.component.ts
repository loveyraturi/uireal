/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
@Component({
    selector: 'about_us',
    templateUrl: './about_us.component.html',
    styleUrls: ['./about_us.component.css']
})
export class AboutUsComponent implements OnInit {

    private username= localStorage.getItem("username");
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }
    
}

