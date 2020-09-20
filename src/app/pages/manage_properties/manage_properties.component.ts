/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { PropertiesService } from "src/app/services/properties.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'manage_properties',
    templateUrl: './manage_properties.component.html',
    styleUrls: ['./manage_properties.component.css']
})
export class ManagePropertiesComponent implements OnInit {
    private currentLat
    private currentLong
    private ownerName = "praveen";
    public modelClass = "modal";
    private images = [];
    private latlng = [-25.363882, 131.044922]
    private type = localStorage.getItem("type");
    private username = localStorage.getItem("username");
    private message;
    private properties;
    private occupiedStyle = "btn btn-secondary";
    private availableStyle = "btn btn-success";
    constructor(private router: Router, private sanitization: DomSanitizer, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private propertiesService: PropertiesService) {
        // this.fetchPropertyDetailsById()
        // this.modelClick()
        console.log(this.username)
        localStorage.setItem("pageName","manage")
    }


    ngOnInit() {
        console.log("#$#$#$$#");
        this.getPropertyByOwnerName()
    }
    propertyStatus(property,status) {
        var propertyId=property.id
        console.log(property)
        this.propertiesService.updatePropertyStatus(propertyId,status).subscribe(response=>{
            if(response.status=="true"){
                if(status==1){
                    this.properties=this.properties.map(item=>{
                        if(item.id==propertyId){
                            item.isavailable=1
                        }
                        return item;
                    })
                }else{
                    this.properties=this.properties.map(item=>{
                        if(item.id==propertyId){
                            item.isavailable=0
                        }
                        return item;
                    })
                }
                
            }
        })
    }
    getPropertyByOwnerName() {
        console.log("#################",this.username)
        var request={
            username:this.username
        }
        this.propertiesService.manageProperties(request).subscribe(resp=>{
            console.log(resp,"###################@@@@@@@@@@@@@@@@@@@@@")
            this.properties=resp;
        })
    }
    editProperty(id){
        this.router.navigateByUrl('/editProperty/'+id);
    }
    
}

