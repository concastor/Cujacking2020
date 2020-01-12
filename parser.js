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
    console.log(rows)
    //remove all courses that are full
    for(var row = 0; row < rows.length; row++){
        for(var column = 0; column < rows[row].length; column++){
            str = rows[row][column]

            if(str.substring(2, 6) == "Full"){
                rows.splice(row, 3)
            }
        }
    }
}

processData();