const TeacherModel = require("../model/teacher.model");

const teacherService = {
  getAll: async () => {
    try {
      const teacherInDB = await TeacherModel.find().populate("subjects");
      return teacherInDB;
    } catch (error) {}
  },
  getByID: async (id) => {
    try {
      const teacherInDB = await TeacherModel.findById(id);
      return teacherInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const teacherInDB = await TeacherModel.findOne({
        name: data.name,
        initial: data.alias,
      });

      if (teacherInDB) throw new Error("teacher already exists");

      const newTeacher = new TeacherModel({ ...data });
      await newTeacher.save();

      return newTeacher;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const teacherInDB = await TeacherModel.findByIdAndUpdate(
        id,
        { ...data },
        options
      );

      return teacherInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const teacherInDB = await TeacherModel.findByIdAndDelete(id);
      return teacherInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const fs = require("fs");
const subjectService = require("./subject.service");
const teacherData = JSON.parse(
  fs.readFileSync(
    "/home/void/Codes/current/routine_backend/algorithm/data/teachers.json"
  )
);

// // const teacherAddSchema = Joi.object({
// //   name: Joi.string().required(),
// //   initial: Joi.string().required(),
// //   workload: Joi.number().required(),
// //   type: Joi.string().required(),
// //   startTime: Joi.string().required(),
// //   endTime: Joi.string().required(),
// // });
// console.log(teacherData[0]);
// const func = async () => {
//   for (i = 0; i < teacherData.length; i++) {
//     try {
//       const subjects = await Promise.all(
//         teacherData[i].subject.map(async (sub) => {
//           return (
//             await subjectService.getAll({
//               alias: sub,
//             })
//           )[0]["_id"];
//         })
//       );

//       await teacherService.create({
//         name: teacherData[i].name,
//         initial: teacherData[i].teacher_initial,
//         workload: teacherData[i].workload,
//         subjects,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// func();

module.exports = teacherService;
