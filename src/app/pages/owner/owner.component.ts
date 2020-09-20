/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { Login } from "src/app/models/login";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";

@Component({
    selector: 'owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
    public username;
    public registerform: any = FormGroup;
    public group;
    public level;
    public number = "";
    public modelClass = "modal";
    public callStatus="call";
    public count=1;

    constructor(private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
    }

    ngOnInit() {

        this.username = localStorage.getItem("user_name")
        this.group = localStorage.getItem("group")
        this.level = localStorage.getItem("level")
        console.log(this.username)
        this.createForm()

    }
    entered(value) {
        this.number = this.number + value
    }
    submit() {
        this.count=this.count+1
        if(this.count%2==0){
            this.callStatus="Hangup"
            this.modelClick()
        }else{
            this.callStatus="Call"
        }
        
        // var request = {
        //     number: this.number
        // }
        // this.agentService.dialCall(request).subscribe(resp => {
        //     console.log(resp, "###############")
        // })
    }
    closeModal() {
        this.callStatus="Call"
        this.modelClass = "modal"
    }
    modelClick() {
        console.log("model id is ")
        // this.fetchLiveUserFromCampaing(id);
        this.modelClass = "modalDisplay"

    }
    // submitFeedBack({ value }: any) {
    //     console.log(value,"$@$@$$@$@$@@$@$")
    //     this.agentService.feedback(value).subscribe(resp => {
    //         console.log(resp, "###############")
    //     })
    // }
    private createForm(): void {
        this.registerform = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            address: new FormControl('', Validators.required),
            phonenumber: new FormControl('', Validators.required),
            vid: new FormControl('', Validators.required),
            mname: new FormControl('', Validators.required),
            lname: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            fname: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            hno: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            comment: new FormControl('', Validators.required),
        });
    }
}

