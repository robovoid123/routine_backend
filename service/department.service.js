const DepartmentModel = require("../model/department.model");

const departmentPopulateObj = [
  {
    path: "subjects.subject",
    model: "Subject",
  },
  {
    path: "subjects.teacher",
    model: "Teacher",
  },
  {
    path: "routines.routine",
    model: "Routine",
  },
];

const departmentService = {
  getAll: async () => {
    try {
      const departmentInDB = await DepartmentModel.find().populate(
        departmentPopulateObj
      );
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  getByID: async (id) => {
    try {
      const departmentInDB = await DepartmentModel.findById(id).populate(
        departmentPopulateObj
      );
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      /**
       * data =>
       * {
       *  name: String,
       *  subjects: [{
            subjectID: ObjectID,
            semester: Number,
       *  }]
       * }
       */
      let subjects = [];
      if (data.subjects) {
        subjects = data.subjects.map((sub) => {
          return {
            subject: sub.subjectID,
            semester: sub.semester,
          };
        });
      }

      const departmentInDB = await DepartmentModel.findOne({
        name: data.name,
      });

      if (departmentInDB) throw new Error("department already exists");

      const newDepartment = new DepartmentModel({
        name: data.name,
        subjects,
      });

      await newDepartment.save();

      return newDepartment;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      if (data.subjects) {
        const subjects = data.subjects.map((sub) => ({
          subject: sub.subjectID,
          semester: sub.semester,
        }));

        data.subjects = subjects;
      }

      const options = { new: true };
      const departmentInDB = await DepartmentModel.findByIdAndUpdate(
        id,
        { ...data },
        options
      );

      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const departmentInDB = await DepartmentModel.findByIdAndDelete(id);
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  addSubjects: async ({ deptID, subjects }) => {
    try {
      /**
       * subjects =>
       * [{
       *  subject: ObjectID,
       *  semester: Number,
       * }]
       */
      const options = { new: true };
      const departmentInDB = await DepartmentModel.findOneAndUpdate(
        deptID,
        {
          $push: {
            subjects: {
              $each: subjects.map((sub) => ({
                subject: sub.subjectID,
                semester: sub.semester,
              })),
            },
          },
        },
        options
      );

      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  assignTeacherToSubject: async ({ deptID, subjectID, teacherID }) => {
    try {
      const departmentInDB = await DepartmentModel.findById(deptID);

      if (!departmentInDB)
        throw new Error(`no department with ${deptID} exists`);

      const subjects = [...departmentInDB.subjects];

      const subToAssignIdx = subjects.findIndex((s) => {
        return s.subject.equals(subjectID);
      });

      subjects[subToAssignIdx]["teacher"] = teacherID;

      departmentInDB.subjects = subjects;

      await departmentInDB.save();
    } catch (error) {
      throw new Error(error);
    }
  },
  addRoutine: async ({ deptID, routineID, semester }) => {
    try {
      const departmentInDB = await DepartmentModel.findById(deptID).populate(
        "routines"
      );

      let routines = [...departmentInDB.routines];

      const semIdx = routines.findIndex((r) => r.semester === semester);

      routines[semIdx] = {
        semester,
        routine: routineID,
      };

      departmentInDB.routines = routines;

      await departmentInDB.save();

      return true;
    } catch (error) {
      throw new Error(error);
    }
  },
};

// const fs = require("fs");
// const subjectService = require("./subject.service");
// const subjectsData = JSON.parse(
//   fs.readFileSync(
//     "/home/void/Codes/current/routine_backend/algorithm/data/subjects.json"
//   )
// );
// const semesterData = JSON.parse(
//   fs.readFileSync(
//     "/home/void/Codes/current/routine_backend/algorithm/data/semesters.json"
//   )
// );

// const func = async () => {
//   try {
//     const subjects = [];
//     semesterData["IT"].forEach((sem) => {
//       sem.subjects.forEach((sub) => {
//         subjects.push({
//           semester: parseInt(sem.semester),
//           subject: sub,
//         });
//       });
//     });

//     const subjectWithIDs = await Promise.all(
//       subjects.map(async (sub) => {
//         const subjectID = (
//           await subjectService.getAll({
//             alias: sub.subject,
//           })
//         )[0]["_id"];
//         return {
//           semester: sub.semester,
//           subjectID,
//         };
//       })
//     );

//     await departmentService.addSubjects({
//       deptID: "632abef218f97c4a06b36979",
//       subjects: subjectWithIDs,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// func();

module.exports = departmentService;
