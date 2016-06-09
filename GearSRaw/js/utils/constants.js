// Watch configuration parameters
var WATCH_ID = "8B87"; //Bluetooth ID
var RECEIVE_CONFIG_FROM_SERVER = false;
var SAVE_LOCALLY = false;
var SEND_TO_SERVER = true;
var SAMPLING_RATE = 1000; //1 Hz
var RAW_MODE = true; // No variable construction

// Sensor parameters
var DEFAULT_ACCELEROMETER = true;
var DEFAULT_STEP = false;
var DEFAULT_HEART_RATE = false;
var DEFAULT_GYRO = false;
var DEFAULT_GPS = false;
var DEFAULT_UV = false;
var DEFAULT_PRESSURE = false;
var DEFAULT_BATTERY = true;

var ACCELEROMETER_RATE = SAMPLING_RATE;
var STEP_RATE = SAMPLING_RATE;
var HEART_RATE_RATE = 60 * 1000; // Once every minute
var GYRO_RATE = SAMPLING_RATE;
var GPS_RATE = 60 * 60 * 1000; // Once every hour
var UV_RATE = SAMPLING_RATE;
var PRESSURE_RATE = 30 * 1000;//SAMPLING_RATE;
var BATTERY_RATE = 1000; // 1 Hz

var COLLECTION_PERIOD_HEART_RATE = 30000; // 30 seconds on to obtain heart rate data
var COLLECTION_PERIOD_GPS = 90000; // 90 seconds on for acquiring GPS
var COLLECTION_PERIOD_PRESSURE = 30000; // 30 seconds for receiving pressure data

// Server addresses
var URL_GET_CONFIG = "http://roamm.cise.ufl.edu/portal/php/getConfig.php?watchID="+WATCH_ID;
var URL_POST_DATA = "http://roamm.cise.ufl.edu:8080/pylite/rcvdata";//"http://roamm.cise.ufl.edu/portal/php/consumedata.php";

// Variable construction parameters
var SMALL_WINDOW_INTERVAL = 15 * 1000; //15 seconds
var LARGE_WINDOW_INTERVAL = 15 * 60 * 1000; //15 minutes

// Keys
var KEY_WATCH_ID = "edu.ufl.cise.roamm.watchid";
var KEY_STEP = "edu.ufl.cise.roamm.steps";
var KEY_HEART_RATE = "edu.ufl.cise.roamm.heartrate";
var KEY_X_AXIS = "edu.ufl.cise.roamm.accelX";
var KEY_Y_AXIS = "edu.ufl.cise.roamm.accelY";
var KEY_Z_AXIS = "edu.ufl.cise.roamm.accelZ";
var KEY_A_GYRO = "edu.ufl.cise.roamm.gyroA";
var KEY_B_GYRO = "edu.ufl.cise.roamm.gyroB";
var KEY_C_GYRO = "edu.ufl.cise.roamm.gyroC";
var KEY_GPS_LATITUDE = "edu.ufl.cise.roamm.locLat";
var KEY_GPS_LONGTITUDE = "edu.ufl.cise.roamm.locLon";
var KEY_UV = "edu.ufl.cise.roamm.uv";
var KEY_PRESSURE = "edu.ufl.cise.roamm.pressure";
var KEY_BATTERY = "edu.ufl.cise.roamm.battery";
var KEY_CONFIG = "edu.ufl.cise.roamm.config";
var KEY_SAMPLING_RATE = "edu.ufl.cise.roamm.exportRate";
var KEY_INTERVAL_ACCELEROMETER = "edu.ufl.cise.roamm.accelInterval";
var KEY_INTERVAL_GYRO = "edu.ufl.cise.roamm.gyroInterval";
var KEY_INTERVAL_HEART_RATE = "edu.ufl.cise.roamm.heartRateInterval"
var KEY_INTERVAL_GPS = "edu.ufl.cise.roamm.gpsInterval";
var KEY_INTERVAL_BATTERY = "edu.ufl.cise.roamm.batteryInterval";
var KEY_INTERVAL_PRESSURE = "edu.ufl.cise.roamm.pressureInterval";
var KEY_INTERVAL_UV = "edu.ufl.cise.roamm.uvInterval";

var KEY_RATE_ACCELEROMETER = "edu.ufl.cise.roamm.accelRate";
var KEY_RATE_GYRO = "edu.ufl.cise.roamm.gyroRate";
var KEY_RATE_HEART_RATE = "edu.ufl.cise.roamm.heartrateRate";
var KEY_RATE_GPS = "edu.ufl.cise.roamm.locationRate";
var KEY_RATE_BATTERY = "edu.ufl.cise.roamm.batteryRate";
var KEY_RATE_PRESSURE = "edu.ufl.cise.roamm.pressureRate";
var KEY_RATE_UV = "edu.ufl.cise.roamm.uvRate";


// Variables used in debugging
var thoroughLog = "";
