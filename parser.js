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
        for(var column = 0; column < rows[row].length; column++){
            str = rows[row][column]

            //remove any classess that are full
            if( str.substring(2, 6) == "Full"){
                rows.splice(row, 3)
            }
            
            //remove any  tabs infront of data
            else if(str.substring(1,2 ) == ("\t")){
                rows[row][column] = str.toString().replace('\t', '')
            }
        }
    }   
    //parse Data
    Courses = parseData(rows)
    
    console.log(Courses)
}

function parseData(array){
     //array to store the parsed courses 
     let Courses = []
     for(let row = 0; row < array.length; row++){
         //current course
         let Course = []
         //check if it is correct section to parse
         if (array[row][1] == "Open"){
             //get current row
             let info = array[row] 
             Course.push(info[3], info[7], info[10])
             
             //find days
             let info2 = array[row+1][0]
             let start1 = info2.indexOf("Days:") + 5
             let fin1 = info2.indexOf("Time") +5
             Course.push(info2.substring(start1, fin1))
 
             //find times
             let fin2 =  info2.indexOf("Building")
             Course.push(info2.substring(fin1, fin2))
             Courses.push(Course)
 
         }
 
     }
     return Courses
}
processData();