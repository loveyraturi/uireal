/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef } from "@angular/core";
import { Login } from "src/app/models/login";
import { UserService } from "src/app/services/user.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { PropertiesService } from "src/app/services/properties.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'edit_property',
    templateUrl: './edit_property.component.html',
    styleUrls: ['./edit_property.component.css']
})
export class EditPropertyComponent implements OnInit {

    private properties;
    public modelClass = "modal";
    public modelClass1="modal1";
    private maplocation;
    private message;
    private type = localStorage.getItem("type");
    private username = localStorage.getItem("username");
    private propertyId;
    private file = {};
    private imagesBanner = [];
    private count=0
    private tab1Style = "active show"
	private tab2Style = "hide"
	private tab3Style = "hide"
    private propertyAmenities;
    private foundallowed=false;
    private foundAmenities=false;
    allowed = []
    amenities = []
    public selectedItems = [];
    public selectedItemsAmenities = [];
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
    constructor(private userService: UserService, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private propertiesService: PropertiesService) {
        localStorage.getItem("username");
        localStorage.getItem("type");
        this.propertyId = this._activatedRoute.snapshot.params.propertyId
        this.fetchPropertiesById(this.propertyId)

    }

    ngOnInit() {

    }
    onItemSelect(item: any) {
        for(var i = 0; i < this.selectedItems.length; i++) {
            if (this.selectedItems[i].item_id == item.item_id) {
                this.foundallowed=true
            }
        }
        if(!this.foundallowed){
            this.selectedItems.push(item)
        }
        
        console.log(item, "################Selected##################", this.selectedItems)
    }
    onItemSelectAmenities(item: any) {
        for(var i = 0; i < this.selectedItemsAmenities.length; i++) {
            if (this.selectedItemsAmenities[i].item_id == item.item_id) {
                this.foundAmenities=true
            }
        }
        if(!this.foundAmenities){
            this.selectedItemsAmenities.push(item)
        }
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
    saveImages() {
        var request = {
            propertyId: this.propertyId,
            images: this.imagesBanner,
            ownerName: this.username
        }
        console.log(request)
        this.propertiesService.updateImages(request).subscribe(
            data => {
                console.log("@@@@@@@@@@@@@@######################@@",data)
                this.modelClick1()
            })
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
    removeImage(index) {
        console.log("before#############", this.imagesBanner)
        console.log(index)
        // while (index > -1) {
        // this.imagesBanner.splice(index, 1);
        this.imagesBanner=this.imagesBanner.filter(item=>{
            return item.index!=index;
        })
        // }
        console.log("after#############", this.imagesBanner)
    }
    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event: any) => {
                    console.log(event.target.result);
                    this.count=this.count+1
                    var image={
                        index: this.count,
                        fileSource: event.target.result
                    }
                    this.imagesBanner.push(image);
                }

                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    submit() {
        // var request = {
        //     bhk: this.bhk,
        //     price: this.price,
        //     propertyType: this.propertyType,
        //     furnish: this.furnish,
        //     allowed: this.allowed,
        //     bathrooms: this.bathrooms,
        //     bedroom: this.bedroom,
        //     phoneNumber: this.phoneNumber,
        //     garage: this.garage,
        //     area: this.area,
        //     description: this.description
        // }
        var allowed="";
        var amenities=""
        this.selectedItems.forEach(item=>{
                if (allowed != "") {
                    allowed = allowed + "," + item.item_id;
                } else {
                    allowed = allowed + item.item_id;
                }
        })
        this.selectedItemsAmenities.forEach(item=>{
            if (amenities != "") {
                amenities = amenities + "," + item.item_id;
            } else {
                amenities = amenities + item.item_id;
            }
    })
        this.properties["selectedItems"]=allowed
        this.properties["selectedItemsAmenities"]=amenities
        console.log(this.properties, "##################@")
        this.propertiesService.updateProperty(this.properties).subscribe(
            data => {
                console.log(data)
                this.modelClick1()
            })
    }
    closeModal() {
        this.modelClass = "modal"
    }
    modelClick() {
        this.modelClass = "modalDisplay"
    }

    closeModal1() {
        this.modelClass1 = "modal1"
    }
    modelClick1() {
        this.modelClass1 = "modalDisplay1"
    }


    fetchPropertiesById(id) {
        console.log(id, "#########")
        this.propertiesService.fetchPropertiesById(id).subscribe(
            data => {
                data.amenities.split(",").forEach(item=>{
                    this.selectedItemsAmenities.push({
                        item_id:item,
                        item_text:item,
                    })
                })
                data.allowed.split(",").forEach(item=>{
                    this.selectedItems.push({
                        item_id:item,
                        item_text:item,
                    })
                })
                console.log(this.selectedItems,"########################")
                data.frontImage = "./assets/properties/" + data.images[0].imageName;
                // var outside
                // fetch(data.frontImage).then(response => response.blob()).then(images => {
                // Then create a local URL for that image and print it 
                //   outside = URL.createObjectURL(images)
                //   console.log("###########@@@@@@@@@@@@",outside)
                
                //   const reader = new FileReader();
                //   var blob = new Blob([ia], { type: 'image/jpeg' });
                //                 reader.readAsDataURL(new File([""], data.frontImage,{type: "image/jpeg"}));
                //                 reader.onload = () => console.log("####$@@@",reader.result);
                //   })

                console.log(data.images)
                data.images.forEach((element) => {
                    var images={};
                    const reader = new FileReader();
                    var blob = null;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "./assets/properties/" + element.imageName);
                    xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
                    xhr.onload =  () =>{
                        blob = xhr.response;//xhr.response is now a blob object
                        reader.readAsDataURL(blob);
                        reader.onload = () => {
                            images["index"]= element.id
                            this.count=element.id
                            images["fileSource"]=reader.result
                            this.imagesBanner.push(images)
                    }
                }
                    xhr.send();
                   
                });
                data.description = data.description.replace(/↵/g, '\\n')
                this.properties = data
                this.maplocation = "#"
                console.log(this.maplocation, "data#######", this.properties)
            })
    }
}

