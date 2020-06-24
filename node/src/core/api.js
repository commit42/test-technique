const superagent = require('superagent');
const csvToJson = require('csvtojson');
const jsonQuery = require('json-query');
const path = require("path");

/** 
 * Load and convert countries.csv file to JSON array
**/
function loadAndConvertCsv() {

    var csvPath = path.resolve(path.join("files", "countries.csv"));

    return csvToJson().fromFile(csvPath);
}


exports.getCountries = async () => {
    var dataApi = await superagent.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;region;capital').query({ format: 'json' }).then(result => {
        return result.body;
    });

    return dataApi;
}

exports.getCountryByCode = async (code) => {

    var dataCsv = await loadAndConvertCsv();
    dataCsv = jsonQuery('[**][*code='+code+']', {data: dataCsv}).value;

    var dataApi = await superagent.get('https://restcountries.eu/rest/v2/alpha/'+code).query({ format: 'json' }).then(result => {
        var tmp = {
            "name": result.body.name,
            "code": result.body.alpha3Code,
            "region": result.body.region,
            "capital": result.body.capital
        };

        if (dataCsv.length > 0) {
            tmp.president = dataCsv[0].president;
            tmp.anthem = dataCsv[0].hymne;
        }

        return tmp;
    });

    return dataApi;
}