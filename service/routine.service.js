const RoutineModel = require("../model/routine.model");

const routineService = {
  getAll: async () => {
    try {
      const routineInDB = await RoutineModel.find();
      return routineInDB;
    } catch (error) {}
  },
  getByID: async (id) => {
    try {
      const routineInDB = await RoutineModel.findById(id);
      return routineInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const newRoutine = new routineModel({ ...data });
      await newRoutine.save();

      return newRoutine;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const routineInDB = await RoutineModel.findByIdAndUpdate(
        id,
        { ...data },
        options
      );

      return routineInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const routineInDB = await RoutineModel.findByIdAndDelete(id);
      return routineInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = routineService;
