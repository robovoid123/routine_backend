const {loadData} = require('./lib/loadData');
const {generateEmptyRoutine} = require('./lib/generateEmptyRoutine');
const {TIME_SLOTS, WEEK_DAYS} = require('./lib/constants');

const {departments} = loadData();

const isSafe = (subjectMap, routine, row, col, subjectKey) => {
  let subjectRepeatCount = 0;
  for (let i = 0; i < TIME_SLOTS.length; i++) {
    if (routine[row][i] === subjectKey) ++subjectRepeatCount;
  }

  if (subjectRepeatCount >= 1) return false;

  return true;
};

const solveRoutine = (subjectMap, routine, row, col) => {
  if (row === WEEK_DAYS.length - 1 && col === TIME_SLOTS.length) return true;

  if (col == TIME_SLOTS.length) {
    row++;
    col = 0;
  }

  if (routine[row][col] !== null)
    return solveRoutine(subjectMap, routine, row, col + 1);

  const subjectKeys = Object.keys(subjectMap);
  for (let idx = 0; idx < subjectKeys.length; idx++) {
    if (isSafe(subjectMap, routine, row, col, subjectKeys[idx])) {
      routine[row][col] = subjectKeys[idx];

      if (solveRoutine(subjectMap, routine, row, col + 1)) return true;
    }

    // console.log(subjectMap);
    routine[row][col] = null;
  }

  return false;
};

const generateInitialRoutine = (subjects, semester) => {
  const currentRoutine = semester.routine;

  // map to a iterable map with all required data
  // map to an array of object with key = <L for lecture||P for practical>-<Subject alias>-<Teacher initials>
  // and value = number of expected occurrences per week.
  const subjectToSlotMap = subjects
    .filter(sub => !!semester.subjects.find(semSub => semSub === sub.alias))
    .reduce((acc, semSub) => {
      if (parseInt(semSub.lecture) > 0) {
        acc[`L-${semSub.alias}-${semSub.teacher}`] = +semSub.lecture;
      }
      if (parseInt(semSub.practical) > 0) {
        acc[`P-${semSub.alias}-${semSub.teacher}`] = +semSub.practical;
      }
      return acc;
    }, {});

  console.log(subjectToSlotMap);

  solveRoutine(subjectToSlotMap, currentRoutine, 0, 0);
};

const generateRoutinesForDepartment = departments => {
  const itDepartment = departments[0];

  // TODO: for only IT department
  itDepartment.semesters.forEach(semester => {
    // TODO: for now provide subjects since only alias stored in semester.subjects
    generateInitialRoutine(itDepartment.subjects, semester);
  });
};

generateRoutinesForDepartment(departments);
