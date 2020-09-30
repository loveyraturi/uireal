/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef, ViewChild } from "@angular/core";
import { Login } from "src/app/models/login";
import { UserService } from "src/app/services/user.service";
import { PropertiesService } from "src/app/services/properties.service";
import { Router } from "@angular/router";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    // @ViewChild("placesRef") placesRef : GooglePlaceDirective;
    private size;
    private price;
    private myMinVar = 0;
    private furnishFilterValue;
    private bedroomFilterValue;
    private bathroomFilterValue;
    private garageFilterValue;
    private serchFor = "RENT";
    private styleRent = "selected-style-rent"
    private styleBuy = "selected-style-buy"
    private currentLat;
    private currentLong;
    private addressSelected;
    private addressList;
    private propertyTypes;
    private modelClass5;
    private propertyBhk
    private properties;
    private dropdownMenu = "drop"
    private showSecondarySearch = false;
    private city;
    private type;
    private range;
    private address;
    private username = localStorage.getItem("username");
    constructor(private router: Router, private propertiesService: PropertiesService, private userService: UserService) {
        localStorage.setItem("pageName", "mainPage")
        //  this.openNewDialog();
        // this.phonenumber=localStorage.getItem("phone_number")
        this.getGeoLocation()
    }

    ngOnInit() {
    }
    getGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                this.currentLat = latitude
                this.currentLong = longitude
            });
        } else {
            console.log("No support for geolocation")
        }
    }
    public handleAddressChange(address: Address) {
        console.log(address)
    }
    modelClick5() {
        this.modelClass5 = "modalDisplay5"
        console.log("clickedd$$$")
    }
    closeModal5() {
        this.modelClass5 = "modal5"

    }

    showDiv() {
        this.dropdownMenu = "drop";

    }
    hideDiv() {
        this.dropdownMenu = "elementDrop";
    }
    propertyType(type, size) {
        this.propertyTypes = type;
        this.propertyBhk = size;
        this.dropdownMenu = "elementDrop";
    }
    submit() {
        if (this.addressSelected == undefined || this.addressSelected == "") {
            if (this.propertyTypes == undefined || this.propertyTypes == "") {
                if (this.price == undefined || this.price == "") {
                    this.modelClick5()
                    return;
                }
            }
        }
        console.log("STILL EXECUTING")
        var search = {
            address: this.addressSelected,
            type: this.propertyTypes,
            propertyBhk: this.propertyBhk,
            priceRange: this.price,
            latitude: this.currentLat,
            longitude: this.currentLong
        }
        localStorage.setItem("propertyDetail", JSON.stringify(search));
        console.log(search);
        this.router.navigateByUrl('/home');
    }
    searchAddress(event) {
        console.log(event, "##ADDRESSSEARCG########", this.addressSelected)
        this.propertiesService.searchAddress(this.addressSelected).subscribe(
            response => {

                this.addressList = response
                console.log(this.addressList)
            });
    }
    furnishFilter(event) {
        console.log(event)
    }
    bedroomsFilter(event) {
        this.bedroomFilterValue = event
        console.log(event)
    }
    bathroomFilter(event) {
        console.log(event)
        this.bathroomFilterValue = event

    }
    propertyTypeFilter(event) {
        this.propertyTypes = event
    }
    furnishingFilter(event) {
        console.log(event)
        this.furnishFilterValue = event
    }
    garageFilter(event) {
        console.log(event)
        this.garageFilterValue = event
    }
    priceFilter(event) {
        console.log(event)
        this.range = event
    }
    showMore() {
        this.showSecondarySearch = true
    }
    navigateTo(url) {
        this.router.navigateByUrl('/' + url);
    }
    sizeFilter(event) {
        console.log(event)
        this.size = event
    }
    searchFor(event) {
        console.log(event)
        if (event == "BUY") {
            this.styleBuy = "selected-style-rent"
            this.styleRent = "selected-style-buy"
            this.serchFor = "BUY"
        } else {
            this.styleRent = "selected-style-rent"
            this.styleBuy = "selected-style-buy"
            this.serchFor = "RENT"
        }
    }

    filter() {
        var request = {
            bathroom: this.bathroomFilterValue,
            garage: this.garageFilterValue,
            bedroom: this.bedroomFilterValue,
            price: this.price,
            size: this.size,
            furnish: this.furnishFilterValue,
            address: this.addressSelected
        }
        this.propertiesService.searchProperties(request).subscribe(
            data => {
                console.log("data#######", data)
            })
    }
    selectCity(value) {
        console.log(value)
        this.city=value
    }
    searchFilter() {

 
        if(this.address==undefined || this.address==""){
            this.address=this.city
        }

        var search = {
            address: this.address,
            type: this.type,
            propertyBhk: this.propertyBhk,
            priceRange: this.range,
            latitude: this.currentLat,
            longitude: this.currentLong
        }
        localStorage.setItem("propertyDetail", JSON.stringify(search));
        console.log(search);
        this.router.navigateByUrl('/home');
        // console.log(request)
    }
}