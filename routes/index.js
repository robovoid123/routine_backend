const router = require("express").Router();

const { teacherRouter } = require("./teacher.routes");
const { subjectRouter } = require("./subject.routes");
const { departmentRouter } = require("./department.routes");
const { roomRouter } = require("./room.routes");
const { userRouter } = require("./user.routes");
const { semesterRouter } = require("./semester.routes");
const { routineRouter } = require("./routine.routes");

const verify = require("../middleware/auth.middleware");

router.use("/teacher", verify, teacherRouter);
router.use("/subject", verify, subjectRouter);
router.use("/department", verify, departmentRouter);
router.use("/room", verify, roomRouter);
router.use("/user", userRouter);
router.use("/semester", verify, semesterRouter);
router.use("/routine", verify, routineRouter);

module.exports = router;
