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
    selector: 'sortlisted_properties',
    templateUrl: './sortlisted_properties.component.html',
    styleUrls: ['./sortlisted_properties.component.css']
})
export class SortlistedPropertiesComponent implements OnInit {
    private currentLat
    private currentLong
    private ownerName = "praveen";
    public modelClass = "modal";
    private images = [];
    private latlng = [-25.363882, 131.044922]
    private email = localStorage.getItem("email");
    private message;
    private properties;
    private dateScheduled;
    private timeScheduled;
    private empType
	private docType
    private fileToUpload
    private messageLogin;
    private isValid;
	private password;
	private callModal = false;
	private messageModal;
    private userName;
    private userNameIsValid;
    public modelClass1 = "modal1"
	private selectedPropertry;
	private appointmentSchedule;
	private modelClass5 = "modal5"
    private modelClass3 = "modal3"
    private numberMessage;

    constructor(private router: Router,private sanitization: DomSanitizer, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private propertiesService: PropertiesService) {
        // this.fetchPropertyDetailsById()
        // this.modelClick()
        
        localStorage.setItem("pageName","sortlisted")
    }


    ngOnInit() {
        

        this.getSortlistedProperties()
        
    }
    // login() {
	// 	var request = {
	// 		username: this.userName,
	// 		password: this.password,
	// 	}
	// 	this.userService.validate(request).subscribe(
	// 		data => {
	// 			console.log(data.status == "true", "status#######", data)
	// 			this.isValid = data.status == "true" ? "valid" : "invalid"
	// 			if (data.status == "true") {
	// 				this.username = request.username
	// 				this.type = data.type
	// 				localStorage.setItem("username", request.username);
	// 				localStorage.setItem("type", data.type);
	// 				this.closeModal3()
	// 				this.messageLogin = data.message
	// 				this.isValid = true
	// 				this.userNameIsValid = "valid"
	// 			} else {
	// 				this.isValid = false
	// 				this.messageLogin = data.message
	// 				this.userNameIsValid = "invalid"
	// 			}
	// 			console.log(localStorage.getItem("username"), "###########")

