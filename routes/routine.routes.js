const router = require("express").Router();

const routineController = require("../controller/routine.controller");

router.post("/add", routineController.add);
router.get("/getAll", routineController.getAll);
router.get("/getId/:id", routineController.getByID);
router.patch("/update/:id", routineController.update);
router.delete("/delete/:id", routineController.delete);
router.post("/generate", routineController.generate);

module.exports = { routineRouter: router };
