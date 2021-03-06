/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services";
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    @Output() responseProperties: EventEmitter<any> = new EventEmitter<any>();
    @Input() address: string;

    private name
    private email
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
    isSelected1RK = ""
    isSelectedStudio = ""
    isSelected1 = ""
    isSelected2 = ""
    isSelected3 = ""
    isSelected4 = ""
    isSelected5more = ""
    isSelectedFullyFurnished = ""
    isSelectedSemiFurnished = ""
    isSelectedUnFurnished = ""

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

    constructor(private alertService: AlertService, private router: Router, private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
        localStorage.setItem("pageName", "registration")
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
    selected1RK() {
        if (this.isSelected1RK == "") {
            this.isSelected1RK = "selected1RK"
            this.isSelectedStudio = ""
            this.isSelected1 = ""
            this.isSelected2 = ""
            this.isSelected3 = ""
            this.isSelected4 = ""
            this.isSelected5more = ""
            this.response["propertyBHK"] = "1RK"
        } else {
            this.isSelected1RK = ""
            this.response["propertyBHK"] = ""
        }
    }
    selectedStudio() {
        if (this.isSelectedStudio == "") {
            this.isSelected1RK = ""
            this.isSelectedStudio = "selectedStudio"
            this.isSelected1 = ""
            this.isSelected2 = ""
            this.isSelected3 = ""
            this.isSelected4 = ""
            this.isSelected5more = ""
            this.response["propertyBHK"] = "Studio"
        } else {
            this.isSelectedStudio = ""
            this.response["propertyBHK"] = ""
        }
    }
    selected1() {
        if (this.isSelected1 == "") {
            this.isSelected1RK = ""
            this.isSelectedStudio = ""
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
            this.isSelected1RK = ""
            this.isSelectedStudio = ""
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
            this.isSelected1RK = ""
            this.isSelectedStudio = ""
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
            this.isSelected1RK = ""
            this.isSelectedStudio = ""
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
            this.isSelected1RK = ""
            this.isSelectedStudio = ""
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

    clear() {
        this.alertService.clear();
    }
    search() {
        this.response["minArea"] = this.minArea
        this.response["maxArea"] = this.maxArea
        this.response["address"] = this.address
        console.log(this.response,"#@#@#@@#@@#@",this.address)
        this.propertiesService.filter(this.response).subscribe(items => {
            console.log(items)
            this.responseProperties.emit(items);
        })
    }
}

