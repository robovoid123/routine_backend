const fs = require("fs");

const departments = fs.readFileSync(
  `${process.cwd()}/algorithm/data/departments.json`
);
const departmentsData = JSON.parse(departments);

const {
  semesterSelector,
} = require(`${process.cwd()}/algorithm/helper/semesterSelector`);

// loops through all the available departments
// returns and writes to file the assigned teacher to the semesters of that department
// semester_active is either 'odd' or 'even'
const departmentSelector = (semester_active) => {
  let semester_assigned;
  departmentsData.map((department) => {
    semester_assigned = semesterSelector(department, semester_active);
    writeToFile(semester_assigned, department);
  });
};

// writes the department assigned teacher to the file
const writeToFile = (semester_assigned, department) => {
  const data = JSON.stringify(semester_assigned);
  let file = fs.writeFileSync(
    `${process.cwd()}/algorithm/results/${department}.json`,
    data
  );
  return file;
};

module.exports = {
  departmentSelector,
};
