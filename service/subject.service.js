const SubjectModel = require("../model/subject.model");

const subjectService = {
  getAll: async () => {
    try {
      const subjectInDB = await SubjectModel.find();
      return subjectInDB;
    } catch (error) {}
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
      const subjectInDB = await SubjectModel.findOneAndUpdate(
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

module.exports = subjectService;
