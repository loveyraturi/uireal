/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services";
import { PropertiesService } from 'src/app/services/properties.service';
import { timeStamp } from 'console';

@Component({
    selector: 'tenantsRequirements',
    templateUrl: './tenantsRequirements.component.html',
    styleUrls: ['./tenantsRequirements.component.css']
})
export class TenantsRequirementsComponent implements OnInit {
    @Output() responseProperties: EventEmitter<any> = new EventEmitter<any>();
    @Input() address: string;

    private name
    private email = localStorage.getItem("email");
    private phoneNumber
    private password
    private userName;
    private userNameIsValid = ""
    public modelClass1 = "modal1"
    private emailIsValid = ""
    private confirmPasswordIsValid = ""
    private message;
    private format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    private messageUserName = "Please Enter Username";
    private messageResponse;
    private spinner = false;
    private minArea;
    private maxArea;
    isSelectedSortPricel2h = ""
    isSelectedSortPriceh2l = ""
    isSelectedSortPriceAreal2h = ""
    isSelectedSortPriceAreah2l = ""
    isSelectedFlat = ""
    isSelectedRowHouse = ""
    isSelectedPG = ""
    isSelectedRowHostel = ""
    isSelected1 = ""
    isSelected2 = ""
    isSelected3 = ""
    isSelected4 = ""
    isSelected5more = ""
    isSelectedFullyFurnished = ""
    isSelectedSemiFurnished = ""
    isSelectedUnFurnished = ""
    locality;
    state;
    city;
    public modelClass = "modal";

    response = {}
    flat = ""
    rowHouse = ""
    PG = ""
    hostel = ""
    BHK1 = ""
    BHK2 = ""
    BHK3 = ""
    BHK4 = ""
    BHK5more = ""
    fullyFurnished = ""
    semiFurnished = ""
    unFurnished = ""
    localityDropdown: any[];
    cityLocalityData: any;
    messageBHK: string;
    messageProperty: string;
    messageMinimimPrice: string;
    messageMaximumPrice: string;
    messageError: boolean=false;
    messageLocality: string;
    messageCity: string;
    messageErrorBHK: boolean=false;
    messageErrorProperty: boolean =false;
    messageErrorLocality: boolean =false;
    messageErrorMinimumPrice: boolean =false;
    messageErrorMaxPrice: boolean =false;
    messageErrorCity: boolean =false;

    constructor(private alertService: AlertService, private router: Router, private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
        localStorage.setItem("pageName", "registration")

console.log(this.email,"##################");
        if(this.email==undefined || this.email==""){
            this.modelClass = "modalDisplay"
            this.message=" Please login to submit your request"
            setTimeout(() => this.router.navigateByUrl('/login'), 1500);
           
        }
    }

    ngOnInit() {

    }
    selectedSortPricel2h() {
        if (this.isSelectedSortPricel2h == "") {
            this.isSelectedSortPricel2h = "selectedSortPricel2h"
            this.isSelectedSortPriceh2l = ""
            this.isSelectedSortPriceAreal2h = ""
            this.isSelectedSortPriceAreah2l = ""


        } else {
            this.isSelectedSortPricel2h = ""
        }
    }
    selectedSortPriceh2l() {
        if (this.isSelectedSortPriceh2l == "") {
            this.isSelectedSortPriceh2l = "selectedSortPriceh2l"
            this.isSelectedSortPricel2h = ""
            this.isSelectedSortPriceAreal2h = ""
            this.isSelectedSortPriceAreah2l = ""
        } else {
            this.isSelectedSortPriceh2l = ""
        }
    }

    selectedSortPriceAreal2h() {
        if (this.isSelectedSortPriceAreal2h == "") {
            this.isSelectedSortPriceAreal2h = "selectedSortPriceAreal2h"
            this.isSelectedSortPriceh2l = ""
            this.isSelectedSortPricel2h = ""
            this.isSelectedSortPriceAreah2l = ""
        } else {
            this.isSelectedSortPriceAreal2h = ""
        }
    }
    selectedSortPriceAreah2l() {
        if (this.isSelectedSortPriceAreah2l == "") {
            this.isSelectedSortPriceAreah2l = "selectedSortPriceAreah2l"
            this.isSelectedSortPriceAreal2h = ""
            this.isSelectedSortPriceh2l = ""
            this.isSelectedSortPricel2h = ""
        } else {
            this.isSelectedSortPriceAreah2l = ""
        }
    }

