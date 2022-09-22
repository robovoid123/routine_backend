const fs = require("fs");

const genRoutine = async () => {
  // clearing the temp files at start
  fs.writeFileSync(
    `${process.cwd()}/algorithm/temp/teacher_assigned.json`,
    JSON.stringify([])
  );
  fs.writeFileSync(
    `${process.cwd()}/algorithm/temp/teacher_slot_assigned.json`,
    JSON.stringify([
      {
        Sunday: {
          "7:00-8:30": [""],
        },
      },
    ])
  );

  // assignes teacher to their semesters
  const {
    departmentSelector,
  } = require(`${process.cwd()}/algorithm/helper/departmentSelector`);
  // assings which semester is currently running
  // 'odd' or 'even'
  departmentSelector("odd");

  const teacherSlotAssinged = fs.readFileSync(
    `${process.cwd()}/algorithm/temp/teacher_slot_assigned.json`
  );
  const teacherSlotAssingedData = JSON.parse(teacherSlotAssinged);

  const departments = fs.readFileSync(
    `${process.cwd()}/algorithm/data/departments.json`
  );
  const departmentsData = JSON.parse(departments);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const morning_shift = [
    "7:00-8:30",
    "8:30-10:00",
    "10:40-12:10",
    "12:10-1:40",
  ];
  const day_shift = ["10:40-12:10", "12:10-1:40", "2:20-3:50", "3:50-5:20"];

  // change value to generate routine of different departments
  // must have same value as in department.json
  // let department_to_start = 'IT';

  // let teacher_slot = [].concat(teacherSlotAssingedData);
  let teacher_slot = [];

  // returns the selected departments data for routine generation
  const loader = () => {
    const routines = {};
    departmentsData.map((department) => {
      const department_to_load = fs.readFileSync(
        `${process.cwd()}/algorithm/results/${department}.json`
      );
      const department_load_data = JSON.parse(department_to_load);
      routines[department] = routineShiftSelector(
        department,
        department_load_data
      );
    });

    return routines;
  };

  // selectes the morning and day shift to be generated
  const routineShiftSelector = (department, department_to_generate) => {
    const dpt_routine = {};
    // const department_to_generate = loader();
    department_to_generate[department].map((semester) => {
      let morning_routine = routineGenerator(
        semester.morning,
        morning_shift,
        semester.semester
      );
      let day_routine = routineGenerator(
        semester.day,
        day_shift,
        semester.semester
      );
      writeToFile(
        morning_routine,
        `${process.cwd()}/algorithm/results/routine/${
          semester.semester
        }_${department}_morning.json`
      );
      writeToFile(
        day_routine,
        `${process.cwd()}/algorithm/results/routine/${
          semester.semester
        }_${department}_day.json`
      );

      dpt_routine[semester.semester] = {
        morning: morning_routine,
        day: day_routine,
      };
    });
    return dpt_routine;
  };

  // main function to generate routine
  const routineGenerator = (semester_shift, time_slot, semester_number) => {
    let credit_check = [];
    let routine = [];
    for (let i = 0; i < weekDays.length; i++) {
      let teacher_assigned_day = [];
      for (let j = 0; j < time_slot.length; j++) {
        let assigned_time_slot = [];
        semester_shift.map((teacher) => {
          let random_teacher = randomPicker(semester_shift);
          if (isSafe(random_teacher, time_slot[j], weekDays[i])) {
            if (creditCheck(credit_check, random_teacher.subject)) {
              if (!teacher_assigned_day.includes(random_teacher.teacher)) {
                if (!assigned_time_slot.includes(time_slot[j])) {
                  credit_check.push(random_teacher.subject.alias);
                  teacher_assigned_day.push(random_teacher.teacher);
                  assigned_time_slot.push(time_slot[j]);
                  teacher_slot.push({
                    time: time_slot[j],
                    day: weekDays[i],
                    teacher: random_teacher.teacher,
                    subject: random_teacher.subject.alias,
                  });
                  routine.push({
                    time: time_slot[j],
                    day: weekDays[i],
                    teacher: random_teacher.teacher,
                    subject: random_teacher.subject.alias,
                  });
                }
              }
            }
          }
        });
      }
    }
    return routine;
  };

  const creditCheck = (current_credit, subject) => {
    let total_credit = parseInt(subject.lecture) + parseInt(subject.practical);
    let a =
      current_credit.filter((x) => x === subject.alias).length < total_credit;
    return a;
  };

  const randomPicker = (semester_shift) => {
    const random = Math.floor(Math.random() * semester_shift.length);
    return semester_shift[random];
  };

  // checks weather the teacher can be assigned to the given time slots
  const isSafe = (teacher, time_slot, week_days) => {
    let status = true;
    teacher_slot.map((slot) => {
      if (slot.day === week_days) {
        if (slot.time === time_slot) {
          if (slot.teacher !== teacher.teacher) {
            status = true;
          } else {
            status = false;
          }
        }
      }
    });
    return status;
  };

  const writeToFile = (store_data, location) => {
    const data = JSON.stringify(store_data);
    const write = fs.writeFileSync(location, data);
    fs.writeFileSync(
      `${process.cwd()}/algorithm/temp/teacher_slot_assigned.json`,
      JSON.stringify(teacher_slot)
    );
    return write;
  };

  return loader();
};

module.exports = { genRoutine };