	// 		})
	// }
    dateSelected(value) {
		var today = new Date().toJSON().slice(0, 10)
		//     var tomorrowValue = today.split("-")
		//    console.log()
		//    var day=parseInt(tomorrowValue[2], 10)
		//    day=day+1
		//    var tomorrow=tomorrowValue[0]+"-"+tomorrowValue[1]+"-"+day
		var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		var day = currentDate.getDate()
		var month = currentDate.getMonth() + 1
		var year = currentDate.getFullYear()
		var tomorrow = year + "-" + month + "-" + day;

		if (value == "today") {
			console.log(today, "is today")
			this.dateScheduled = today;
		} else if (value == "tomorrow") {
			console.log(tomorrow, "is tomorrow")
			this.dateScheduled = tomorrow;
		} else {
			console.log(value, "is date")
			this.dateScheduled = this.formatDate(value);;
		}
	}
	fileuploaded(event) {
		
		// var fileToUpload = event.target.files.item(0);

		var reader = new FileReader();

                reader.onload = (event: any) => {
                    console.log(event.target.result);

                    this.fileToUpload=event.target.result;
                }
		reader.readAsDataURL(event.target.files[0]);
		console.log(this.fileToUpload)
		if (this.empType == undefined) {
			this.appointmentSchedule = "Employment Type not selected"
		} else {
			if (this.docType == undefined) {
				this.appointmentSchedule = "Document Type not selected"
			} else {

			}
		}
	}
	formatDate(date) {
		console.log(date)
		// if(typeof date.getMonth() !== 'function'){
		date = new Date(date)
		// }
		var hours = date.getHours();
		var minutes = date.getMinutes();
		hours = hours % 24;
		hours = hours ? hours : 24; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ':00';
		var month = (date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1
		console.log((date.getDate()).toString().length)
		var day = (date.getDate()).toString().length == 1 ? "0" + (date.getDate()).toString() : date.getDate()
		console.log(month, "############month", day)
		return (date.getFullYear() + "-" + month + "-" + day);
	  }
	register() {
		var url = window.location.href.split('//')
		var hostname = url[1].split('/')
		var hostnameurl = url[0] + "//" + hostname[0] + "/" + hostname[1] + "/registration"
		console.log(hostnameurl)
		window.open(hostnameurl, "_blank");


    }
    
	docTypeSelected(event) {
		console.log(event)
		this.docType = event
	}
	empTypeSelected(event) {
		console.log(event)
		this.empType = event
	}
    scheduleAppointment() {
		if (this.email == undefined || this.email == "") {
			this.modelClick3()
		} else {
			console.log(this.timeScheduled)
			console.log(this.dateScheduled)
			console.log(this.timeScheduled != undefined, this.dateScheduled != undefined)
			if (this.timeScheduled != undefined) {
				if (this.dateScheduled != undefined) {
					var request = {
						scheduleTime: this.timeScheduled,
						scheduledDate: this.dateScheduled,
						email: this.email,
						propertyId: this.selectedPropertry,
						images: this.fileToUpload,
						docType: this.docType,
						empType: this.empType
					}
					this.propertiesService.scheduleAppointment(request).subscribe(response => {
						if (response.staus == "true") {
							this.closeModal1()
						}
						this.modelClick(response.message, "")
						// this.appointmentSchedule = "Request Reqistered will notify you soon"
					})
					console.log("#@@#@#@#@@@@@@@@@@@###", request)
				} else {
					this.modelClick("Please select date", "")
					this.appointmentSchedule = "Please select date"
				}
			} else {
				console.log("#@@#@#@#@@@@undefined@@@@@@@###")
				this.modelClick("Please select time", "")
				this.appointmentSchedule = "Please select time"

			}
		}
	}
	selectTime(value) {
		this.timeScheduled = value
	}
	closeModal() {
		this.modelClass = "modal"
	}
    shortList(propertyId){
		console.log("model id is ")
		if (this.email == undefined || this.email == "") {
			this.modelClick3()
		} else {
		 var request = {
			email: this.email,
			 property_id: propertyId,
			 status: "Interested"
		 }
		 this.userService.interested(request).subscribe(resp => {
			 console.log(resp)
			 if(resp.status="true"){
				this.messageModal= resp.message
				this.modelClass = "modalDisplay"
				//  this.modelClass = "modalDisplay"
				//  this.message= resp.message
			 }
 
		 })
	 }
	}
	showPropertyDetails(propertyId) {
		console.log("#####################@@@@@@@@@@", propertyId);
		localStorage.setItem("propertyId", propertyId);
		this.router.navigateByUrl('/properties_details');
	}
	modelClick(value, type) {
		if (type == "phoneNumber") {
			this.callModal = true
			this.numberMessage = value
			this.messageModal = "You can contact us on (+91) 9109769242"
		} else {
			this.callModal = false
			this.messageModal = value
		}
		// +value
		console.log("model id is ")
		this.modelClass = "modalDisplay"
	}
	modelClick5() {
		this.modelClass5 = "modalDisplay5"
	}
	closeModal5() {
		this.modelClass5 = "modal5"
	}
	closeModal1() {
		this.modelClass1 = "modal1"
		this.selectedPropertry = "NA";
	}
	modelClick3() {
		this.modelClass3 = "modalDisplay3"
	}
	closeModal3() {
		this.modelClass3 = "modal3"
	}
	modelClick1(propertyId) {
		this.modelClass1 = "modalDisplay1"
		this.selectedPropertry = propertyId
		console.log(this.selectedPropertry, "#@@#$@#$@$@")
	}
    removePropertyInterest(id) {
		console.log(id)
		var request={
			propertyId:id,
			email: this.email
		}
        this.propertiesService.deleteInterestedProperties(request).subscribe(response => {
            console.log(response, "###########")
            this.getSortlistedProperties()
        })
    }
    getSortlistedProperties() {
		console.log(this.email)
		var request={
			email: this.email
		}
        this.propertiesService.sortlistedProperties(request).subscribe(response => {
            console.log(response, "#@#@$#@$#@$#@#@$#")
            this.properties = response
        })
    }
    // getGeoLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const longitude = position.coords.longitude;
    //             const latitude = position.coords.latitude;
    //             this.currentLat = latitude
    //             this.currentLong = longitude
    //             console.log(longitude, latitude)
    //             //   this.currentMap="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.5524090066037!2d-"+this.currentLat+"!3d"+this.currentLong+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3748250c43a43%3A0xe1b9879a5e9b6657!2sWinter%20Street%20Public%20Parking%20Lot!5e0!3m2!1sen!2sbd!4v1577299251173!5m2!1sen!2sbd"
    //             //   console.log(this.currentMap)
    //             this.callApi(longitude, latitude);
    //         });
    //     } else {
    //         console.log("No support for geolocation")
    //     }
    // }
    // callApi(Longitude: number, Latitude: number) {
    //     var request = {
    //         latitude: Latitude,
    //         longitude: Longitude
    //     }
    //     this.propertiesService.findPropertiesNearMe(request).subscribe(
    //         data => {
    //             this.properties = data.map(items => {

    //                 // var str = items.frontImage.split("\\");
    //                 items.frontImage = "./assets/properties/" + items.images[0].imageName;
    //                 items.description = items.description.replace(/↵/g, '\\n')
    //                 return items
    //             });
    //             console.log("properties#######", this.properties)
    //         })

    // }
}

