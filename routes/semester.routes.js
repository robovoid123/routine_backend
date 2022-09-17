const router = require("express").Router();

const semesterController = require("../controller/semester.controller");

router.post("/add", semesterController.add);
router.get("/getAll", semesterController.getAll);
router.get("/getId/:id", semesterController.getByID);
router.patch("/update/:id", semesterController.update);
router.delete("/delete/:id", semesterController.delete);

module.exports = { semesterRouter: router };
