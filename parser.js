/*class for data parsing and processing from 
automated web scraper */
class DataProcess {

    constructor(){
        this.array = []
        this.ParsedArray = []
        this.Courses = []
        this.JSONdata = null
    }

    //processes the data and removes
    processData() {
        var Papa = require('papaparse');
        const fs = require('fs');
    
        var file = './webscraper/courses.csv';
        var content = fs.readFileSync(file, "utf8");   
        
        let rows = []
        Papa.parse(content, {
            header: false,
            delimiter: "",
            complete: function(results) {
                rows = results.data;
            }
        })

        this.array = rows
        console.log(this.array)
        //loop through the excel array to remove oddities
        for(var row = 0; row < this.array.length; row++){
            for(var column = 0; column < this.array[row].length; column++){
                let str = this.array[row][column]
    
                //remove any classess that are full or closed
                if( str.substring(2, 6) == "Full"){
                    console.log(str)
                    // this.array.splice(row, 3)
                }
                
                //remove any  tabs infront of data
                else if(str.substring(1,2 ) == ("\t")){
                    this.array[row][column] = str.toString().replace('\t', '')
                }
            }
        }
        console.log(this.array)  
        //parse Data
        this.parseData()
        //covert to json
        this.JSONdata = JSON.stringify(this.Courses)
        console.log(this.JSONdata)
       
    
    }
    
    //funciton to parse the data from the array into seperate courses in an array
    parseData(){
         //array to store the parsed courses 
         for(let row = 0; row < this.array.length; row++){
             //current course
             let Course = []
             //check if it is correct section to parse(or registration closed for this example)
             if (this.array[row][1] == "Open" || this.array[row][1] == "Registration Closed" ){
                 //get current row
                 let info = this.array[row] 
                 Course.push(info[3], info[7], info[10])
                 
                 //find days
                 let info2 = this.array[row+1][0]
                 let start1 = info2.indexOf("Days:") + 6
                 let fin1 = info2.indexOf("Time") -1
                 let dayString = info2.substring(start1, fin1)
                 //split days into an array
                 Course.push(dayString.split(' '))
     
                 //find times
                 let fin2 =  info2.indexOf("Building") - 1
                 let timeString = info2.substring(fin1 + 7, fin2)
                 //remove spaces
                 Course.push(timeString.replace(/ /g, ''))

                 //add course to the courses array
                 this.Courses.push(Course)
             }
         }
    } 
}

tester = new DataProcess
tester.processData()
