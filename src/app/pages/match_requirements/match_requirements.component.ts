/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { PropertiesService } from "src/app/services/properties.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'match_requirements',
    templateUrl: './match_requirements.component.html',
    styleUrls: ['./match_requirements.component.css']
})
export class MatchRequirementsComponent implements OnInit {
    private currentLat
    private currentLong
    private ownerName = "praveen";
    public modelClass = "modal";
    private images = [];
    private latlng = [-25.363882, 131.044922]
    private email = localStorage.getItem("email");
    private message;
    private sliderPosition = "slide1";
    private spinner=false;
    constructor(private router: Router, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private propertiesService: PropertiesService) {
        // this.fetchPropertyDetailsById()
        // this.modelClick()
        localStorage.setItem("pageName", "match")
    }
    myForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        bedroom: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        washrooms: new FormControl('', [Validators.required]),
        area: new FormControl('', [Validators.required]),
        furnish: new FormControl('', [Validators.required]),
        propertyType: new FormControl('', [Validators.required]),
        parking: new FormControl('', [Validators.required]),
        modular: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        locality: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required])
    });

    ngOnInit() {

        this.getGeoLocation()
    }
    closeModal() {
        this.modelClass = "modal"
        // this.router.navigateByUrl('/main');

    }
    slidePrevious(event) {
        this.sliderPosition = event
    }
    slideNext(event) {
        this.sliderPosition = event
    }
    modelClick() {
        console.log(this.email, "model id is ")

        // if (this.username != undefined) {
        //     if (this.type == "owner") {

        //     } else {
        // this.modelClass = "modalDisplay"
        // this.message = "Successfully submitted matching requirements."
        //         this.closeModal()
        //     }

        // } else {
        //     this.message = "Please login to add property"
        // }
    }
    modelClickRegister(message) {
        console.log(this.email, "model id is ")
        this.modelClass = "modalDisplay"
        // if (this.username != undefined) {
        //     if (this.type == "owner") {
        //         // this.closeModal()
        //         this.message=message

        //     } else {
        //         this.message = "You are not allowed to add property please login as owner"
        //     }

        // } else {
        this.message = "Successfully submitted matching requirements."
        // }
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
    submit() {
        this.spinner=true
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
        if (this.myForm.value.price == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Enter Price"
            this.spinner=false
        
        }  if (this.myForm.value.name == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Enter BHK"
            this.spinner=false
        
        }
        if (this.myForm.value.furnish == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Enter Furnished Details"
            this.spinner=false
        
        } 
        if (this.myForm.value.propertyType == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Select Property Type"
            this.spinner=false
        } 
        if (this.myForm.value.locality == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Enter Locality"
            this.spinner=false
        }
        if (this.myForm.value.city == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Enter City"
            this.spinner=false
        } 
        if (this.myForm.value.state == ""){
            this.modelClass = "modalDisplay"
            this.message=" Please Enter State"
            this.spinner=false
        } 
        this.propertiesService.matchRequirements(this.myForm.value).subscribe(
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

