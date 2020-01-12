let Combinatorics = require('js-combinatorics')
const fs = require('fs')


// let sample_data = ["COMP 3008", "COMP 3007", "COMP 3000"]
let sample_data = ['COMP 1001', 'COMP 1005', 'COMP 2804', 'COMP 2402']

let file = './courseData.txt'
let database = JSON.parse(fs.readFileSync(file, "utf8"))

/*
var database = [
  {
    'semester': '202010',
    'course': 'COMP 3804A',
    'type': 'LEC',
    'day': ['TUE', 'THU'],
    'time': '14:35-15:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3804B',
    'type': 'LEC',
    'day': ['MON', 'WED'],
    'time': '8:35-9:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3008A',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '16:35-17:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3008B',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '8:35-9:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3008C',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '8:35-9:55'
  }
  ,
  {
    'semester': '202010',
    'course': 'COMP 3007A',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '11:35-12:55'
  }
]
*/

class Generator {

  init_counter_arr(courses) {
    let counters = []
    for (let course of courses) {
      counters.push(0)
    }
    return counters
  }

  get_combinations(comparison_course, courses_toSearch) {

    let counters = this.init_counter_arr(courses_toSearch)

    let all_combinations = []
    let testcounter = 0
    while (!this.gen_complete(counters, courses_toSearch)) {

      //add current combination to the array
      let c = 0
      let combination = [comparison_course]
      for (let courses of courses_toSearch) {
        combination.push(courses[counters[c]])
        c++
      }
      // console.log(combination)

      //increment appropriate counter
      let x = 0
      for (let courses of courses_toSearch) {
        let course_complete = this.gen_complete_helper(counters[x], courses)
        // console.log(course_complete)
        if (!course_complete) {
          counters[x]++
          break
        }
        x++
      }
      // console.log(combination)
      all_combinations.push(combination)

      // if (testcounter == 5) {
      //   break
      // }
      // testcounter++

    }
    return all_combinations
  }

  gen_all_schedules(data) {

    let all_course_options = this.get_all_course_options(data)

    let all_schedules = []
    let forbidden_index = 0
    for (let courses of all_course_options) {

      //deep copy
      let courses_toSearch = JSON.parse(JSON.stringify(all_course_options))

      //don't search other sections of same course for combinations
      courses_toSearch.splice(forbidden_index, 1)

      for (let course of courses) {

        // console.log(course)

        //get all combinations
        let course_combinations = this.get_combinations(course, courses_toSearch)

        //check if not duplicate
        for (let combination of course_combinations) {
          let toAdd = true
          for (let comb of all_schedules) {
            if (this.combination_match(combination, comb)) {
              toAdd = false
              break
            }
          }

          //check inner time conflicts
          let subsets = Combinatorics.combination(combination, 2).toArray()
          // console.log(subsets)

          for (let pair of subsets) {
            // console.log(pair)
            let conflict = this.has_conflicts(pair[0], pair[1])
            if (conflict) {
              toAdd = false
              break
            }
          }

          // console.log(toAdd)
          //if not duplicate, add
          if (toAdd) {
            all_schedules.push(combination)
          }
        }

      }
      forbidden_index++
    }
    // console.log(all_schedules)

    return all_schedules
  }

  combination_match(comb1, comb2) {
    let count = 0

    for (let i = 0; i < comb1.length; i++) {
      for (let j = 0; j < comb2.length; j++) {
        if (comb1[i].course == comb2[j].course) {
          count++
          break
        }
      }
    }

    if (count == comb1.length) {
      return true
    }
    return false

  }

  gen_complete_helper(counter, courses) {
    if (counter+1 == courses.length) {
      return true
    }
    return false
  }

  gen_complete(counters, all_course_options) {
    // console.log(counters)
    let c = 0
    for (let courses of all_course_options) {
      let complete = this.gen_complete_helper(counters[c], courses)
      if (!complete) {
        return false
      }
      c++
    }
    return true
  }

  get_all_course_options(data) {

    let all_course_options = []

    for (let input_course of data) {
      let course_options = []

      for (let db_course of database) {
        if (db_course['course'].includes(input_course)) {
          course_options.push(db_course)
        }
      }

      if (course_options.length != 0) {
        all_course_options.push(course_options)
      }
    }
    return all_course_options
  }

  has_conflicts(course1, course2) {

    if (this.days_overlap(course1['day'], course2['day']) && this.times_overlap(course1['time'], course2['time']) ) {
      //collision
      // console.log('COLLISION')
      return true
    }
    return false
  }

  days_overlap(days1, days2) {
    for (let d of days1) {
      for (let dd of days2) {
        if (d == dd) {
          return true
        }
      }
    }
    return false
  }

  times_overlap(time1, time2) {

    //check if exactly the same
    if (time1 == time2) {
      return true
    }

    //find the earliest time

    //for now, assume time1 is before time2
    var earliest_time = time1
    var latest_time = time2

    let time1hour = parseInt(time1.split('-')[0].split(':')[0])
    let time2hour = parseInt(time2.split('-')[0].split(':')[0])
    let time1min = parseInt(time1.split('-')[0].split(':')[1])
    let time2min = parseInt(time2.split('-')[0].split(':')[1])

    //if time2 is before time1, then switch the vars
    if ((time1hour > time2hour) || (time1hour == time2hour && time1min > time2min)) {
        earliest_time = time2
        latest_time = time1
    }

    //now, check for overlap
    //if end of time1 is greater than start of time2, there is an overlap

    let earliest_endhour = parseInt(earliest_time.split('-')[1].split(':')[0])
    let latest_starthour = parseInt(latest_time.split('-')[0].split(':')[0])

    if (earliest_endhour > latest_starthour) {
      return true
    }
    else if (earliest_endhour == latest_starthour) {
      //check minutes
      let earliest_endmin = parseInt(earliest_time.split('-')[1].split(':')[1])
      let latest_startmin = parseInt(latest_time.split('-')[0].split(':')[1])

      if (earliest_endmin > latest_startmin) {
        return true
      }
    }
    return false
  }

  main() {
    let schedules = this.gen_all_schedules(sample_data)
    console.log(schedules)
  }
}

gen = new Generator
gen.main()

module.exports = Generator
