/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { Login } from "src/app/models/login";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import { sha512 } from 'js-sha512';
import { Router } from "@angular/router";
@Component({
    selector: 'payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

    // private username= localStorage.getItem("username");
    // private trxPropertyId= localStorage.getItem("trxPropertyId");
    // private trxnId
    // private productinfo= localStorage.getItem("trxProductInfo");
    // private amount= localStorage.getItem("trxAmount");
    // private firstname = localStorage.getItem("trxFirstName");
    // private lastname= localStorage.getItem("trxLastName");
    // private email= localStorage.getItem("trxEmail");
    // private phone= localStorage.getItem("trxPhone");
    private trxPropertyId = "2";
    private trxnId
    private messageResponse
    private productinfo = "subscription";
    private firstname = "praveen";
    private lastname = "raturi";
    private email = "loveyraturi@gmail.com";
    private phone = "8193971153";
    private surl = "https://ownertenants.com/realestate/realestate/afterPayment"
    private furl = "https://ownertenants.com/realestate/realestate/afterPayment"
    private curl = "https://ownertenants.com/realestate/realestate/afterPayment"
    // private salt = "eCwWELxi"
    // private key = "gtKFFx"
    private salt = "jT93ctkGoH"
    public modelClass1 = "modal1"
    private key = "twcFzBIH"
    private hash
    paymentType = localStorage.getItem("paymentType");
    paymentPlan = localStorage.getItem("paymentPlan");
    paymentPrice = localStorage.getItem("paymentPrice");
    // private type = localStorage.getItem("type");
    private emailuser = localStorage.getItem("email");
    private currentDate = new Date();
    constructor(private router: Router,private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
        this.trxnId = this.emailuser + "_" + this.paymentPlan+"_"+this.paymentType;
        var hashString = this.key + "|" + this.trxnId + "|" + this.paymentPrice + "|" + this.productinfo + "|" + this.firstname + "|" + this.email + "|||||||||||" + this.salt
        // this.hash = sha512.create().update(hashString).hex()
        this.hash = sha512(hashString)
    }

    ngOnInit() {
    }
    closeModal1() {
        this.modelClass1 = "modal1"
        this.router.navigateByUrl('/main');
    }
    modelClick1(value) {
        this.modelClass1 = "modalDisplay1"
        this.messageResponse=value
    }
    payNow() {
            var request = {
                key: this.key,
                txnid: this.trxnId,
                amount: this.paymentPrice,
                productinfo: this.productinfo,
                firstname: this.firstname,
                email: this.email,
                phone: this.phone,
                lastname: this.lastname,
                surl: this.surl,
                furl: this.furl,
                curl: this.curl,
                hash: this.hash,
                service_provider: "payu_paisa"
            }
            var mapForm = document.createElement("form");
            mapForm.target = "_blank";
            mapForm.method = "POST"; // or "post" if appropriate
            // mapForm.action = "https://sandboxsecure.payu.in/_payment";
            mapForm.action = "https://secure.payu.in/_payment"
            Object.keys(request).forEach(function (param) {
                var mapInput = document.createElement("input");
                mapInput.type = "hidden";
                mapInput.name = param;
                mapInput.setAttribute("value", request[param]);
                mapForm.appendChild(mapInput);
            });
            document.body.appendChild(mapForm);
            mapForm.submit();
        
    }

}

