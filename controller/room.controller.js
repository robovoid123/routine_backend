const roomService = require("../service/room.service");

const roomController = {
  add: async (req, res) => {
    try {
      const dataToSave = await roomService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await roomService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await roomService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const result = await roomService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const roomInDB = await roomService.delete(req.params.id);

      res.send(`Document with ${roomInDB.roomNumber} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = roomController;
