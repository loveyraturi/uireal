/**
 * Created by andrew.yang on 5/18/2017.
 */
import { OnInit, Component, Input, ViewContainerRef, Output, EventEmitter } from "@angular/core";
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
    public modelClass1 = "modal1";
    @Output() loginDetails: EventEmitter<any> = new EventEmitter<any>();

    private images = [];
    private latlng = [-25.363882, 131.044922]
    private name = localStorage.getItem("name");
    private email = localStorage.getItem("email");
    private phone_number = localStorage.getItem("phoneNumber");
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
        itemsShowLimit: 1
    }
    public dropdownSettingsAmenities = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1
    }
    private cityLocalityData={
        Indore: ["Vijay Nagar","Nipania","Mahalakshmi Nagar","New Palasia","Super Corridor","Bicholi Mardana","Piplya Kumar","AB Road indore","Bengali Square","Shalimar Township","Sukhliya","Manorama Ganj","Pipaliyahana","Saket Nagar","Limbodi","Scheme No. 54 Indore","Bangali Square","Rau","Tulsi Nagar","Khajrana","Sai Kripa Colony","Sudama Nagar","Old Palasia","Kanadia Road","Scheme No. 140 Indore","Scheme No. 114 Indore","AB Bypass Road","Rajendra Nagar","Talawali Chanda","Chikitsak Nagar","Tilak Nagar","Dewas Naka(Panchvati)","Airport Road","Race Course Road","L I G Colony","Niranjanpur","Scheme No 78","Scheme No 136 Indore","Shri Nagar Extension","Anoop Nagar","Bhawrasla","Sukliya","Mig Colony","Clerk Colony","Ida Scheme No-140","Annapurna Main Road","Khandwa Road","Sapna-Sangeeta Road","MR 10","Chhota Bangarda","Telephone Nagar","Alok Nagar","Ring Road","Lasuriya Mori","Mhow","Mahaveer Nagar","Snehlataganj","South Tukoganj","Bajrang Nagar","Aranya Nagar","HIlink City","Shree Nagar Extension","Indrapuri Colony","Manishpuri","Rau Pitampur Road","Shri Nagar","Surya Dev Nagar","Nanda Nagar","Scheme No 94 Indore","Bicholi Hapsi","Ashish Nagar","Gulab Bagh","Bijalpur","Sanchar Nagar Extention","New Rani Bagh","Nyay Nagar","Usha Nagar Extension","Mundla Nayta","Ganeshpuri Colony","Navlakha","Shubh Sampada Colony","Palasia","Jakhiya","Radio Colony","Pipliya Rao","Vishnupuri Colony","Scheme No 71 Indore","Bhanvarkuan","Musakhedi","Malviya Nagar","Patni Pura","Tilak Nagar Extension","Juni Indore","Manu Shree Nagar","Anand Bazaar","Vaibhav Nagar Extension","Khatiwala Tank","M.G. Road","Pitampur","Vijay Nagar","Nipania","Mahalakshmi Nagar","New Palasia"],
        Mumbai: ["Bandra (West)","Chembur (East)","Chembur","Powai","Worli","Mulund (West)","Hiranandani Gardens - Powai","Hiranandani Estate","Marol","Malad (West)","Khar West","Lokhandwala Kandivali East","Chandivali","Andheri (East)","Majiwada","Ghatkopar West","Dombivli (East)","Kandivali (East)","Bhandup (West)","Malad (East)","Parel","Kasar vadavali","Wadala","Manpada","Kanjur Marg (East)","Prabhadevi","Ghodbunder Road","Tilak Nagar","Lower Parel","Kolshet Road","Goregaon (West)","Thakur Village","Vile Parle (East)","Wadala East","Kandivali (West)","Juhu","Sector 20 Kharghar","Lokhandwala Andheri West","Santacruz (West)","kurla (west)","Balkum","Kalyan (West)","Mira Road","Ulwe","Kalina","Sector 10 Kharghar","Sector-35G Kharghar","Sector 11 Koparkhairane","Borivali (West)","Santacruz (East)","Kamothe","Raheja Vihar","Sakinaka","Ghansoli","Sector-9 Ulwe","4 Bunglows","Borivali (East)","Mira Road East","Vikhroli (East)","Jankalyan Nagar","Koperkhairane","Sector-6 Kharghar","Vasant Vihar","JVLR","Lower Parel West","Bandra (East)","Sector 19 Kharghar","Jogeshwari (East)","Airoli","Mahim (West)","Sector-4 Nerul","Sector-8A Airoli","Bandra Kurla Complex","Virar West","Naigaon (East)","Anand Nagar","Sector 12 Kharghar","Sector 21 Kamothe","Sector 20 Airoli","kavesar","Versova","Seven Bunglow","Sector-35D Kharghar","Dahisar (East)","Kanchpada","Mahalaxmi","Sector 17 Ulwe","Colaba","Panvel","Bhakti Park","Sector-58 Seawoods","Sector 9 Airoli","Sector-14 Koparkhairane","Dhokali","Karanjade","Thane West","Kharghar","Andheri (West)","Goregaon (East)"],
        Pune: ["Wagholi","Hinjewadi","Balewadi","NIBM","Magarpatta","Bavdhan","Viman Nagar","Pimple Saudagar","Kalyani Nagar","Keshav Nagar","Kothrud","Undri","Koregaon Park","Aundh","Dhanori","Wanowrie","Kondhwa","Phase-3 Hinjewadi","Shankar Kalat Nagar","Mohamadwadi","Lohegaon","Ravet","Punawale","Vishrantwadi","Eon Free Zone","Sinhgad Road","Pimple Gurav","Hinjewadi Phase 2","Wadgaon Sheri","Warje","Pimple Nilakh","Mhada Colony","Wanwadi","Karve Nagar","Pashan","Pimpri Chinchwad","Kaspate Vasti","Tulaja Bhawani Nagar","Sus","Marunji","Rahatani","Chinchwad","Yerwada","Moshi","Hinjewadi Phase 1","Tingre Nagar","Thergaon","Tathawade","Narhe","Dange Chowk","Pashan-Sus Road","Akurdi","Mahalunge","Bibwewadi","Tukaram Nagar","Dhayari","Manjari Budruk","Phursungi","Baner Pashan Link Road","Chikhali","Bhusari Colony","Handewadi","Chandan Nagar","Sasane Nagar","Katraj","Koregaon Park Annexe","Nigdi","Nanded","Erandwane","Fatima Nagar","New Sanghvi","Anand Nagar","Chakan","Manjri","Pisoli","Vadgaon Sheri","Bhugaon","Mundhwa","Shastri Nagar","Dighi","Salunke Vihar","Ashoka Nagar","Model Colony","Chinchwad Gaon","Manjri BK","B.T Kawade Road","Kiwale","Balewadi Phata","Thite Nagar","Ghorpadi","Yewalewadi","Ambegaon Budruk","Sakore Nagar","Pimpri","Clover Park","Baner","Kharadi","Wakad","Hadapsar"],
        Bhopal: ["Bawadia Kalan","Bagmugali","Misr","Katara Hil","Chuna Bhat","Trilan","MP Nag","Shahpu","Awadhpu","Gulmohar Colo","Rohit Nag","Shirdipur","New Mark","Ashoka Gard","Bawdi","Jatkhe","Bawaria Kal","Arera Hil","Saket Nag","Indrapu","Shivaji Nag","Ayodhya Nag","Shymala Hil","TT Nag","Lalgha","Jahangirab","Karo","Salai","Old Subhash Nagar","Khajuri Kalan","Danish Kunj","Habib Ganj","Mandakini Colony","Bagsewaniya","Airport Road","Nehru Nagar","Mandideep","Danish Nagar","Gandhinagar","Indus Towne","Kotra Sultanabad","Samardha","Patel Nagar","Neelbad","J K Road","Rachna Nagar","Sector-C Indrapuri","Shiv Sangam Nagar","Pallavi Nagar","Durgesh Vihar","Gopal Nagar","Gehun Kheda","Ayodhya Nagar Extension","Panchwati Colony","E 8 Extension","Narela Shankari","Tulsi Nagar","Aishbagh","Bhojpur Road","Gautam Nagar","Bhanpura","Sankhedi","Govindpura","Zone-I Bhopal","Kohefiza","Sanjeev Nagar","Nayapura","Amrawad Khurd","Bangrasia","Anand Nagar","Govindpura Industrial Area","Sarvdharm Colony","Paraspar Colony","Tilak Nagar","Sector-B Indrapuri","Ahmedpur Kalan","Bypass Road","Malviya Nagar","Barkhera Pathani","Idgah Hills","Bairagarh","Ashok Vihar","Chola","Vidya Nagar","Narayan Nagar","Dham Kheda","Rasla Khedi","Sainath Nagar","Peer Gate Area","Maharana Pratap Nagar","Ahinsa Vihar Colony","Shanti Nagar","Bagh Sevania","Vrindavan Nagar","Mahawadiya","Hoshangabad Road","Arera Colony","Kolar Road","Ayodhya Bypass"],
        Surat: ["Surat","Vesu","Adajan","PAL","VIP Road Vesu","More Localities","Palanpur","Piplod","Citylight Area","Althan","Bhatar","Pal Gam","Palanpur Gam","New City Light","Ghod Dod Road","Jahangirabad","Dumas Road","Bhimrad","Parvat Patiya","Kamrej","Rundh Magdalla","Parley Point","Dindoli","City Light","Dumas","Sagrampura","Adajan Hazira Road","Vankala","Varachha","Katargam","Kumbhariya","Parvat Patia","Jahangirpura","Amroli","Majura Gate","Palanpur Jakatnaka","Rander","Masma","Godadara","Umra Gam","Adajan Patiya","L P Savani","Bhatha","Udhana","Pankaj Nagar","Someshwara Enclave","City Light Town","Palanpur Patia","Athwa Gate","Dundi","Nanpura","Umra","Sachin","Palsana","Ram Nagar","Kharwar Nagar","Athwalines","Saroli","Timaliawad","Kailash Nagar","Navagam","Kharwawad","Nana Varachha","Bamroli","Athwa","Saniya Hemad","Baben","Tadwadi","Deladva","Velanja","Narthan","Jeevkar Nagar","Kansad","Chikuwadi","Palanpur Patiya","Uttran","Rughnathpura","Mandvi","Udhana Darwaja","Umbhel","Olpad Sayan Road","Vesu","Adajan","PAL","VIP Road Vesu"],
        Ujjain: ["Nanakheda","Rishi Nagar","Freeganj","Nagziri","Sindhi Colony","Ved Nagar","Near MahaKaleshwar Temple","Nagda","Indira Nagar","Rajendra Nagar","New Shanti Nagar","VIP Road","Ddu Nagar","Fafadih","New Rajendra Nagar","Pandri","Tagore Nagar","Santoshi Nagar","Kabir Nagar","Daganiya","Shailendra Nagar","Kota","Civil Lines","Samta Colony","Shivanand Nagar","Bhatagaon","Kota Colony","Byron Bazar","Deopuri","Gudhiyari","Khamhardih","Sunder Nagar","Vishal Nagar","Sarona","Sector-2 Shankar Nagar","Vidhan Sabha Road","VIP Colony","Amleshwar","Shyam Nagar","Labhandi","Gayatri Nagar","Boria Kalan","Changorabhata","Professor Colony","Ramsagar Para","Geetanjali Nagar","Moti Nagar","Rajeev Nagar","Sankar Nagar","Avani Vihar","Sarvodaya Nagar","Sadar Bazar","Budhapara","Dal-Dal Seoni Rd.","Dhamtari Road","Hirapur","Bhanpuri","Dunda","Priyadarshini Nagar","Tikrapara","Dubey Colony","Pirda","Gondwara","Mathpurena","Amanaka","Bhatgaon","Postal Colony","Kamal Vihar","Lalpur","Sai Vihar Colony","Baijnathpara","Indravati Colony","Vivekanand Nagar","Vikas Vihar Colony","Kachana","Dumartarai","Vallabh Nagar","Kumhari 1","Baronda","Jivan Vihar","Shri Ram Nagar","Harshit Nagar","Shatabdi Nagar","Moudhapara","Ama Seoni","Geeta Nagar","Siltara","New Purena","Shrinagar","Serikhedi","Ashwani Nagar","Motipur","Sales Tax Colony","Pacheda-1","Khamtarai"],
        Goa: ["Porvorim","Mapusa","Candolim","Calangute","Caranzalem","Dona Paula","Siolim","Taleigao","Arpora","Miramar","Dona Paula","Bambolim","Kadamba Plateau","Sangolda","Anjuna","Benaulim","Colva","Socorro","Assagao","Nerul","Fatorda","Parra","Santa Inez","Saligao","Dabolim","Cunchelim","Chimbel","Ribandar","Sancoale","Bainguinim","Santa Cruz","Pilerne","Marna","Salvador do Mundo","Vagator","Borda","Alto Porvorim","Moira","Succorro","Corlim","Khorlim","Old Goa","Ponda","Taleigao Road","Nagoa","Guirim","Merces","Campal","Tiswadi","Varca","Nuvem","Comba","Malbhat","Reis Magos","Thivim","Nachinola","Khadpabandh","Tonca","La Campala Colony","Baga","Majorda","Mormugao","Navelim","Vasco","Aquem","Gogol","Madel","Chicalim","Zuari Nagar","Verem","Bogmalo","Alto Betim","Pajifond","Raia","Arlem","Sanquelim","Ucassaim","Vidya Nagar","Goa Velha","Pundalik Nagar","Dangui Colony","Goalim Moula","Bicholim","Bardez","Pernem","Canacona","Quepem","Verna","Davarlim","Varca","Bandora","Aldona","Jairam Nagar","Chaudi","Bogmalo","Orlim","Carambolim","Cuncolim","St Estevam"],
        Nagpur: ["Manish Nagar","Pratap Nagar","Trimurti Nagar","Narendra Nagar","Swawlambi Nagar","Laxminagar","Medical Square","Mihan","Somalwada","Manewada","Ganeshpeth Colony","New Manish Nagar","Khamla","Wardha Road","Dharampeth","Dhantoli","Friends Colony","New Sneh Nagar","Civil Lines","Pande Layout","Besa","Chatrapati Nagar","Ramdas Peth","Mahal","Zingabai Takli","Bajaj Nagar","Shivaji Nagar","Jaitala","Khare Town","Surendra Nagar","Narendra Nagar Extension","Mankapur","Bharat Nagar","Rana Pratap Nagar","Jamtha","Ram Nagar","Gopal Nagar","Lakadganj","Chinchbhavan","Shree Nagar","CA Road","Subhash Nagar","Nandanvan","Wardhaman Nagar","Shankar Nagar","Byramji Town","Chhatrapati Square","Wathoda","Gandhi Nagar","Beltarodi","Seminari Hill","Omkar Nagar","Wanadongri","Sambhaji Nagar","Rajiv Nagar","Pannase Layout","Nrendra Nagar Extension","Buti Bori","Ambazari","Hindustan Colony","Sadar","Sitabuldi","Koradi Road","Jaripatka","Gokulpeth","Isasani","Sahakar Nagar","Teka Naka","Surve Nagar","Indraprasthnagar","Amravati Road","Jaiprakash Nagar","Suyog Nagar","Sonegaon","Hingna","Ajni","Gayatri Nagar","Nandan Van","Dighori","Congress Nagar","Hazari Pahad","Ravinagar","Uday Nagar","Rahate Colony","Rajendra Nagar","Akash Nagar","Bhagwan Nagar","Borgaon"],
        Ahmedabad: ["Satellite","South Bopal","Prahlad Nagar","Gota","Vaishnodevi Circle","Shela","Bodakdev","Makarba","Thaltej","Vejalpur","Jagatpur","Bopal","Vastrapur","Chandkheda","Motera","Maninagar","Vasna","Shilaj","Gurukul","Science City","Sargasan","Naranpura","SG Highway","Kudasan","Shahibaug","Memnagar","Ghatlodia","Jodhpur","Navrangpura","Tragad","Prernatirth Derasar Road","Ambawadi","Paldi","Sola","Ghuma","Ramdev Nagar","Sanathal","New CG Road","Khodiyar","Shyamal","Sughad","Ambli","Sanand","Drive in Road","Isanpur","Anand Nagar","Ghodasar","Jivraj Park","Satellite Extension","New Ranip","Corporate Road","Randesan","Maninagar East","Thaltej-Shilaj Road","Bhuyangdev","Law Garden","Shantigram","Zundal","Chandlodia","Nava Vadaj","Raysan","Koteshwar","Bhaikakanagar","Sindhu Bhavan Road","Chittavan","Iscon-Ambli Road","Usmanpura","Sarkhej","Khokhara","Kankaria","Ambli Bopal","Judges Bunglow","Shrinand Nagar","Satadhar","Shivranjani","Urjanagar 1","Nehru Park","Sabarmati","New Maninagar","Gift City","Bhadaj","Ashram Road","Gulbai Tekra","Narol","Vatva","Vavol","Changodar","Nehru Nagar","100 ft. Road","Vastral","CTM","TP 44","Koba","SP Ring Road (West)","Naroda","Nigam Nagar","Bhatta","Ranip","Hansol"],
        Delhi: ["Noida Extension","Indirapuram","Greater Noida West","Sector-78 Noida","Saket","Sector-137 Noida","Sector-54 Gurgaon","Sector-48 Gurgaon","Mayur Vihar - I","Sector-76 Noida","Sector-65 Gurgaon","Sector-66 Gurgaon","Greater Kailash I","DLF CITY PHASE 5","Sector-74 Noida","Sector-102 Gurgaon","Sector-56 Gurgaon","DLF CITY PHASE 2","Vasant Kunj","Sector-75 Noida","Sector-49 Gurgaon","Sector-69 Gurgaon","Sector-82 Gurgaon","C Block Sushant Lok Phase - I","Sector-81 Gurgaon","Crossing Republik","Sector-168 Noida","Ahinsa Khand 1","Nirvana Country","DLF CITY PHASE 3","Safdarjung Enclave","Vaibhav Khand","Sector 1 Greater Noida West","Sector-67 Gurgaon","Sector-72 Gurgaon","Sector-52 Gurgaon","Paschim Vihar","Freedom Fighter Enclave","Sector-57 Gurgaon","I P Extension","Sector-47 Gurgaon","Greater Kailash II","DLF CITY PHASE 4","Vasant Vihar","Kalkaji","Sector-83 Gurgaon","Techzone 4 Greater Noida West","DLF CITY PHASE 1","Palam Vihar","Sector-22 Dwarka","Sector-46 Gurgaon","Defence Colony","Sector-43 Gurgaon","Malviya Nagar","Sector-100 Noida","Sector-134 Noida","Sector-62 Noida","Sarita Vihar","Vikas Puri","Chattarpur","Sector-45 Gurgaon","Sector-70 Gurgaon","Sector-77 Noida","Sector-53 Gurgaon","Sector-45 Noida","Sector-42 Gurgaon","Sector-107 Noida","sector-121 Noida","East of Kailash","Pitampura","Sector-4 Vaishali","Ahinsa Khand 2","Sector-120 Noida","Moti Nagar","Sector-82A Gurgaon","Sector-143 Noida","Sector-51 Gurgaon","Sector-50 Noida","Sector-109 Gurgaon","Sector-61 Gurgaon","Sector-12 Dwarka","Sector-23 Gurgaon","Sector-16 B Gr Noida","Sector-62 Gurgaon","Sector-6 Dwarka","Sector-61 Noida","Sector-19 Dwarka","Sector-23 Dwarka","Sector-128 Noida","Sector-31 Gurgaon","New Friends Colony","Sector-84 Gurgaon","Sector-11 Dwarka","Sector-52 Noida","Jaypee Greens","Sector-86 Gurgaon","Sector-70A Gurgaon","Raj Nagar Extension","Sector-D Vasant Kunj"],
        Banglore: ["Prestige Falcon City","Elita Promenade","SNN Raj Serenity","DLF Westend Heights","Brigade Gardenia","Patel Smondoville","K Raheja Residency","Prestige St Johns Wood","Prestige Sunrise Park","Mantri Serenity","Brigade Millennium","Concorde Manhattan Bangalore","Prestige Notting Hill","GM Infinite E City Town","AB Residency","Mantri Alpyne","Sobha Forest View","Salarpuria Sattva Greenage","Klassik Benchmark","SNN Raj Greenbay","Ittina Mahavir","Prestige Kew Gardens","Prestige PineWood","Adarsh Palm Retreat Gulmohar","SNN Raj Serenity Phase 2","Sobha Morzaria Grandeur","Janaadhar Shubha Phase 2","Suncityiblur","Purva Panorama","Mahendra Elena 5","Ahad Euphoria","Sobha Silicon Oasis","Prestige Song of the South","Mantri Tranquil","Ajmera Green Acres","Mantri Sarovar","Brigade Palmsprings","Sobha Dew Flower","HM Tambourine","Mantri Residency","Hiranandani Hill Crest","Dlf Woodland Heights Jigani","Purvankara Westend","Vaishnavi Terraces","DLF Woodland Heights","Shriram Summitt","Salarpuria Sattva Cadenza","Sai Pushpanjali Nilayam","Mantri Elegance","Esteem Enclave","Nitesh Hyde Park","Assetz East Point","Aecs Layout","L and T South City","Patel Neotown Smondo 3","Prestige South Ridge","Adarsh Rhythm","Mantri Elite","Sobha Magnolia","Oceanus Freesia Enclave","Akme Harmony","Mahaveer Seasons","Vbhc Vaibhava Apartment","Puravankara Elita Promenade","BDA Complex","Brigade Omega","Mantri Paradise","Sobha Daffodil","Kristal Olivine","Tata The Promont","Gopalan Temple Trees","Ansal Forte","Himagiri Green Forest","Adarsh Palm Retreat Lakefront","Hiranandani Club Meadows","Purva Heights","NCC Urban Nagarjuna Premier","VARS Parkwood","NCC Urban Nagarjuna Greenridge","MJR Clique Hercules","Ajmera Stone Park","Krishna Mystiq","Kolte Patil Floriana Estates","Brigade Meadows","Pramuk Aqua Heights","Bren Paddington","Ittina Neela","Sobha Tulip","Gokulam Complex","Prestige Acropolis","DLF Maiden Heights","Keerthi Royal Palms","Ranka Colony","Purva Skydale","VBHC Vaibhava","Mahaveer Ranches","CVK Elegance Garnet","Sipani Bliss","Smondoville Neotown"],
        Hyderabad: ["Gachibowli","Kondapur","Kukatpally","Manikonda","Financial District","Hi-Tech City","Nallagandla","Chandanagar","Beeramguda","Madinaguda","Kokapet","Nizampet","Miyapur","Hafeezpet","Banjara hills","Pragati Nagar","5th Phase KPHB","KPHB","Narsingi","Madhapur","Puppalaguda","Jubilee Hills","Attapur","Vittal Rao Nagar","Tolichowki","Bachupally","Bandlaguda","Appa Junction","Ameerpet","Raghavendra Colony","Nallakunta","Begumpet","Uppal","Gajulramaram","Serlingampally","Pocharam","Boduppal","Gopanpally","9th Phase KPHB","Shaikpet","Khajaguda","Tellapur","Aminpur","Masjid Banda","Allwyn Colony","YousufGuda","Nanakramguda","Whitefield","Hyder Nagar","Himayat Nagar","Kothaguda","Moti Nagar","Lingampally","BHEL","Alkapuri","Medipally","Chikkadapally","Dilsukh Nagar","Vanasthalipuram","P Janardhan Reddy Nagar","Old Alwal","Krishna Reddy Pet","Sun City","Rajarajeshwari Nagar","Sanjeeva Reddy Nagar","Shamshabad","barkatpura","Alwal","Kompally","6th Phase KPHB","Telecom Nagar","Secretariat Colony","Borabanda","Bandam Kommu","LB Nagar","Narayanguda","Ramanthapur","Mehdipatnam","Matrusri Nagar","Neknampur","Vidya nagar","Somajiguda","Vivekananda Nagar","Huda Colony","Upparpally","Hydershakote","Gangaram","Adibatla","OU Colony","HMT Swarnapuri Colony","Karmanghat","Nagole","Mayuri Nagar","Mokila","Hanuman Nagar","Sanath Nagar","Rajendra Nagar","Rampally","Kismathpur"],
        Chennai: ["Velachery","Porur","Vadapalani","Adyar","Sholinganallur","Thoraipakkam","Pallikaranai","Perumbakkam","Alwarpet","Medavakkam","Padur","Thiruvanmiyur","Guduvancheri","Navalur","Urapakkam","OMR","Kilpauk","Chromepet","Perungudi","Ambattur","Nungambakkam","Pallavaram","Mogappair West","T.Nagar","Madipakkam","K.K. Nagar","Egattur","Kelambakkam","Mambakkam","Siruseri","Poonamallee","Palavakkam","Thalambur","Anna Nagar","New perungalathur","Kottivakkam","Manapakkam","RA Puram","Saidapet","Karapakkam","Choolaimedu","Iyyappanthangal","Kodambakkam","Ramapuram","Ekkaduthangal","Anna Nagar East","Nanmangalam","Egmore","Selaiyur","Kotturpuram","Neelankarai","Arumbakkam","West Tambaram","Adambakkam","Alandur","Oragadam","Pudupakkam Village","Tambaram","Valasaravakkam","Villivakkam","West Mambalam","Royapettah","Potheri","East Tambaram","Kattupakkam","Besant Nagar","Anna Nagar West","Ashok Nagar","Ayanavaram","MRC Nagar","Mylapore","Maraimalai Nagar","Zamin Pallavaram","Mogappair East","Pammal","Keelkattalai","Saligramam","Triplicane","Perambur","Injambakkam","Semmancheri","Maduravoyal","Virugambakkam","Teynampet","Kazhipattur","Rajakilpakkam","Sembakkam","Thiyagaraya Nagar","Boat Club","Aminjikarai","Mahindra City","Semmenchery","Singaperumal koil","Santhosapuram","Nolambur","Sithalapakkam","Thiruporur","Okkiyam Thuraipakkam","Kolathur"],
        Kolkata: ["New Town","Rajarhat","Tollygunge","Kestopur","E M Bypass","Mukundapur","Action Area II","Chinar Park","Action Area III","Garia","Prince Anwar Shah Rd.","Jadavpur","Bansdroni","Salt Lake","New Alipore","Kasba","Action Area I","Thakurpukur","Dum Dum","Behala","Madhyamgram","Baguihati","Naktala","Maheshtala","Action Area IID","Kalikapur","Sodepur","E M Bypass","City Centre 2","Ballygunge","Narendrapur","Action area 1A","Sector II - Salt Lake","Park Circus","Patuli","Tangra","Topsia","Barasat","Sonarpur","Madurdaha","Howrah","New Garia","Lake Town","Bablatala","Birati","Picnic Garden","Kaikhali","Sector I - Salt Lake","Belgharia","Behala Chowrasta","Lake Gardens","Nager Bazar","Jessore Road","Teghoria","Dash Drone","Alipore","Gariahat","Bagha Jatin","Action Area 1B","Kamalgazi","Haridebpur","Bhawanipore","Kudgat","Dum Dum Cantt.","Bijoygarh","Jodhpur Park","Uniworld City","Rajpur","Dunlop","Airport","Barrackpore","Golf Green","Garia Station","Sector V - Salt Lake","Chak Garia","Natunpara","Action Area 1D","Hiland Park","Entally","Southern Avenue","Netaji Nagar","Jyangra","Bangur","Tagore Park","Sakher Bazar","Park Street","Sealdah","Dhakuria","Haltu","Konnagar","Ajoy Nagar","VIP Haldiram","Nayabad","Ariadaha","Survey Park","Action Area 1C","Bara Nagar","Santoshpur","Santragachi"],
        Coimbatore: ["Saravanampatti","Peelamedu","Ganapathy","Vadavalli","Singanallur","Saibaba Colony","Cheran Ma Nagar","Ramanathapuram","Vilankurichi","Kavundampalayam","R.S.Puram","Kovaipudur","Thudiyalur","Ondiputhur","Kalapatti","Sundarapuram","Chinnavedampatti","Sulur","Keeranatham","Selvapuram","Fathima Nagar","Edayarpalayam","Periyanaickenpalayam","Vinayagapuram","Race Course","Vellakinar","Rathinapuri","Uppilipalayam","TVS nagar","Narasimhanaickenpalayam","GN Mills","Eachanari","Masakalipalayam","Gandhipuram","Podanur","Othakalmandapam","Koundampalayam","Kuniyamuthur","Tatabad","Kurumbapalayam","Nehru Nagar West","Vadamadurai","Kovilpalayam","Nanjundapuram","Athipalayam","Thoppampatti Pirivu","PN Pudur","GV Residency","BK Pudur","Anna Nagar","Velandipalayam","vellalore","NGGO Colony","P.N.Palayam","K K Pudur","Neelambur","Thaneerpandal","Puliakulam","Trichy Road","Malumichampatti","Nallampalayam","Madukkarai","Bharathi Colony","Gandhimaa Nagar","Periyar Nagar","New Siddhapudur","Varadharajapuram","Pappanaickenpalayam","Telungupalayam","Veerakeralam","Goldwins","Ponnaiah Raja Puram","Krishna Colony","Sungam","Mullai Nagar","Peelamedu Pudur","Ramnagar","Sowripalayam","Mettupalayam Road","Annur","Idigarai","Red Fields","Avarampalayam","Chinniampalayam","Town Hall","Teachers Colony","Ganapathy Maanagar","Poochiyur","Navavoor Pirivu","Ramanuja Nagar","Chettipalayam","Maniyakarampalayam","Kallimadai","Sundakkamuthur","New Thillai Nagar","Maheshwari Nagar","Sidco Industrial Estate","Murugan Nagar","Avinashi Road"]
        }
    loggedUserName: any;
    submitted: boolean =false;
    constructor(private alertService: AlertService, private router: Router, private _activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService, private propertiesService: PropertiesService) {
        // this.fetchPropertyDetailsById()

        localStorage.setItem("pageName", "properties_registration")
        console.log(this.email,"#$#@$#@$#@$#EMAIL",this.phone_number)
        if(this.email==undefined || this.email=="" ){
            this.modelClick1()
        }
    }


    ngOnInit() {
        this.myForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            phoneNumber: new FormControl(''),
            description: new FormControl(''),
            bedroom: new FormControl(''),
            washrooms: new FormControl(''),
            garage: new FormControl(''),
            address: new FormControl(''),
            area: new FormControl(''),
            ownerEmail: new FormControl('', [Validators.required]),
            latitude: new FormControl(''),
            longitude: new FormControl(''),
            file: new FormControl(''),
            fileSource: new FormControl(''),
            furnish: new FormControl(''),
            city: new FormControl('', [Validators.required]),
            propertyType: new FormControl('', [Validators.required]),
            selectedItems: new FormControl(''),
            selectedItemsAmenities: new FormControl(''),
            state: new FormControl(''),
            parking: new FormControl(''),
            modular: new FormControl(''),
            locality: new FormControl('', [Validators.required]),
            country: new FormControl(''),
            addressProof: new FormControl(''),
            maintainance: new FormControl(''),
            security: new FormControl(''),
            price: new FormControl('', [Validators.required])
        });
        this.myForm.patchValue({
            phoneNumber: this.phone_number
        })
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
    closeModal1() {
        this.modelClass1 = "modal1"
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
        console.log(this.email, "model id is ")

        if (this.email != undefined) {
            // if (this.type == "owner") {

            // } else {
            //     this.modelClass = "modalDisplay"
            //     this.message = "You are not allowed to add property please login as owner"
            //     // this.closeModal()
            // }

        } else {
            this.message = "Please login to add property"
        }
    }
    modelClick1() {
        this.modelClass1 = "modalDisplay1"
    }
    modelClickRegister(message,type) {
        console.log(this.email, "model id is ")
        this.modelClass = "modalDisplay"
        if (this.email != undefined) {
            // if (this.type == "owner") {
                // this.closeModal()
                if(type=="success"){
                    this.message = message
                    setTimeout(() =>  this.router.navigateByUrl('/main'),1500);
                }else if(type=="login"){
                    this.message = message
                    setTimeout(() =>  this.router.navigateByUrl('/main'),1500);
                }else{
                    this.message = message
                }
                

            // } else {
            //     this.message = "You are not allowed to add property please login as owner"
            // }

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
      //  this.spinner=true
        this.submitted = true;

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
        if (this.myForm.invalid) {
            return;
        }
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
                   // this.modelClickRegister(data.message,"failure")
                }

            })
    }
    loginDetailsReceived(data){
		console.log(data)
		this.loggedUserName=data.name
		this.email=data.email
		console.log(this.loggedUserName)
        this.closeModal1();
        this.userService.loginDetails.next(data.name);

}
}

