const SubjectModel = require("../model/subject.model");

const subjectService = {
  getAll: async (filter) => {
    try {
      let filters = {};
      if (filter?.alias) {
        filters["alias"] = filter.alias;
      }
      if (filter?.name) {
        filters["name"] = { $regex: filter.name, $options: "i" };
      }

      const subjectInDB = await SubjectModel.find(filters);
      return subjectInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  getByID: async (id) => {
    try {
      const subjectInDB = await SubjectModel.findById(id);
      return subjectInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const subjectInDB = await SubjectModel.findOne({
        name: data.name,
        alias: data.alias,
      });

      if (subjectInDB) throw new Error("subject already exists");

      const newSubject = new SubjectModel({ ...data });
      await newSubject.save();

      return newSubject;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const subjectInDB = await SubjectModel.findByIdAndUpdate(
        id,
        { ...data },
        options
      );

      return subjectInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const subjectInDB = await SubjectModel.findByIdAndDelete(id);
      return subjectInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
};

// const fs = require("fs");
// const subjectsData = JSON.parse(
//   fs.readFileSync(
//     "/home/void/Codes/current/routine_backend/algorithm/data/subjects.json"
//   )
// );

// const subjectAddSchema = Joi.object({
//   name: Joi.string().required(),
//   alias: Joi.string().required(),
//   creditHour: Joi.number().required(),
//   lecture: Joi.number().required(),
//   practical: Joi.number().required(),
// });
// const func = async () => {
//   for (i = 0; i < subjectsData.length; i++) {
//     try {
//       await subjectService.create({
//         name: subjectsData[i].name,
//         creditHour: subjectsData[i].credit,
//         alias: subjectsData[i].alias,
//         lecture: subjectsData[i].lecture,
//         practical: subjectsData[i].practical,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// func();

// subjectService
//   .getAll({
//     alias: "PHY",
//   })
//   .then((r) => console.log(r));
module.exports = subjectService;
