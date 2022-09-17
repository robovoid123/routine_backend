const DepartmentModel = require("../model/department.model");

const departmentService = {
  getAll: async () => {
    try {
      const departmentInDB = await DepartmentModel.find();
      return departmentInDB;
    } catch (error) {}
  },
  getByID: async (id) => {
    try {
      const departmentInDB = await DepartmentModel.findById(id);
      return departmentInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const departmentInDB = await DepartmentModel.findOne({
        name: data.name,
        alias: data.alias,
      });

      if (departmentInDB) throw new Error("department already exists");

      const newDepartment = new templateModel({ ...data });
      await newDepartment.save();

      return newDepartment;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const departmentInDB = await DepartmentModel.findOneAndUpdate(
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
  /**
   * adds subject to department
   *
   * @param {Number} id
   * @param {Number} subjectID
   *
   * @returns {Number} successfully added subjectID
   */
  addSubject: async (id, subjectID) => {},
  /**
   * removes subject from department
   *
   * @param {Number} id
   * @param {Number} subjectID
   *
   * @returns {Number} successfully removed subjectID
   */
  removeSubject: async (id, subjectID) => {},
};

module.exports = departmentService;
