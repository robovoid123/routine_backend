const Joi = require("@hapi/joi");

const subjectService = require("../service/subject.service");

const subjectAddSchema = Joi.object({
  name: Joi.string().required(),
  alias: Joi.string().required(),
  creditHour: Joi.number().required(),
  lecture: Joi.number().required(),
  practical: Joi.number().required(),
});

const subjectUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  alias: Joi.string().optional(),
  creditHour: Joi.number().optional(),
  lecture: Joi.number().optional(),
  practical: Joi.number().optional(),
});

const subjectController = {
  add: async (req, res) => {
    try {
      const { error } = await subjectAddSchema.validateAsync(req.body);

      if (error) {
        res.status(400).json(error.details[0].message);
      }

      const dataToSave = await subjectService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await subjectService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await subjectService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { error } = await subjectUpdateSchema.validateAsync(req.body);

      if (error) {
        res.status(400).json(error.details[0].message);
      }

      const result = await subjectService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const subjectInDB = await subjectService.delete(req.params.id);

      res.send(`Document with ${subjectInDB.name} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = subjectController;