    selectMinPrice(value) {
        this.response["minPrice"] = value

    }
    selectMaxPrice(value) {
        this.response["maxPrice"] = value

    }
    selectMinArea(value) {
        console.log(value)
        this.response["minArea"] = value

    }
    selectMaxArea(value) {
        this.response["maxArea"] = value

    }
    selectedFlat() {
        if (this.isSelectedFlat == "") {
            this.isSelectedFlat = "selectedFlat"
            this.isSelectedRowHouse = ""
            this.isSelectedPG = ""
            this.isSelectedRowHostel = ""
            this.response["propertyType"] = "flat"
        } else {
            this.isSelectedFlat = ""
            this.response["propertyType"] = ""
        }
    }
    selectedRowHouse() {
        if (this.isSelectedRowHouse == "") {
            this.isSelectedRowHouse = "selectedRowHouse"
            this.isSelectedFlat = ""
            this.isSelectedPG = ""
            this.isSelectedRowHostel = ""
            this.response["propertyType"] = "row_house"
        } else {
            this.isSelectedRowHouse = ""
            this.response["propertyType"] = ""

        }
    }
    selectedPG() {
        if (this.isSelectedPG == "") {
            this.isSelectedPG = "selectedPG"
            this.isSelectedFlat = ""
            this.isSelectedRowHouse = ""
            this.isSelectedRowHostel = ""
            this.response["propertyType"] = "pg"

        } else {
            this.isSelectedPG = ""
            this.response["propertyType"] = ""

        }
    }
    selectedRowHostel() {
        if (this.isSelectedRowHostel == "") {
            this.isSelectedRowHostel = "selectedRowHostel"
            this.isSelectedFlat = ""
            this.isSelectedRowHouse = ""
            this.isSelectedPG = ""
            this.response["propertyType"] = "hostel"
        } else {
            this.isSelectedRowHostel = ""
            this.response["propertyType"] = ""
        }
    }
    selected1() {
        if (this.isSelected1 == "") {
            this.isSelected1 = "selected1"
            this.isSelected2 = ""
            this.isSelected3 = ""
            this.isSelected4 = ""
            this.isSelected5more = ""

            this.response["propertyBHK"] = "1bhk"
        } else {
            this.isSelected1 = ""
            this.response["propertyBHK"] = ""
        }
    }
    selected2() {
        if (this.isSelected2 == "") {
            this.isSelected2 = "selected2"
            this.isSelected1 = ""
            this.isSelected3 = ""
            this.isSelected4 = ""
            this.isSelected5more = ""
            this.response["propertyBHK"] = "2bhk"
        } else {
            this.isSelected2 = ""
            this.response["propertyBHK"] = ""
        }
    }
    selected3() {
        if (this.isSelected3 == "") {
            this.isSelected3 = "selected3"
            this.isSelected1 = ""
            this.isSelected2 = ""
            this.isSelected4 = ""
            this.isSelected5more = ""
            this.response["propertyBHK"] = "3bhk"
        } else {
            this.isSelected3 = ""
            this.response["propertyBHK"] = ""
        }
    }
    selected4() {
        if (this.isSelected4 == "") {
            this.isSelected4 = "selected4"
            this.isSelected1 = ""
            this.isSelected2 = ""
            this.isSelected3 = ""
            this.isSelected5more = ""
            this.response["propertyBHK"] = "4bhk"
        } else {
            this.isSelected4 = ""
            this.response["propertyBHK"] = ""
        }
    }
    selected5more() {
        if (this.isSelected5more == "") {
            this.isSelected5more = "selected5more"
            this.isSelected1 = ""
            this.isSelected2 = ""
            this.isSelected3 = ""
            this.isSelected4 = ""
            this.response["propertyBHK"] = "5bhk"
        } else {
            this.isSelected5more = ""
            this.response["propertyBHK"] = ""

        }
    }
    selectedFullyFurnished() {
        if (this.isSelectedFullyFurnished == "") {
            this.isSelectedFullyFurnished = "selectedFullyFurnished"
            this.isSelectedSemiFurnished = ""
            this.isSelectedUnFurnished = ""
            this.response["furnishType"] = "fully_furnished"
        } else {
            this.isSelectedFullyFurnished = ""
            this.response["furnishType"] = ""

        }
    }
    selectedSemiFurnished() {
        if (this.isSelectedSemiFurnished == "") {
            this.isSelectedSemiFurnished = "selectedSemiFurnished"
            this.isSelectedFullyFurnished = ""
            this.isSelectedUnFurnished = ""
            this.response["furnishType"] = "semi_furnished"

        } else {
            this.isSelectedSemiFurnished = ""
            this.response["furnishType"] = ""
        }
    }
    selectedUnFurnished() {
        if (this.isSelectedUnFurnished == "") {
            this.isSelectedUnFurnished = "selectedUnFurnished"
            this.isSelectedFullyFurnished = ""
            this.isSelectedSemiFurnished = ""
            this.response["furnishType"] = "un_furnished"

        } else {
            this.isSelectedUnFurnished = ""
            this.response["furnishType"] = ""

        }
    }
    selectPreference(value) {
        this.response["preference"] = value

    }


