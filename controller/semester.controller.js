const semesterService = require("../service/semester.service");

const semesterController = {
  add: async (req, res) => {
    try {
      const dataToSave = await semesterService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await semesterService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await semesterService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await semesterService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const semesterInDB = await semesterService.delete(req.params.id);

      res.send(`Document with ${semesterInDB.name} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = semesterController;
