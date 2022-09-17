const router = require("express").Router();

const subjectController = require("../controller/subject.controller");

router.post("/add", subjectController.add);
router.get("/getAll", subjectController.getAll);
router.get("/getId/:id", subjectController.getByID);
router.patch("/update/:id", subjectController.update);
router.delete("/delete/:id", subjectController.delete);

module.exports = { subjectRouter: router };
