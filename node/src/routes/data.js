const response = require("../helpers/response");
const fs = require('fs');
const Papa = require('papaparse');
const axios = require("axios");


//Fonction de parse du fichier CSV
const readCSV = async (filePath,code) => {
    const csvFile = fs.readFileSync(filePath)
    
    const csvData = csvFile.toString()
    
    // Retourn le contenu quand il est pret
    
    return new Promise(resolve => {
      Papa.parse(csvData, {
        header: true,
        transformHeader: header => header.trim(),
        complete: results => {
          csv_data = results.data.find(country_ => country_.code===code);
          csv_tab = {
            "president" : csv_data.president.trim(),
            "anthem" : csv_data.hymne.trim() 
          };
          resolve(csv_tab);
        }
      });
    });
  };

exports.getData = async (country) => {
    
    // Appel a l'API restcountries
    api_data = await axios.get('https://restcountries.eu/rest/v2/alpha/'+country).then( response => {
        api_data =  response.data;
        api_tab = {
          "name": api_data.name,
          "code" : api_data.alpha3Code,
          "region" : api_data.region,
          "capital" : api_data.capital,
        };
        return api_tab;
    });
    // parse du fichier
    csv_tab = await readCSV("src/files/countries.csv",country);
    
    // Si les data ne sont pas complètes
    if(api_data && csv_tab )
      final_tab = { ...api_data, ...csv_tab};
    else if(api_data)
      final_tab={api_data};
    else if(csv_tab)
      final_tab = {csv_tab};
    else
      return undefined;
    
    return final_tab;
}