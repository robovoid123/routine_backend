const { genRoutine } = require("../algorithm");
const routineService = require("../service/routine.service");

const routineController = {
  add: async (req, res) => {
    try {
      const dataToSave = await routineService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await routineService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await routineService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await routineService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const routineInDB = await routineService.delete(req.params.id);

      res.send(`Document with ${routineInDB.name} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //   {
  //   IT: {
  //     '1': { morning: [Array], day: [Array] },
  //     '3': { morning: [Array], day: [Array] },
  //     '5': { morning: [Array], day: [Array] },
  //     '7': { morning: [Array], day: [Array] }
  //   },
  //   SE: {
  //     '1': { morning: [Array], day: [Array] },
  //     '3': { morning: [Array], day: [Array] },
  //     '5': { morning: [Array], day: [Array] },
  //     '7': { morning: [Array], day: [Array] }
  //   }
  // }
  generate: async (req, res) => {
    try {
      const routines = await genRoutine();

      res.json(routines);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = routineController;
