function processData() {

    var Papa = require('papaparse');
    const fs = require('fs');

    var file = './webscraper/courses.csv';
    var content = fs.readFileSync(file, "utf8");   

    Papa.parse(content, {
        header: false,
        delimiter: "",
        complete: function(results) {
        rows = results.data;
        }
    });

    //loop through the excel array to remove oddities
    for(var row = 0; row < rows.length; row++){
        console.log(rows[row])
        for(var column = 0; column < rows[row].length; column++){
            str = rows[row][column]

            //remove any classess that are full
            if(str.includes("Full")){
                rows.splice(row, 3)
            }
            
            //remove any classes that have a tab infront of data
            else if(str.includes("\t")){
                rows[row][column] = str.toString().replace('\t', '')
            }
        }
    }
}

processData();