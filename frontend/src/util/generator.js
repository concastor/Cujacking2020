let sample_data = ["COMP 3008", "COMP 3007", "BUSI 2400", "COMP 3804", "COMP 3000"]

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
    'time': '11:35-12:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3008B',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '11:35-12:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3008C',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '11:35-12:55'
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

function init_counter_arr(courses) {
  counters = []
  for (course of courses) {
    counters.push(0)
  }
  return counters
}

function get_combinations(comparison_course, courses_toSearch) {

  counters = init_counter_arr(courses_toSearch)

  let combinations = []
  let testcounter = 0
  while (!gen_complete(counters, courses_toSearch)) {

    // console.log(counters)

    //add current combination to the array
    let c = 0
    for (courses of courses_toSearch) {
      combinations.push(courses[counters[c]])
      c++
    }

    //increment appropriate counter
    let x = 0
    for (courses of courses_toSearch) {
      let course_complete = gen_complete_helper(counters[x], courses)
      // console.log(course_complete)
      if (!course_complete) {
        counters[x]++
        break
      }
      x++
    }

    // if (testcounter == 5) {
    //   break
    // }
    // testcounter++

  }
  return combinations
}

function gen_all_schedules(data) {

  all_course_options = get_all_course_options(data)

  all_schedules = []
  let forbidden_index = 0
  for (courses of all_course_options) {

    //deep copy
    courses_toSearch = JSON.parse(JSON.stringify(all_course_options))

    //don't search other sections of same course for combinations
    courses_toSearch.splice(forbidden_index, 1)

    for (course of courses) {

      // console.log(course)

      //get all combinations
      course_combinations = get_combinations(course, courses_toSearch)
      // console.log(course_combinations)
      all_schedules.push(course_combinations)

    }
    forbidden_index++
  }

  return all_schedules
}

function gen_complete_helper(counter, courses) {
  if (counter+1 == courses.length) {
    return true
  }
  return false
}

function gen_complete(counters, all_course_options) {
  // console.log(counters)
  let c = 0
  for (courses of all_course_options) {
    let complete = gen_complete_helper(counters[c], courses)
    if (!complete) {
      return false
    }
    c++
  }
  return true
}

function get_all_course_options(data) {

  all_course_options = []

  for (input_course of data) {
    let course_options = []

    for (db_course of database) {
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

function has_conflicts(course, curr_schedule) {
  for (crs of curr_schedule) {
    //TODO: FIX DAY to acommodate arrays instead
    if (crs['day'] == course['day'] && times_overlap(crs['time'], course['time']) ) {
      //collision
      console.log('COLLISION')
      return true
    }
  }
  return false
}

function times_overlap(time1, time2) {

  //check if exactly the same
  if (time1 == time2) {
    return true
  }

  //find the earliest time

  //for now, assume time1 is before time2
  var earliest_time = time1
  var latest_time = time2

  time1hour = parseInt(time1.split('-')[0].split(':')[0])
  time2hour = parseInt(time2.split('-')[0].split(':')[0])
  time1min = parseInt(time1.split('-')[0].split(':')[1])
  time2min = parseInt(time2.split('-')[0].split(':')[1])

  //if time2 is before time1, then switch the vars
  if ((time1hour > time2hour) || (time1hour == time2hour && time1min > time2min)) {
      earliest_time = time2
      latest_time = time1
  }

  //now, check for overlap
  //if end of time1 is greater than start of time2, there is an overlap

  earliest_endhour = parseInt(earliest_time.split('-')[1].split(':')[0])
  latest_starthour = parseInt(latest_time.split('-')[0].split(':')[0])

  if (earliest_endhour > latest_starthour) {
    return true
  }
  else if (earliest_endhour == latest_starthour) {
    //check minutes
    earliest_endmin = parseInt(earliest_time.split('-')[1].split(':')[1])
    latest_startmin = parseInt(latest_time.split('-')[0].split(':')[1])

    if (earliest_endmin > latest_startmin) {
      return true
    }
  }
  return false
}

schedules = gen_all_schedules(sample_data)
// console.log(schedules)
