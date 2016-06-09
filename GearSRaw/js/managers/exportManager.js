// USED
var globalData;
var dataToFile;

function dataTransmission_saveLocally(){
	try {
		console.log("[Matin] I GOT HERE! x0");
		var database = getDatabase();

		var onsuccess = function(array){
			if(SAVE_LOCALLY) {
				console.log("[MATIN] saving files locally on the watch.");
				dataToFile = array.slice();
				writeDataLocally();
			}
			if(SEND_TO_SERVER) {
				console.log("[MATIN] sending data (recursively) to the server.");
				globalData = array;
				sendDataToServer();
			}
			clearDB();
		},

		onerror = function(error){
			console.log(error);
		};

		database.getAll(onsuccess, onerror);
	} catch (exception) {
		console.log(exception.message);
	}
}

// USED, recursive helper function to send 150 items at a time via HTTP POST
function sendDataToServer() {

	if (globalData.length === 0){
		console.log("Data export complete");
		return;
	}

	// pop top 150 values
	var sendingArray = [];

	while(sendingArray.length < 150 && globalData.length > 0){
		sendingArray.push(globalData[0]);
		globalData.shift();
	}
	
	$("#status").css("background","yellow");
	
	console.log("[MATIN] sending data to this url: " + URL_POST_DATA);

	$.post(URL_POST_DATA,
			{data: JSON.stringify(sendingArray)},
			function(res) {
				if(res == "OK") {
					console.log("\nStatus: " + res);
					$("#status").css("background","green");
					sendDataToServer();
				} else {
					console.log("\nStatus: " + res);
					$("#status").css("background","red");
					return;
				}
			});		  	


/*	$.post(URL_POST_DATA,
			{
		data : JSON.stringify(sendingArray)
			}, 
			function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
				$("#status").css("background","green");
				sendDataToServer();
			})
			.fail(function(data,status){
				console.log("Data: " + data + "\nStatus: " + status);
				$("#status").css("background","red");
				return;
			});
*/
}


/**
 * This function is called whenever the data is being sent to the server.<br>
 * It works with the global variable <b>dataToFile</b>. This function creates a "ROAMM" folder inside Documents and creates a .txt file containing current data.
 * @author matinkheirkhahan
 */
function writeDataLocally() {
	console.log("[Matin] writeDataLocally started...");
	var documentsDir;
	tizen.filesystem.resolve("documents", onDocumentResolve, function(error) {
		console.log("Could not resolve documents folder.");
		console.log(error);
	});

	function onDocumentResolve(result) {
		console.log("[Matin] documents folder resolved...");
		newFilePath = "ROAMM";
		documentsDir = result;
		tizen.filesystem.resolve("documents/" + newFilePath, onRoamResolve, function(error){
			console.log("[Matin] ROAMM folder could not be resolved. It should be created...");
			var newDir = documentsDir.createDirectory(newFilePath);
			console.log("[Matin] (" + newFilePath + ") folder is created.");
			d = new Date();
			var newFile = newDir.createFile("sensordata_" + d.toString().replace(/:| /g, "_") +".txt");
			console.log("[Matin] New file is created.");
			writeDataToFile(newFile);
		});
		function onRoamResolve(roamResult) {
			console.log("[Matin] ROAMM folder is resolved. So just create the file!");
			d = new Date();
			var newFile = roamResult.createFile("sensordata_" + d.toString().replace(/:| /g, "_") +".txt");
			console.log("[Matin] New file is created.");
			writeDataToFile(newFile);
		};
	}
}

/**
 * Given the newly created file, it opens it and writes the local storage into it. <br>
 * <i>Whenever this task is done, it <u>clears the DB</u>, because it is now available in the file and should not be kept somewhere else.</i>
 * @author matinkheirkhahan
 * @param newFile
 */
function writeDataToFile(newFile) {
	try {
		console.log("[Matin] writeDataToFile started...");
		if(newFile != null) {
			newFile.openStream("a", onOpenStream, function(error) {
				console.log("[Matin] Could not create the file.");
				console(error);
			}, "UTF-8");

			function onOpenStream(fs) {
				fs.write(JSON.stringify(dataToFile));
				console.log("[Matin] this is the data to be written [dataToFile]>>>\n" + JSON.stringify(dataToFile));
				console.log("[Matin] OR this [globalData]>>>\n" + JSON.stringify(globalData));
				fs.close();
				dataToFile = null;
				newFile = null;
				console.log("[Matin] Data is written into the file, and temporal variables are set to null.");
			};
		} else {
			console.log("[Matin] no file here to write into!...");
		}
		console.log("[Matin] writeDataToFile ended!!!");
		//clearDB();
	} catch (exception) {
		console.log("[Matin] [Exception] " + exception.message);
	}
}