const Joi = require("@hapi/joi");

const departmentService = require("../service/department.service");

const departmentAddSchema = Joi.object({
  name: Joi.string().required(),
  subjects: Joi.array()
    .items(
      Joi.object().keys({
        subjectID: Joi.string().required(),
        teacherID: Joi.string().required(),
        semester: Joi.number().required(),
      })
    )
    .optional(),
});

const departmentUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  subjects: Joi.array().items(
    Joi.object()
      .keys({
        subjectID: Joi.string().required(),
        teacherID: Joi.string().required(),
        semester: Joi.number().required(),
      })
      .optional()
  ),
});

const checkConflictSchema = Joi.object({
  departmentName: Joi.string().required(),
  semester: Joi.string().required(),
  subjectAlias: Joi.string().required(),
  teacherAlias: Joi.string().required(),
  weekDayIdx: Joi.number().required(),
  timeSlotIdx: Joi.number().required(),
});

const departmentController = {
  add: async (req, res) => {
    try {
      const { error } = await departmentAddSchema.validateAsync(req.body);

      if (error) {
        res.status(400).json(error.details[0].message);
      }

      /**
       * {
       *  name: String,
       *  subjects: [{
            subjectID: ObjectID,
            teacherID: ObjectID,
            semester: Number,
       *  }]
       * }
       */
      const dataToSave = await departmentService.create(req.body);
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await departmentService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getByID: async (req, res) => {
    try {
      const data = await departmentService.getByID(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { error } = await departmentUpdateSchema.validateAsync(req.body);

      if (error) {
        res.status(400).json(error.details[0].message);
      }

      const result = await departmentService.update(req.params.id, req.body);

      res.send(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const departmentInDB = await departmentService.delete(req.params.id);

      res.send(`Document with ${departmentInDB.name} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addSubjects: async (req, res) => {
    try {
      /**
       * subjects =>
       * [{
       *  subject: ObjectID,
       *  semester: Number,
       * }]
       */
      await departmentService.addSubjects({
        deptID: res.params.id,
        subjects: res.body.subjects,
      });

      res.send("Successfully added subjects");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  assignTeacherToSubject: async (req, res) => {
    try {
      /**
       * {
       * subjectID: ObjectID,
       * teacherID: ObjectID,
       * }
       */
      await departmentService.assignTeacherToSubject({
        deptID: res.params.id,
        ...res.body,
      });

      res.send("Successfully assigned teacher to subject");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  addRoutine: async (req, res) => {
    try {
      await departmentService.addRoutine({
        ...res.body,
        deptID: res.params.id,
      });

      res.send("Successfully added routine");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  checkConflict: async (req, res) => {
    try {
      const { error } = await checkConflictSchema.validateAsync(req.body);

      if (error) return res.status(400).send(error.details[0].message);

      if (await departmentService.checkConflict(req.body))
        return res.send("there is a conflict");

      return res.send("there is no conflict");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = departmentController;
