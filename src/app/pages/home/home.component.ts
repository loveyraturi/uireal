import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { Login } from "src/app/models/login";
import { UserService } from "src/app/services/user.service";
import { PropertiesService } from "src/app/services/properties.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router } from "@angular/router";

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private addressSearch;
	private size;
	private loggedUserName
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
	public modelClass = "modal";
	public modelClass1 = "modal1"
	private currentLong;
	private addressSelected;
	private addressList;
	private searchOptions;
	private properties;
	private dateScheduled;
	private timeScheduled;
	private callModal = false;
	private email = localStorage.getItem("email");
	private name = localStorage.getItem("name");
	private appointmentSchedule;
	private selectedPropertry;
	private modelClass5 = "modal5"
	private modelClass6 = "modal6"
	private modelClass3 = "modal3"
	private isvalidSearch = true;
	private propertiesFinal;
	private password;
	private messageModal;
	// private userName;
	private messageLogin;
	private isValid;
	private userNameIsValid;
	private numberOfProperties
	private empType
	private docType
	private fileToUpload
	private numberMessage;
	showMenuFilter = false;
	settings = {
		bigBanner: false,
		timePicker: true,
		format: 'yyyy-MM-dd',
		defaultOpen: false,
		closeOnSelect: true
	}
	fromDate: Date = new Date();

	constructor(private router: Router, private sanitization: DomSanitizer, private propertiesService: PropertiesService, private userService: UserService) {
		localStorage.setItem("pageName", "home")
	}

	ngOnInit() {
		this.modelClick6()
		var propDetails = localStorage.getItem("propertyDetail");
		if (propDetails != null) {
			this.searchOptions = JSON.parse(propDetails)
			this.addressSearch=this.searchOptions.address
			console.log(this.searchOptions,"@@@@@@@@@this.addressSearch@@@@@@@@@@@@@@",this.addressSearch)
			this.searchProperty(this.searchOptions);
		} else {
			this.getGeoLocation()
		}
	}
	loginDetailsReceived(data){
			console.log(data)
			this.loggedUserName=data.name
			this.email=data.email
			console.log(this.loggedUserName)
			this.closeModal3()
	}
	filterShowHide() {
		if(this.showMenuFilter==false){
			this.showMenuFilter=true
		}else{
			this.showMenuFilter=false
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
	
	propertiesReceived(properties) {
		console.log("########properties@@@@@@@@@@@@@", properties)
		if (properties.length < 1) {
			this.isvalidSearch = false
		} else {
			this.closeModal6()
		}
		this.numberOfProperties = properties.length
		console.log("###############!@!@@#########@!@@!", this.numberOfProperties)

		console.log("data#@@@@@@@@@@@@@@@searchOptionProp######", properties.length)
		this.properties = properties.map(items => {

			// var str = items.frontImage.split("\\");
			// items.frontImage = "./assets/properties/" + items.images[0].imageName;
			items.description = items.description.replace(/↵/g, '\\n')
			if (items.parking == "both") {
				items.parking = "Car and Bike"
			}
			return items
		});
		// this.spinner.hide()
		this.propertiesFinal = JSON.parse(JSON.stringify(this.properties))

	}
	shortList(propertyId) {
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
				if (resp.status = "true") {
					this.messageModal = resp.message
					this.modelClass = "modalDisplay"
					//  this.modelClass = "modalDisplay"
					//  this.message= resp.message
				}

			})
		}
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
	searchAddress() {
		this.propertiesService.searchAddress(this.addressSelected).subscribe(
			response => {
				console.log(response)
				this.addressList = response
			});
	}
	searchProperty(searchOption) {
		// this.spinner.show()
		this.propertiesService.mainSearch(searchOption).subscribe(
			data => {
				if (data.length < 1) {
					this.closeModal6()
					this.isvalidSearch = false
				} else {
					this.closeModal6()
				}
				this.numberOfProperties = data.length
				this.properties = data.map(items => {
				items.description = items.description.replace(/↵/g, '\\n')
					if (items.parking == "both") {
						items.parking = "Car and Bike"
					}
					return items
				});
				// this.spinner.hide()
				this.propertiesFinal = JSON.parse(JSON.stringify(this.properties))

			})
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
			// console.log(value, "is date")
			this.dateScheduled = this.formatDate(value);
			console.log(this.dateScheduled)
		}
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
			this.appointmentSchedule = "Employment Type not selected"
		} else {
			if (this.docType == undefined) {
				this.appointmentSchedule = "Document Type not selected"
			} else {

			}
		}
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
	furnishFilter(event) {
		console.log(event)
	}
	closeModal() {
		this.modelClass = "modal"
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
	modelClick6() {
		this.modelClass6 = "modalDisplay6"
	}
	closeModal5() {
		this.modelClass5 = "modal5"
		// this.router.navigateByUrl("/main")
	}
	closeModal6() {
		this.modelClass6 = "modal6"
		// this.router.navigateByUrl("/main")
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
		if (this.email != undefined && this.email != "") {
			this.modelClass1 = "modalDisplay1"
			this.selectedPropertry = propertyId
			console.log(this.selectedPropertry, "#@@#$@#$@$@")
		} else {
			this.modelClick3()
		}
	}
	bedroomsFilter(event) {
		this.bedroomFilterValue = event
		console.log(event)
	}
	bathroomFilter(event) {
		console.log(event)
		this.bathroomFilterValue = event

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
		this.price = event
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
	getGeoLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const longitude = position.coords.longitude;
				const latitude = position.coords.latitude;
				this.currentLat = latitude
				this.currentLong = longitude
				console.log(longitude, latitude)
				this.callApi(longitude, latitude);
			});
		} else {
			console.log("No support for geolocation")
		}
	}
	callApi(Longitude: number, Latitude: number) {
		var request = {
			latitude: Latitude,
			longitude: Longitude
		}
		this.propertiesService.findPropertiesNearMe(request).subscribe(
			data => {
				this.numberOfProperties = data.length
				console.log("###############!@!@@#########@!@@!", this.numberOfProperties)
				this.properties = data.map(items => {

					// var str = items.frontImage.split("\\");
					items.frontImage = "./assets/properties/" + items.images[0].imageName;
					items.description = items.description.replace(/↵/g, '\\n')
					return items
				});
				console.log("properties#######", this.properties)
				// this.spinner.hide()
				this.closeModal5()
			})

	}
	showPropertyDetails(propertyId) {
		console.log("#####################@@@@@@@@@@", propertyId);
		localStorage.setItem("propertyId", propertyId);
		this.router.navigateByUrl('/properties_details');
	}
	filter() {
		var bathroom = this.bathroomFilterValue == undefined ? undefined : "item.washroom=='" + this.bathroomFilterValue + "'";
		var bedroom = this.bedroomFilterValue == undefined ? undefined : "item.bedroom=='" + this.bedroomFilterValue + "'";
		var garage = this.garageFilterValue == undefined ? undefined : "item.parking=='" + this.garageFilterValue + "'";
		var price = this.price == undefined ? undefined : "item.price<=" + this.price;
		var size = this.size == undefined ? undefined : "item.size<=" + this.size;
		var furnish = this.furnishFilterValue == undefined ? undefined : "item.furnish=='" + this.furnishFilterValue + "'";
		var address = this.addressSelected == undefined ? undefined : "item.address=='" + this.addressSelected + "'";
		var condition = ""
		if (furnish == undefined) {
			if (bathroom == undefined) {
				if (bedroom == undefined) {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {

							} else {
								condition = condition + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + price;
							} else {
								condition = condition + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + garage;
							} else {
								condition = condition + garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + garage + " &&" + price;
							} else {
								condition = condition + garage + " &&" + price + " &&" + size;
							}
						}
					}
				} else {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + bedroom;
							} else {
								condition = condition + bedroom + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + bedroom + " &&" + price;
							} else {
								condition = condition + bedroom + " &&" + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + bedroom + " &&" + garage;
							} else {
								condition = condition + bedroom + " &&" + garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + bedroom + " &&" + garage + " &&" + price;
							} else {
								condition = condition + bedroom + " &&" + garage + " &&" + price + " &&" + size;
							}
						}
					}
				}
			} else {

				if (bedroom == undefined) {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + bathroom;
							} else {
								condition = condition + bathroom + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + bathroom + " &&" + price;
							} else {
								condition = condition + bathroom + " &&" + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + bathroom + " &&" + garage;
							} else {
								condition = condition + bathroom + " &&" + garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + bathroom + " &&" + garage + " &&" + price;
							} else {
								condition = condition + bathroom + " &&" + garage + " &&" + price + " &&" + size;
							}
						}
					}
				} else {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + bathroom + " &&" + bedroom;
							} else {
								condition = condition + bathroom + " &&" + bedroom + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + bathroom + " &&" + bedroom + " &&" + price;
							} else {
								condition = condition + bathroom + " &&" + bedroom + " &&" + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + bedroom + " &&" + bedroom + " &&" + garage;
							} else {
								condition = condition + bedroom + " &&" + bedroom + " &&" + garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + bathroom + " &&" + bedroom + " &&" + garage + " and "
									+ price;
							} else {
								condition = condition + bathroom + " &&" + bedroom + " &&" + garage + " and "
									+ price + " &&" + size;
							}
						}
					}
				}
			}
		} else {
			if (bathroom == undefined) {
				if (bedroom == undefined) {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish;
							} else {
								condition = condition + furnish + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + price;
							} else {
								condition = condition + furnish + " &&" + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + garage;
							} else {
								condition = condition + furnish + " &&" + garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + garage + " &&" + price;
							} else {
								condition = condition + furnish + " &&" + garage + " &&" + price + " &&" + size;
							}
						}
					}
				} else {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bedroom;
							} else {
								condition = condition + furnish + " &&" + bedroom + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bedroom + " &&" + price;
							} else {
								condition = condition + furnish + " &&" + bedroom + " &&" + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bedroom + " &&" + garage;
							} else {
								condition = condition + furnish + " &&" + bedroom + " &&" + garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bedroom + " &&" + garage + " and "
									+ price;
							} else {
								condition = condition + furnish + " &&" + bedroom + " &&" + garage + " &&" + price
									+ " &&" + size;
							}
						}
					}
				}
			} else {

				if (bedroom == undefined) {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom + " &&" + price;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom + " &&" + garage;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + garage + " and "
									+ size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom + " &&" + garage + " and "
									+ price;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + garage + " and "
									+ price + " &&" + size;
							}
						}
					}
				} else {
					if (garage == undefined) {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom + " &&" + bedroom;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + bedroom + " and "
									+ size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom + " &&" + bedroom + " and "
									+ price;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + bedroom + " and "
									+ price + " &&" + size;
							}
						}
					} else {
						if (price == undefined) {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bedroom + " &&" + bedroom + " and "
									+ garage;
							} else {
								condition = condition + furnish + " &&" + bedroom + " &&" + bedroom + " and "
									+ garage + " &&" + size;
							}
						} else {
							if (size == undefined) {
								condition = condition + furnish + " &&" + bathroom + " &&" + bedroom + " and "
									+ garage + " &&" + price;
							} else {
								condition = condition + furnish + " &&" + bathroom + " &&" + bedroom + " and "
									+ garage + " &&" + price + " &&" + size;
							}
						}
					}
				}
			}
		}
		console.log(condition + "#####@@@@@@@@@@#@@#@@@", this.propertiesFinal)

		this.properties = this.propertiesFinal.filter(item => {
			return eval(condition)
		})
		console.log("#####@@@@@@@@@@#@@#@@@", this.properties)
	}
}