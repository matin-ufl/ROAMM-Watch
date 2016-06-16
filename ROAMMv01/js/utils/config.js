// Watch configuration parameters
var WATCH_ID = "6CE8";// my watches {6CE8, 8B87, 4405}
var RECEIVE_CONFIG_FROM_SERVER = false;
var SAVE_LOCALLY = false;
var SEND_TO_SERVER = true;
var SAMPLING_RATE = 1000 / 10; //10 Hz
var RAW_MODE = false; // No variable construction
var VARIABLE_CONSTRUCTION_RATE = 1000 * 15; // Once every 15 seconds

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
var URL_POST_DATA = "https://roamm.localtunnel.me/pylite/avgfeat_rcv"; // app-name: pylite - https-port:8484 (redirected on server)

// Variable construction parameters
var SMALL_WINDOW_INTERVAL = 15 * 1000; //15 seconds
var LARGE_WINDOW_INTERVAL = 15 * 60 * 1000; //15 minutes