    success(message: string) {
        this.alertService.success(message);
        setTimeout(() => this.router.navigateByUrl('/login'), 1500);
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
    closeModal() {
        this.modelClass = "modal"
    }
    clear() {
        this.alertService.clear();
    }
    modelClickRegister(message) {
        console.log(this.email, "model id is ")
        this.modelClass = "modalDisplay"
        this.message = "Successfully submitted requirements.Our team will contact you soon"
    }
    submit() {
        this.messageError=false;
        this.messageErrorBHK=false;
        this.messageErrorProperty=false;
        this.messageErrorLocality=false;
        this.messageErrorMinimumPrice=false
        this.messageErrorMaxPrice=false;
        this.messageErrorCity=false;
        this.response["minArea"] = this.minArea
        this.response["maxArea"] = this.maxArea
        this.response["city"] = this.city
        this.response["locality"] = this.locality
        this.response["state"] = this.state
        this.response["email"] = this.email
        this.response["propertyBHK"] = this.response["propertyBHK"] 
        this.response["propertyType"]= this.response["propertyType"]
        this.response["minPrice"]= this.response["minPrice"]
        this.response["maxPrice"]= this.response["maxPrice"]


        if(this.response["minPrice"]==undefined){
           // this.modelClass = "modalDisplay"
           this.messageErrorMinimumPrice=true;
            this.messageMinimimPrice=" Enter Min Price"
             
        }
        if(this.response["maxPrice"]==undefined){
            this.messageErrorMaxPrice=true;
          //  this.modelClass = "modalDisplay"
            this.messageMaximumPrice="Enter Max Price"
            
        }
        if(this.response["minArea"]==undefined){
           // this.modelClass = "modalDisplay"
            this.message=" Please Enter Maximum Area"
            
        }
        if(this.response["maxArea"]==undefined){
           // this.modelClass = "modalDisplay"
            this.message=" Please Enter Maximum Area"
            
        }
        if(this.city==undefined){
           // this.modelClass = "modalDisplay"
           this.messageErrorCity=true;
            this.messageCity=" Please Enter City"
            
        }
        if(this.locality==undefined){
          //  this.modelClass = "modalDisplay"
          this.messageErrorLocality=true;
            this.messageLocality=" Please Enter Locality"
            
        }
        if(this.state==undefined){
         //   this.modelClass = "modalDisplay"
            this.message=" Please Enter state"
            
        }
        if(this.response["propertyType"]==undefined){
         //   this.modelClass = "modalDisplay"
         this.messageErrorProperty=true;
            this.messageProperty=" Please Select Property Type"
            
        }
        if(  this.response["propertyBHK"]==undefined){
         //   this.modelClass = "modalDisplay"
         this.messageErrorBHK=true;
            this.messageBHK=" Please Select Property BHK"
            
        }

if(this.messageErrorBHK ||
    this.messageErrorProperty ||
    this.messageErrorLocality ||
    this.messageErrorMinimumPrice ||
    this.messageErrorMaxPrice || this.messageErrorCity){
        this.messageError=true;
    }
        console.log(this.response,"#@#@#@@#@@#@",this.address)
        // this.propertiesService.filter(this.response).subscribe(items => {
        //     console.log(items)
        //     this.responseProperties.emit(items);
        // })
        if(!this.messageError){
            this.spinner=true

            this.propertiesService.matchRequirements(this.response).subscribe(
                data => {
                    this.spinner=false
                    console.log("groupdata#######", data)
                    if (data.status == "true") {
                        this.modelClickRegister("Successfully added Property")
                    } else {
                        this.modelClickRegister("Unable to added Property")
                    }
    
                })
        }
     
    }

    selectCity(value) {
        this.localityDropdown=[]
        console.log(value)
        this.city=value
      //  this.localityDropdown=this.cityLocalityData[value]

    }
}

