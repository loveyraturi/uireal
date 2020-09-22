/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { Login } from "src/app/models/login";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import { ActivatedRoute } from "@angular/router";
import { DatePicker } from 'angular2-datetimepicker';

@Component({
	selector: 'properties_details',
	templateUrl: './properties_details.component.html',
	styleUrls: ['./properties_details.component.css']
})
export class PropertiesDetailsComponent implements OnInit {

	private properties;
	public modelClass = "modal";
	public modelClass1 = "modal1"
	public modelClass5 = "modal5"
	public selectedPropertry;
	private modelClass3 = "modal3"
	private userName;
	private messageLogin;
	private isValid;
	private appointmentSchedule;
	private userNameIsValid;
	private numberOfProperties
	private empType
	private docType
	private dateScheduled;
	private timeScheduled;
	private password;
	private thanksFlag=false;
	private fileToUpload
	private numberMessage;
	private maplocation;
	private message;
	private type = localStorage.getItem("type");
	private username = localStorage.getItem("username");
	private tab1Style = "active show"
	private tab2Style = "hide"
	private tab3Style = "hide"
	private propertyAmenities;
	settings = {
		bigBanner: false,
		timePicker: true,
		format: 'yyyy-MM-dd',
		defaultOpen: false,
		closeOnSelect: true
	}
	fromDate: Date = new Date();
	constructor(private userService: UserService, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
		this.modelClick5()
		this.fetchPropertiesById(localStorage.getItem("propertyId"))
		localStorage.getItem("username");
		localStorage.getItem("type");
		DatePicker.prototype.ngOnInit = function() {
			this.settings = Object.assign(this.defaultSettings, this.settings);
			if (this.settings.defaultOpen) {
			this.popover = true;
			}
			this.date = new Date();
			};
	}

	ngOnInit() {

	}
	showBlock(value) {
		if (value == "tab1") {
			this.tab1Style = "active show"
			this.tab2Style = "hide"
			this.tab3Style = "hide"
		} else if (value == "tab2") {
			this.tab1Style = "hide"
			this.tab2Style = "active show"
			this.tab3Style = "hide"
		} else if (value == "tab3") {
			this.tab1Style = "hide"
			this.tab2Style = "hide"
			this.tab3Style = "active show"
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
	fromDateSelect(event) {
		console.log(event)
		this.fromDate = event
	}
	docTypeSelected(event) {
		console.log(event)
		this.docType = event
	}
	empTypeSelected(event) {
		console.log(event)
		this.empType = event
	}
	fileuploaded(event) {

		// var fileToUpload = event.target.files.item(0);

		var reader = new FileReader();

		reader.onload = (event: any) => {
			console.log(event.target.result);

			this.fileToUpload = event.target.result;
		}
		reader.readAsDataURL(event.target.files[0]);
		console.log(this.fileToUpload)
		if (this.empType == undefined) {
			this.modelClick("appointment","Employment Type not selected")
			// this.appointmentSchedule = "Employment Type not selected"
		} else {
			if (this.docType == undefined) {
				this.modelClick("appointment","Document Type not selected")
				// this.appointmentSchedule = "Document Type not selected"
			} else {

			}
		}
	}
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
			this.dateScheduled = value;
		}
	}
	login() {
		var request = {
			username: this.userName,
			password: this.password,
		}
		this.userService.validate(request).subscribe(
			data => {
				console.log(data.status == "true", "status#######", data)
				this.isValid = data.status == "true" ? "valid" : "invalid"
				if (data.status == "true") {
					this.username = request.username
					this.type = data.type
					localStorage.setItem("username", request.username);
					localStorage.setItem("type", data.type);
					this.closeModal3()
					this.messageLogin = data.message
					this.isValid = true
					this.userNameIsValid = "valid"
				} else {
					this.isValid = false
					this.messageLogin = data.message
					this.userNameIsValid = "invalid"
				}
				console.log(localStorage.getItem("username"), "###########")

			})
	}
	modelClick3() {
		this.modelClass3 = "modalDisplay3"
	}
	closeModal3() {
		this.modelClass3 = "modal3"
	}
	scheduleAppointment() {
		if (this.username == undefined || this.username == "") {
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
						username: this.username,
						propertyId: this.selectedPropertry,
						images: this.fileToUpload,
						docType: this.docType,
						empType: this.empType
					}
					this.propertiesService.scheduleAppointment(request).subscribe(response => {
						this.modelClick("appointment",response.message)
					})
					// this.appointmentSchedule = "Appoinment scheduled "

					console.log("#@@#@#@#@@@@@@@@@@@###", request)
				} else {
					this.modelClick("appointment","Please select date")
					// this.appointmentSchedule = "Please select date"
				}
			} else {
				console.log("#@@#@#@#@@@@undefined@@@@@@@###")
				this.modelClick("appointment","Please select time")
				// this.appointmentSchedule = "Please select time"

			}
		}
	}
	selectTime(value) {
		this.timeScheduled = value
	}
	closeModal1() {
		this.modelClass1 = "modal1"
	}
	modelClick1(propertyId) {
		this.modelClass1 = "modalDisplay1"
		this.selectedPropertry = propertyId
		console.log(this.selectedPropertry, "#@@#$@#$@$@")
	}
	closeModal() {
		this.modelClass = "modal"
	}
	modelClick5() {
		this.modelClass5 = "modalDisplay5"
	}
	closeModal5() {
		this.modelClass5 = "modal5"
	}
	modelClick(value,message) {
		if (value == 'sortlist') {
			this.thanksFlag=true
			if (this.username != undefined && this.username != "") {
				var request = {
					username: this.username,
					property_id: this.properties.id,
					status: "Interested"
				}
				this.userService.interested(request).subscribe(resp => {
					console.log(resp)
					if (resp.status = "true") {
						this.modelClass = "modalDisplay"
						this.message = resp.message
					}

				})
			} else {
				this.modelClass = "modalDisplay"
				this.message = "please login to submit your request"
			}
		} else if(value=="contact"){
			this.thanksFlag=true
			this.modelClass = "modalDisplay"
			this.message = "You can contact us on (+91) 9109769242"
			//  + this.properties.phoneNumber
		}else if(value=="appointment"){
			this.thanksFlag=false
			this.modelClass = "modalDisplay"
			this.message = message
			//  + this.properties.phoneNumber
		}
		console.log("model id is ")

	}
	fetchPropertiesById(id) {
		// this.spinner.show()
		console.log(id, "#########")
		this.propertiesService.fetchPropertiesById(id).subscribe(
			data => {
				if(data.parking=="both"){
					data.parking="Car and bike"
				}
				if(data.furnish=="un_furnished"){
					data.furnish="Unfurnished"
				}
				data.frontImage = "./assets/properties/" + data.images[0].imageName;
				data.description = data.description.replace(/↵/g, '\\n')
				this.properties = data
				this.propertyAmenities=data.amenities.split(",")
				this.maplocation = "https://www.google.co.in/maps/place/" + this.properties.latitude + "," + this.properties.longitude + ",17z/data=!3m1!4b1!4m5!3m4!1s0x39092a3748779733:0x36c8161d96164085!8m2!3d30.3057554!4d78.0017076&output=embed"
				console.log(this.maplocation, "data#######", this.properties)
				// this.spinner.hide()
				this.closeModal5()
			})
	}
}

