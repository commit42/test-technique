const axios = require("axios");
const csvToJson = require('csvtojson');
const path = require('path');

// Get data by country code
exports.getDataByCode = async (code) => {
    let codeUpperCase = code.toUpperCase();
    let infoCsv = await getInfoCsv();

    // Call API restcountries
    return axios.get('https://restcountries.eu/rest/v2/alpha/' + codeUpperCase)
        .then(response => {
            let dataTab = {
                "name": response.data.name,
                "code": response.data.alpha3Code,
                "region": response.data.region,
                "capital": response.data.capital,
            };

            // Retrive info csv
            for (let i = 0; i < infoCsv.length; i++) {
                if (infoCsv[i].code === codeUpperCase) {
                    dataTab.president = infoCsv[i].president;
                    dataTab.anthem = infoCsv[i].hymne;
                }
            }
            return dataTab;
        })
        .catch(error => {
            console.log(error);
            return error.response.data;
        });
};

// Function to retrive info csv
function getInfoCsv() {
    let csvFile = path.resolve("./files/countries.csv");
    return csvToJson().fromFile(csvFile);
}