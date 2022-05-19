var XLSX = require("xlsx");
const fs = require('fs-extra');
const {
    toSystemPath
} = require('../../../lib/core/path');

//made possible by https://sheetjs.com/

exports.XLSXImport = async function (options) {

    options = this.parse(options);
    let path = toSystemPath(this.parseRequired(this.parse(options.path), 'string', 'fs.exists: path is required.'));
    let fields = options.fields;
    let headers = options.header;
    let allsheet = options.allsheet;
    let file = XLSX.readFile(path);
    let keys = fields.length;
    let hdr = [];
    // Variable to store our data
    let parsedData = [];

    //if the all sheet option checked
    if (allsheet) {
        var sheetNames = file.SheetNames;
        var totalSheets = sheetNames.length;
        console.log(totalSheets);
    } else {
        var sheetNames = file.SheetNames;
        var totalSheets = 1;

    }

    //if the header option checked
    if (headers) {

        hdr = false;

    } else {
        for (let i = 0; i < 1; i++) {

            const testdata = XLSX.utils.sheet_to_json(file.Sheets[sheetNames[i]], {
                header: 1
            });
            var headerStorage = testdata[0].length;

            if (headerStorage > keys) {

                throw new Error('Youre Defin col is messing colloms');
            } else if (headerStorage < keys) {
                throw new Error('Youre Defin col is more than required');
            } else {

                hdr.push(...fields);
            }
        }
    }
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
        // Convert to json using xlsx

        const tempData = XLSX.utils.sheet_to_json(file.Sheets[sheetNames[i]], {
            header: hdr
        });

        // Add the sheet's json to our data array
        parsedData.push(...tempData);
    }

    return parsedData;

}
