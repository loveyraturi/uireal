/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { PropertiesService } from 'src/app/services/properties.service';
@Component({
    selector: 'success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

    private username= localStorage.getItem("username");
    private trxPropertyId= localStorage.getItem("trxPropertyId");
    private trxnId
    private productinfo= localStorage.getItem("trxProductInfo");
    private amount= localStorage.getItem("trxAmount");
    private firstname = localStorage.getItem("trxFirstName");
    private lastname= localStorage.getItem("trxLastName");
    private email= localStorage.getItem("trxEmail");
    private phone= localStorage.getItem("trxPhone");
    constructor(private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
        this.trxnId=this.username+"_"+this.trxPropertyId;
    }

    ngOnInit() {
    }
    
}

