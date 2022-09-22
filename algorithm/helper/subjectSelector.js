const fs = require("fs");

const subjects = fs.readFileSync(
  `${process.cwd()}/algorithm/data/subjects.json`
);
const subjectsData = JSON.parse(subjects);

// given the alias of the subjects
// returns the full subjects details
const subjectSelector = (teacher_assigned_subject_alias, department) => {
  let subject;
  subjectsData[department].map((subject_full) => {
    if (subject_full.alias === teacher_assigned_subject_alias) {
      subject = subject_full;
    }
  });
  return subject;
};

module.exports = {
  subjectSelector,
};
