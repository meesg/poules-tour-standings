const request = require('request');
const fs = require('fs');

request('https://fep-api.dimensiondata.com/v2/stages/v2/345/classification/overall', 
        function (error, response, body) {
    const data = JSON.parse(body);

    fs.writeFile("classificationdata.json", JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});
