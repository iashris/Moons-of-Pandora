var Twit=require('twit');
var config=require('./config')
var T=new Twit(config);
var fs=require('fs');
var Sentencer = require('sentencer');
adjectives=['rocky','hazy','isolated','dense','foggy','carbon based','gaseous','distant','mysterious','lonely','cold','barren','alien','habitable','inhabited','bright','undiscovered','far away','remote','unexplored','terrestial','vivid','small','large','fascinating','life sustaining','nitrogen based','ammonia based','extrasolar','asteroidal','historic','recent','massive','iron based','mineral rich','sandy','blurry','stormy','hard','mountaineous','volcanic','harsh'];
var cmd="planetGen/planetGen";
var exec=require('child_process').exec;
tweetIt();
setInterval(tweetIt,1000*60*30);
constructors=['This {{customadj}} moon is unique because it has {{an_adjective}} {{noun}}.','This moon is representative of all {{nouns}}.','Meet the deity of {{adjective}} {{nouns}}.','This moon has its surface area {{number}} times that of {{country}}.','The legendary Pokémon {{pokemon}} has been spotted on this moon.','This moon is composed mostly of {{material}} and traces of {{material}}.','Some say they see {{a_noun}} on this moon\'s surface.'];
country=["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
pokemon=['Articuno','Zapdos','Moltres','Mewtwo','Mew Raikou','Entei','Suicune','Lugia','Ho-Oh','Celebi','Regirock','Regice','Registeel','Latias','Latios Kyogre','Groudon','Rayquaza','Jirachi','Deoxys Uxie','Mesprit','Azelf','Dialga','Palkia','Heatran','Regigigas','Giratina','Cresselia','Phione','Manaphy','Darkrai','Shaymin','Arceus','Victini','Cobalion','Terrakion','Virizion','Tornadus','Thundurus','Reshiram','Zekrom','Landorus','Kyurem','Keldeo','Meloetta','Genesect Xerneas','Yveltal','Zygarde','Diancie','Hoopa','Volcanion Solgaleo','Lunala','Magearna'];
material=['Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon','Sodium','Magnesium','Aluminum','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium','Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc','Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium','Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin','Antimony','Tellurium','Iodine','Xenon','Cesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium','Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium','Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury','Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium','Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium','Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadtium','Roentgenium'];
Sentencer.configure({
  actions: {
    customadj: function(){
      return adjectives[Math.floor(Math.random()*adjectives.length)];
    },
    number:function(){
    	return Math.floor(Math.random()*1500);
    },
    country:function(){
    	return country[Math.floor(Math.random()*country.length)];
    },
    pokemon:function(){
    	return pokemon[Math.floor(Math.random()*pokemon.length)];

    },
    material:function(){
    	return material[Math.floor(Math.random()*material.length)];
    }

  }
});
function get_text(){
	
	return(Sentencer.make(constructors[Math.floor(Math.random()*constructors.length)]));
}

get_text();

function tweetIt(){
  exec(cmd,processing);
  function processing(){
	var b64=fs.readFileSync('planetGen/output.png',{encoding:'base64'});
	console.log('Processing happened');
	T.post('media/upload',{media_data:b64},uploaded);
    }
  function uploaded(err,data,response){
//This is where I tweet
  var id=data.media_id_string;
  var tweet={
	status:get_text(),
	media_ids:[id]
    }
  T.post('statuses/update',tweet,tweeted);

  function tweeted(err,data,response){
	if(err) return console.error(err);
	console.log('Tweeted')
    }
  }
}

var stream=T.stream('user')
stream.on('follow',followed);

function followed(eventMsg){
	var name=eventMsg.source.name;
	var screenName=eventMsg.source.screen_name;
	var followtweet='Hey @'+screenName+'! Thanks for the follow. Here is a moon dedicated specially for you. ';
	exec(cmd,processing2);
	function processing2(){
	var b64=fs.readFileSync('planetGen/output.png',{encoding:'base64'});
	console.log('Processing happened');
	T.post('media/upload',{media_data:b64},uploaded2);
    }
    function uploaded2(err,data,response){
//This is where I tweet
  var idx=data.media_id_string;
  var tweetx={
	status:followtweet+get_text(),
	media_ids:[idx]
    }
  T.post('statuses/update',tweetx,tweetedx);

  function tweetedx(err,data,response){
	if(err) return console.error(err);
	console.log('Tweeted')
    }
}

}
