
var XLSX = require("xlsx");

const fs = require('fs-extra');
const { toSystemPath } = require('../../../lib/core/path');

exports.XLSXImport = async function(options) {

	options = this.parse(options);
	 let path = toSystemPath(this.parseRequired(this.parse(options.path), 'string', 'fs.exists: path is required.'));
	    let fields = options.fields;
        let header = options.header;
		//let data = options.path;
		const file = XLSX.readFile(path);
	//	var ws = XLSX.readFile(path);
	//	var ws = XLSX.read(path);
    //	const workbook = XLSX.readFile(path);
		//	console.log(workbook);
      
	//	var data =XLSX.utils.sheet_to_json(workbook);
	    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
    // Variable to store our data 
    let parsedData = [];
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
        // Convert to json using xlsx
	//مهم	const tempData = XLSX.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
        const tempData = XLSX.utils.sheet_to_json(file.Sheets[sheetNames[i]]);//,{ });
        // Skip header row which is the colum names
        //tempData.shift();
        // Add the sheet's json to our data array
        parsedData.push(...tempData);
    }
		  
		
		return parsedData;
		
}
		
        