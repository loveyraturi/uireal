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
    selectedBhk=[]
    selectedPropertyType=[]
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
    locality;
    state;
    city;
    private localityDropdown=[]
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
    occupation;
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
            this.selectedPropertyType.push("flat")
        } else {
            this.isSelectedFlat = ""
            const index = this.selectedPropertyType.indexOf("flat");
            if (index > -1) {
                this.selectedPropertyType.splice(index, 1);
            }
        }
    }
    selectedRowHouse() {
        if (this.isSelectedRowHouse == "") {
            this.isSelectedRowHouse = "selectedRowHouse"
            this.selectedPropertyType.push("row_house")

        } else {
            this.isSelectedRowHouse = ""
            const index = this.selectedPropertyType.indexOf("row_house");
            if (index > -1) {
                this.selectedPropertyType.splice(index, 1);
            }
        }
    }
    selectedPG() {
        if (this.isSelectedPG == "") {
            this.isSelectedPG = "selectedPG"
            this.selectedPropertyType.push("pg")

        } else {
            this.isSelectedPG = ""
            const index = this.selectedPropertyType.indexOf("pg");
            if (index > -1) {
                this.selectedPropertyType.splice(index, 1);
            }
        }
    }
    selectedRowHostel() {
        if (this.isSelectedRowHostel == "") {
            this.isSelectedRowHostel = "selectedRowHostel"
            this.selectedPropertyType.push("hostel")
        } else {
            this.isSelectedRowHostel = ""
            const index = this.selectedPropertyType.indexOf("hostel");
            if (index > -1) {
                this.selectedPropertyType.splice(index, 1);
            }
        }
    }
    selected1RK() {
        if (this.isSelected1RK == "") {
            this.isSelected1RK = "selected1RK"
            this.selectedBhk.push("1RK")
        } else {
            this.isSelected1RK = ""
            const index = this.selectedBhk.indexOf("1RK");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }
        }
    }
    selectedStudio() {
        if (this.isSelectedStudio == "") {
            this.isSelectedStudio = "selectedStudio"
            this.selectedBhk.push("Studio")
        } else {
            const index = this.selectedBhk.indexOf("Studio");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }
        }
    }
    selected1() {
        if (this.isSelected1 == "") {
            this.isSelected1 = "selected1"

            this.selectedBhk.push("1bhk")
        } else {
            this.isSelected1 = ""
            const index = this.selectedBhk.indexOf("1bhk");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }
        }
    }
    selected2() {
        if (this.isSelected2 == "") {
            this.selectedBhk.push("2bhk")
        } else {
            this.isSelected2 = ""
            const index = this.selectedBhk.indexOf("2bhk");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }
       }
    }
    selected3() {
        if (this.isSelected3 == "") {
            this.isSelected3 = "selected3"
            this.selectedBhk.push("3bhk")
        } else {
            this.isSelected3 = ""
            const index = this.selectedBhk.indexOf("3bhk");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }
        }
    }
    selected4() {
        if (this.isSelected4 == "") {
            this.isSelected4 = "selected4"
            this.selectedBhk.push("4bhk")
        } else {
            this.isSelected4 = ""
            const index = this.selectedBhk.indexOf("4bhk");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }
        }
    }
    selected5more() {
        if (this.isSelected5more == "") {
            this.isSelected5more = "selected5more"
            this.selectedBhk.push("5bhk")
        } else {
            this.isSelected5more = ""
            const index = this.selectedBhk.indexOf("5bhk");
            if (index > -1) {
                this.selectedBhk.splice(index, 1);
            }

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
        this.response["propertyBHK"] = this.selectedBhk.join()
        this.response["propertyType"]= this.selectedPropertyType.join()
        this.response["minPrice"]= this.response["minPrice"]
        this.response["maxPrice"]= this.response["maxPrice"]
        this.response["occupation"] = this.occupation


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
        if(this.response["occupation"]==undefined){
            this.messageMaximumPrice="Enter Occupation"
            
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
       this.localityDropdown=this.cityLocalityData[value]
        console.log(this.localityDropdown)
    }
}

