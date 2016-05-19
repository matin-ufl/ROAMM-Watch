// Structure of a single data item
function Item(){
	this.steps = null;
	this.heartrate = null;
	this.accelX = null;
	this.accelY = null;
	this.accelZ = null;
	this.gyroA = null;
	this.gyroB = null;
	this.gyroC = null;
	this.locLat = null;
	this.locLon = null;
	this.uv = null;
	this.pressure = null;
	this.timestamp = null;
	this.battery = null;
	this.watchID = null;
}

// used to format timestamps into a postgres database friendly format
function formatLocalDate() {
	var now = new Date(),
	tzo = -now.getTimezoneOffset(),
	dif = tzo >= 0 ? '+' : '-',
			pad = function(num) {
		var norm = Math.abs(Math.floor(num));
		return (norm < 10 ? '0' : '') + norm;
	};
	return now.getFullYear() 
	+ '-' + pad(now.getMonth()+1)
	+ '-' + pad(now.getDate())
	+ 'T' + pad(now.getHours())
	+ ':' + pad(now.getMinutes()) 
	+ ':' + pad(now.getSeconds()) 
	+ '.' + pad(now.getMilliseconds())
	+ dif + pad(tzo / 60) 
	+ ':' + pad(tzo % 60);
}

function justTime() {
	var now = new Date(),
	tzo = -now.getTimezoneOffset(),
	dif = tzo >= 0 ? '+' : '-',
			pad = function(num) {
		var norm = Math.abs(Math.floor(num));
		return (norm < 10 ? '0' : '') + norm;
	};
	return now.getHours() + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
}


// Multiple functions used to store and clear values from each sensor
// into their respective spots in sessionStorage as they are sent out
function saveSteps(steps){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_STEP, steps);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearSteps(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_STEP);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function saveHeartrate(heartrate){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_HEART_RATE, heartrate);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearHeartrate(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_HEART_RATE);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function saveAccel(accel){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_X_AXIS, accel[0]);
		sessionStorage.setItem(KEY_Y_AXIS, accel[1]);
		sessionStorage.setItem(KEY_Z_AXIS, accel[2]);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearAccel(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_X_AXIS);
		sessionStorage.removeItem(KEY_Y_AXIS);
		sessionStorage.removeItem(KEY_Z_AXIS);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function saveGyro(gyro){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_A_GYRO, gyro[0]);
		sessionStorage.setItem(KEY_B_GYRO, gyro[1]);
		sessionStorage.setItem(KEY_C_GYRO, gyro[2]);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearGyro(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_A_GYRO);
		sessionStorage.removeItem(KEY_B_GYRO);
		sessionStorage.removeItem(KEY_C_GYRO);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function saveCoordinates(coords){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_GPS_LATITUDE, coords[0]);
		sessionStorage.setItem(KEY_GPS_LONGTITUDE, coords[1]);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearCoordinates(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_GPS_LATITUDE);
		sessionStorage.removeItem(KEY_GPS_LONGTITUDE);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function saveUV(uv){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_UV, uv);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearUV(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_UV);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function savePressure(pressure){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_PRESSURE, pressure);
	}
	else {
		console.log("no sessionStorage in window");
	}
}
function clearPressure(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_PRESSURE);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function saveBattery(battery){
	if ("sessionStorage" in window) {
		sessionStorage.setItem(KEY_BATTERY, battery);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

function clearBattery(){
	if ("sessionStorage" in window) {
		sessionStorage.removeItem(KEY_BATTERY);
	}
	else {
		console.log("no sessionStorage in window");
	}
}

// clear everything but battery, since its OK to hold the previous value
function clearSessionData(){
	clearSteps();
	clearAccel();
	//clearBattery();
	clearCoordinates();
	clearGyro();
	clearHeartrate();
	clearPressure();
	clearUV();
}



function storeConfig(json){
	localStorage.setItem(KEY_CONFIG, JSON.stringify(json));
}

//NOTE: device storage only allows {string:string} pairs
function storeData(){
	var item = Object.create(Item.prototype);

	
	item.steps = sessionStorage.getItem(KEY_STEP);
	item.heartrate = sessionStorage.getItem(KEY_HEART_RATE);
	item.accelX = sessionStorage.getItem(KEY_X_AXIS);
	item.accelY = sessionStorage.getItem(KEY_Y_AXIS);
	item.accelZ = sessionStorage.getItem(KEY_Z_AXIS);

	item.gyroA = sessionStorage.getItem(KEY_A_GYRO);
	item.gyroB = sessionStorage.getItem(KEY_B_GYRO);
	item.gyroC = sessionStorage.getItem(KEY_Z_AXIS);

	item.locLat = sessionStorage.getItem(KEY_GPS_LATITUDE);
	item.locLon = sessionStorage.getItem(KEY_GPS_LONGTITUDE);
	item.timestamp = formatLocalDate(Date());
	item.uv = sessionStorage.getItem(KEY_UV);
	item.pressure = sessionStorage.getItem(KEY_PRESSURE);

	item.battery = sessionStorage.getItem(KEY_BATTERY);

	item.watchID = localStorage.getItem(KEY_WATCH_ID);
	
	// clears data in sessionstorage
	clearSessionData();
	//console.log("Adding the following data [" + item.accelX + ", " + item.accelY + ", " + item.accelZ + "]");
	addToDB(item);

}

//move data stored in sessionStorage to localStorage every x seconds
function startLocalStorageInterval(){
	var rate =  parseInt(localStorage.getItem(KEY_SAMPLING_RATE));
	console.log("setting interval of local storage to " + rate);
	// 1 minute for sampling
	window.setInterval(function(){
		storeData();
	}, rate);
}

var database;
// Get the DB instance existing on the watch
// This will only actually create a new one if one doesnt already exist
// Else it will retrieve the existing one
function createDBUsingWrapper(){
	database = new IDBStore({
		dbVersion: 1,
		storeName: 'data',
		keyPath: 'id',
		autoIncrement: true,
		onStoreReady: function(){
			console.log('Store ready!');
		}
	});
}

// insert a single item to the database
function addToDB(item){
 
	var onsuccess = function(id){
		//console.log('Data is added: ' + id);
	}
	var onerror = function(error){
		console.log('Error', error);
	}
 
	database.put(item, onsuccess, onerror);
}

// clears all items in the database
// called by export manager after a successful transfer
function clearDB(){
	console.log("Clearing Local Storage");
	
	var onsuccess = function(){
		console.log("Local Store Cleared");
		document.getElementById("lastSaved").innerHTML = justTime();
	}
	
	var onerror = function(error){
		console.log(error);
	}
	
	database.clear(onsuccess, onerror);
}

// used for debugging, dump all local storage to the console
function printAllData(){
	var onsuccess = function(array){
		console.log(array);
		console.log(JSON.stringify(array));
	},
	onerror = function(error){
		console.log(error);
	};
	
	database.getAll(onsuccess,onerror);
}

// used by other files to get the correct reference to the database
function getDatabase(){
	return database;
}