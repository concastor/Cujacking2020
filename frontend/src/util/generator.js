let sample_data = ["COMP 3008", "COMP 3007", "BUSI 2400", "COMP 3804", "COMP 3000"]

var database = [
  {
    'semester': '202010',
    'course': 'COMP 3008A',
    'type': 'LEC',
    'day': ['TUE', 'THU'],
    'time': '14:35-15:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3008B',
    'type': 'LEC',
    'day': ['MON', 'WED'],
    'time': '8:35-9:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3000A',
    'type': 'LEC',
    'day': ['WED', 'FRI'],
    'time': '11:35-12:55'
  },
  {
    'semester': '202010',
    'course': 'COMP 3000A1',
    'type': 'TUT',
    'day': ['THU'],
    'time': '10:05-11:25'
  },
  {
    'semester': '202010',
    'course': 'COMP 3000A2',
    'type': 'TUT',
    'day': ['MON'],
    'time': '8:35-9:55'
  },
  
]

function get_course_options(data) {
  course_options = []

  for (input_course of data) {
    for (db_course of database) {
      if (db_course['course'].includes(input_course)) {
        //check if course already added
        if (!has_conflicts(db_course, course_options)) {
          course_options.push(db_course)
        }
        //check if has a tutorial
        break
      }
    }
  }
  console.log(course_options)
  //return course_options
}

function has_conflicts(course, curr_schedule) {
  for (crs of curr_schedule) {
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

get_course_options(sample_data)
