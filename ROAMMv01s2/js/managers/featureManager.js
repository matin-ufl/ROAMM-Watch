// Version 01: features are simple average over the defined period (FEATURE_CONSTRUCTION_INTERVAL)
function Features(){
	this.heartrate = null;
	this.accelX = null;
	this.accelY = null;
	this.accelZ = null;
	this.locLat = null;
	this.locLon = null;
	this.timestamp = null;
	this.battery = null;
	this.watchID = null;
}

var FEATURE_DB;
function createFeatureDBUsingWrapper(){
	FEATURE_DB = new IDBStore({
		dbVersion: 1,
		storeName: 'features',
		keyPath: 'id',
		autoIncrement: true,
		onStoreReady: function(){
			console.log('FEATURE_DATABASE ready!');
		}
	});
}

function addFeatureItemToDB(item) {
	var onsuccess = function(id) {
		//console.log("[MATIN] a data point is added.");
	}
	var onerror = function(error) {
		console.log("[MATIN] error in storing a data point: ", error);
	}
	FEATURE_DB.put(item, onsuccess, onerror);
}

function clearFeatureDB() {
	console.log("[MATIN] clearing feature database");
	var onsuccess = function() {
		console.log("[MATIN] FEATURE_DATABASE cleared.")
	}
	var onerror = function() {
		console.log("[MATIN] error in clearing FEATURE_DATABASE: ", error);
	}
	FEATURE_DB.clear(onsuccess, onerror);
}

function getFeatureDatabase(){
	return FEATURE_DB;
}

function startFeatureStorageInterval(){
	var rate = VARIABLE_CONSTRUCTION_RATE; // Default value for feature construction rate
	if(localStorage.getItem(KEY_INTERVAL_FEATURE_CONSTRUCTION) != null) {
		rate = parseInt(localStorage.getItem(KEY_INTERVAL_FEATURE_CONSTRUCTION));
	}
	console.log("[MATIN] Sampling rate is set to " + rate);
	window.setInterval(function(){
		constructFeaturesPeriodically();
	}, rate);
}





// --------------------- Functions for creating features ---------------------------------------------- 

function constructFeaturesPeriodically() {
	try {
		console.log("[Matin] Feature Construction started.");
		var database = getDatabase();

		var onsuccess = function(array){
			// This part changes if other features (other than average) is desired.
			var featureItem = takeAverageOfVariables(array);
			FEATURE_DB.put(featureItem);
			clearDB();
			console.log("[MATIN] a feature item was constructed and added to FEATURE_DB >>> " + featureItem.accelX);
		},

		onerror = function(error){
			console.log("[MATIN] an error occurred while creating a feature item: ", error);
		};

		database.getAll(onsuccess, onerror);
	} catch (exception) {
		console.log(exception.message);
	}
}

/**
 * In version 01, features are simply the average of collected sensors' data. In the next versions, we might construct more complex features.
 * @author matin
 * @param array
 */
function takeAverageOfVariables(array) {
	var featureItem = Object.create(Features.prototype);
	var arr = [];
	// Constructing features from accelX
	for (i = 0; i < array.length; i++) {
		if(array[i].accelX != null) {
			arr.push(array[i].accelX);
		}
	}
	featureItem.accelX = averageValues(arr);
	
	// Constructing features from accelY
	arr = [];
	for (i = 0; i < array.length; i++) {
		if(array[i].accelY != null)
			arr.push(array[i].accelY);
	}
	featureItem.accelY = averageValues(arr);
	// Constructing features from accelZ
	arr = [];
	for (i = 0; i < array.length; i++) {
		if(array[i].accelZ != null)
			arr.push(array[i].accelZ);
	}
	featureItem.accelZ = averageValues(arr);
	// Constructing features from Latitude
	arr = [];
	for (i = 0; i < array.length; i++) {
		if(array[i].locLat != null)
			arr.push(array[i].locLat);
	}
	featureItem.locLat = averageValues(arr);
	// Constructing features from Longitude
	arr = [];
	for (i = 0; i < array.length; i++) {
		if(array[i].locLon != null)
			arr.push(array[i].locLon);
	}
	featureItem.locLon = averageValues(arr);
	
	featureItem.timestamp = formatLocalDate(Date());
	featureItem.battery = 100;
	for(i = array.length - 1; i >= 0; i--) {
		if(array[i].battery != null) {
			featureItem.battery = array[i].battery;
			break;
		}
	}
	featureItem.watchId = localStorage.getItem(KEY_WATCH_ID);
	return featureItem;
}

function averageValues(arr) {
	if(arr.length == 0)
		return 0;
	var sum = 0.0;
	for(i = 0; i < arr.length; i++) {
		sum += parseFloat(arr[i]);
	}
	return (sum / arr.length);
}