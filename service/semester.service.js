const SemesterModel = require("../model/semester.model");

const semesterService = {
  getAll: async () => {
    try {
      const semesterInDB = await SemesterModel.find();
      return semesterInDB;
    } catch (error) {}
  },
  getByID: async (id) => {
    try {
      const semesterInDB = await SemesterModel.findById(id);
      return semesterInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const semesterInDB = await SemesterModel.findOne({
        name: data.name,
        alias: data.alias,
      });

      if (semesterInDB) throw new Error("semester already exists");

      const newSemester = new semesterModel({ ...data });
      await newSemester.save();

      return newSemester;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const semesterInDB = await SemesterModel.findOneAndUpdate(
        id,
        { ...data },
        options
      );

      return semesterInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const semesterInDB = await SemesterModel.findByIdAndDelete(id);
      return semesterInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = semesterService;
