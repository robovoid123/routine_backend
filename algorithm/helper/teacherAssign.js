const fs = require("fs");

const teachers = fs.readFileSync(
  `${process.cwd()}/algorithm/data/teachers.json`
);
const teachersData = JSON.parse(teachers);

const {
  subjectSelector,
} = require(`${process.cwd()}/algorithm/helper/subjectSelector`);

const teacherAssigned = fs.readFileSync(
  `${process.cwd()}/algorithm/temp/teacher_assigned.json`
);
const teacherAssignedData = JSON.parse(teacherAssigned);

let teacher_assigned = [].concat(teacherAssignedData);

// assigns the teacher to eacher semester
// only allows one teacher to be in three different classes
// TODO: teacher to be assigned to different classes considering their workload
const teacherAssignSemester = (semester, department) => {
  let teacher_assigned_semester = [];
  let assigned_subjects = [];
  semester.subjects.map((semester_subject) => {
    teachersData.map((teacher) => {
      teacher.subject.map((teacher_subject) => {
        if (teacher_subject === semester_subject) {
          if (!assigned_subjects.includes(semester_subject)) {
            if (
              teacher_assigned.filter((x) => x === teacher.name).length <
              Math.floor(teacher.workload / 2 / 3)
            ) {
              assigned_subjects.push(semester_subject);
              teacher_assigned.push(teacher.name);
              teacher_assigned_semester.push({
                teacher: teacher.name,
                subject: subjectSelector(teacher_subject, department),
              });
            }
          }
        }
      });
    });
  });
  return teacher_assigned_semester;
};

// assigns the teacher in morning and day shift
// returns the semester with day and morning shift
const teacherAssign = (semester, department) => {
  let semester_morning = teacherAssignSemester(semester, department);
  let semester_day = teacherAssignSemester(semester, department);
  let file = writeToFile(teacher_assigned);
  return {
    semester: semester.semester,
    morning: semester_morning,
    day: semester_day,
  };
};

// writes the assigned teachers to file
const writeToFile = (teacher_assigned) => {
  const data = JSON.stringify(teacher_assigned);
  let file = fs.writeFileSync(
    `${process.cwd()}/algorithm/temp/teacher_assigned.json`,
    data
  );
  return file;
};

module.exports = {
  teacherAssign,
};
