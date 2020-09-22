/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { PropertiesService } from "src/app/services/properties.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "src/app/_services";

@Component({
    selector: 'properties_registration',
    templateUrl: './properties_registration.component.html',
    styleUrls: ['./properties_registration.component.css']
})
export class PropertiesRegistrationComponent implements OnInit {
    private currentLat
    private currentLong
    private ownerName = "praveen";
    public modelClass = "modal";
    private images = [];
    private latlng = [-25.363882, 131.044922]
    private type = localStorage.getItem("type");
    private username = localStorage.getItem("username");
    private message;
    private sliderPosition = "slide1";
    private spinner=false;
    private dropdownList = [{
        item_id: "family",
        item_text: "Family"
    }, {
        item_id: "bachelor",
        item_text: "Bachelor"
    }, {
        item_id: "student",
        item_text: "Student"
    }, {
        item_id: "unmarried_couple",
        item_text: "Unmarried Couple"
    }]
    private dropdownListamenities = [{
        item_id: "garden",
        item_text: "Garden/Kids playing area"
    }, {
        item_id: "cctv",
        item_text: "CCTV camera"
    }, {
        item_id: "lift",
        item_text: "LIFT"
    }, {
        item_id: "backup",
        item_text: "DG/Power BACKUP"
    }, {
        item_id: "security",
        item_text: "Security Guard"
    }, {
        item_id: "campus",
        item_text: "Gated community/Covered Campus"
    }, {
        item_id: "water_supply",
        item_text: "Water Supply (24 hrs)"
    }, {
        item_id: "playing_ground",
        item_text: "Playing Ground"
    }, {
        item_id: "swimming_pool",
        item_text: "Swimming Pool"
    }, {
        item_id: "club_house",
        item_text: "Club House"
    }, {
        item_id: "community_hall",
        item_text: "Community Hall"
    }]
    private document;
    private myForm;
    public selectedItems = [];
    public selectedItemsAmenities = [];
    allowed = []
    amenities = []
    public dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2
    }
    public dropdownSettingsAmenities = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2
    }
    constructor(private alertService: AlertService, private router: Router, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private propertiesService: PropertiesService) {
        // this.fetchPropertyDetailsById()
        this.modelClick()

        localStorage.setItem("pageName", "properties_registration")
    }


    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            bedroom: new FormControl('', [Validators.required]),
            washrooms: new FormControl('', [Validators.required]),
            garage: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            area: new FormControl('', [Validators.required]),
            ownerName: new FormControl('', [Validators.required]),
            latitude: new FormControl('', [Validators.required]),
            longitude: new FormControl('', [Validators.required]),
            file: new FormControl('', [Validators.required]),
            fileSource: new FormControl('', [Validators.required]),
            furnish: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            propertyType: new FormControl('', [Validators.required]),
            selectedItems: new FormControl('', [Validators.required]),
            selectedItemsAmenities: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            parking: new FormControl('', [Validators.required]),
            modular: new FormControl('', [Validators.required]),
            locality: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            addressProof: new FormControl('', [Validators.required]),
            maintainance: new FormControl('', [Validators.required]),
            security: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required])
        });
        this.getGeoLocation()
    }
    onItemSelect(item: any) {
        this.selectedItems.push(item)
        console.log(item, "################Selected##################", this.selectedItems)
    }
    onItemSelectAmenities(item: any) {
        this.selectedItemsAmenities.push(item)
        console.log(item, "################Selected##################", this.selectedItemsAmenities)
    }
    OnItemDeSelect(item: any) {
        this.selectedItems = this.selectedItems.filter(event => {
            return event.item_id != item.item_id
        })
        console.log(item, "################DeSelected##################", this.selectedItems)
    }
    OnItemDeSelectAmenities(item: any) {
        this.selectedItemsAmenities = this.selectedItemsAmenities.filter(event => {
            return event.item_id != item.item_id
        })
        console.log(item, "################Selected##################", this.selectedItemsAmenities)
    }
    onSelectAll(item: any) {
        this.selectedItems = []
        this.selectedItems.push(item)
        console.log(item, "################Selected1##################", this.selectedItems)
    }
    onItemSelectAllAmenities(item: any) {
        this.selectedItemsAmenities = []
        this.selectedItemsAmenities.push(item)
        console.log(item, "################DeSelected##################", this.selectedItems)
    }
    onDeSelectAll(items: any) {
        this.selectedItems = []
        console.log(items, "################DeSelected1##################", this.selectedItems)
    }
    onDeSelectAllAmenities(items: any) {
        this.selectedItemsAmenities = []
        console.log(items, "################DeSelected1##################", this.selectedItems)
    }
    closeModal() {
        this.modelClass = "modal"
        // this.router.navigateByUrl('/manage');

    }
    slidePrevious(event) {
        this.sliderPosition = event
    }
    slideNext(event) {
        this.sliderPosition = event
    }
    success(message: string) {
        this.alertService.success(message);
        this.router.navigateByUrl('/login');
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
    modelClick() {
        console.log(this.username, "model id is ", this.type)

        if (this.username != undefined) {
            if (this.type == "owner") {

            } else {
                this.modelClass = "modalDisplay"
                this.message = "You are not allowed to add property please login as owner"
                // this.closeModal()
            }

        } else {
            this.message = "Please login to add property"
        }
    }
    modelClickRegister(message,type) {
        console.log(this.username, "model id is ", this.type)
        this.modelClass = "modalDisplay"
        if (this.username != undefined) {
            if (this.type == "owner") {
                // this.closeModal()
                if(type=="success"){
                    this.message = message
                    setTimeout(() =>  this.router.navigateByUrl('/main'),1500);
                }else{
                    this.message = message
                }
                

            } else {
                this.message = "You are not allowed to add property please login as owner"
            }

        } else {
            this.message = "Please login to add property"
        }
    }
    getpos(event) {
        this.latlng = [event.latLng.lat(), event.latLng.lng()];
        console.log(event)
    };
    getGeoLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                this.currentLat = latitude
                this.currentLong = longitude
                console.log(longitude, latitude)
                //   this.currentMap="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.5524090066037!2d-"+this.currentLat+"!3d"+this.currentLong+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3748250c43a43%3A0xe1b9879a5e9b6657!2sWinter%20Street%20Public%20Parking%20Lot!5e0!3m2!1sen!2sbd!4v1577299251173!5m2!1sen!2sbd"
                //   console.log(this.currentMap)
                //   this.callApi(longitude, latitude);
            }, failure => {
                console.log(failure)
            });
        } else {
            console.log("No support for geolocation")
        }
    }
    get f() {
        return this.myForm.controls;
    }
    removeImage(index) {
        console.log("before#############", this.images)
        console.log(index)
        // while (index > -1) {
        this.images.splice(index, 1);
        // }
        console.log("after#############", this.images)
        this.myForm.patchValue({
            fileSource: this.images
        });
    }
    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event: any) => {
                    console.log(event.target.result);
                    this.images.push(event.target.result);

                    this.myForm.patchValue({
                        fileSource: this.images
                    });
                }

                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    onFileChangeAddressProof(event) {
        console.log("####################")
        // if (event.target.files && event.target.files[0]) {
        //     var filesAmount = event.target.files.length;
        //     for (let i = 0; i < filesAmount; i++) {
        //         var reader = new FileReader();

        //         reader.onload = (event: any) => {
        //             console.log(event.target.result);


        //             this.myForm.patchValue({
        //                 addressProof: event.target.result
        //             });
        //         }

        //         reader.readAsDataURL(event.target.files[i]);
        //     }
        // }
        var reader = new FileReader();
        reader.onload = (event: any) => {
            console.log("##########@@@@@@@@@@@@@@####", event.target.result)
            this.document = event.target.result
            this.myForm.patchValue({
                addressProof: this.document
            });
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    submit() {
        this.spinner=true
        this.myForm.patchValue({
            addressProof: this.document
        });

        console.log(this.myForm.value, "###########333");
        // var request = {
        //     address: this.myForm.value.address,
        //     area: this.myForm.value.area,
        //     bedroom: this.myForm.value.bedroom,
        //     description: this.myForm.value.description,
        //     frontImage: this.myForm.value.frontImage,
        //     garage: this.myForm.value.garage,
        //     isavailable: 1,
        //     latitude: this.myForm.value.currentLat,
        //     longitude: this.myForm.value.currentLong,
        //     name: this.myForm.value.name,
        //     ownerName: "praveen",
        //     phoneNumber: this.myForm.value.phoneNumber,
        //     washroom: this.myForm.value.washrooms,
        //     fileSource:  this.myForm.value.fileSource
        // }
        console.log(this.myForm.value);
        this.propertiesService.addProperties(this.myForm.value).subscribe(
            data => {
                this.spinner=false
                console.log("groupdata#######", data)
                if (data.status == "true") {
                    console.log(data.message)
                    this.modelClickRegister(data.message,"success")
                } else {
                    console.log(data.message)
                    this.modelClickRegister(data.message,"failure")
                }

            })
    }
}

