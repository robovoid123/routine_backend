const fs = require("fs");

const semesters = fs.readFileSync(
  `${process.cwd()}/algorithm/data/semesters.json`
);
const semestersData = JSON.parse(semesters);

const {
  teacherAssign,
} = require(`${process.cwd()}/algorithm/helper/teacherAssign`);

// selectes the even or odd semester that is currently running
// takes the departments and semester which is currently active ('odd' || 'even')
// returns the departments assigned teachers
const semesterSelector = (department, semester_active) => {
  let teacher_assigned = [];
  semestersData[department].map((semester) => {
    if (semester_active === "even") {
      if (semester.semester % 2 === 0) {
        teacher_assigned.push(teacherAssign(semester, department));
      }
    } else {
      if (semester.semester % 2 !== 0) {
        teacher_assigned.push(teacherAssign(semester, department));
      }
    }
  });
  return {
    [department]: teacher_assigned,
  };
};

module.exports = {
  semesterSelector,
};
